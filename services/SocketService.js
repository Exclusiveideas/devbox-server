//SocketService.js

const socketIO = require("socket.io");
const PTYService = require("./PTYService");
const axios = require("axios");

class SocketService {
  constructor() {
    this.socket = null;
    this.pty = null;
    this.compiledData = null;
  }

  attachServer(server) {
    if (!server) {
      throw new Error("Server not found...");
    }

    const io = socketIO(server, {
      cors: {
        origin: "*", //add domain
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,

        handlePreflightRequest: (req, res) => {
          res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*",
          });
        },
      },
    });
    console.log("Created socket server. Waiting for client connection.");
    // "connection" event happens when any client connects to this io instance.
    io.on("connection", (socket) => {
      console.log("Client connect to socket.", socket.id);

      this.socket = socket;

      this.socket.on("disconnect", () => {
        console.log("Disconnected Socket: ", socket.id);
      });

      // Create a new pty service when client connects.
      this.pty = new PTYService(this.socket);

      // Attach event listener for socket.io
      this.socket.on("input", async (input) => {
        // Make an API request with the input received
        const decodedMessage = Buffer.from(input, 'base64').toString();
        try {
          const apiResponse = await this.sendCompileRequest(decodedMessage);

          this.pty.write(apiResponse);
        } catch (error) {
          console.log("Error compiling data:", error);
          this.pty.write("Error compiling data: You might have reached your compilation limit for today");
        }
      });
    });
  }

  async sendCompileRequest(input) {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { fields: "*" },
      headers: {
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
        "Content-Type": "application/json",
      },
      data: {
        source_code: input,
        language_id: 63,
        stdin: "",
        base64_encoded: true
      }
    };

    try {
      const { data } = await axios.request(options);
      const compiledData = await this.receiveCompiledData(data.token);
      return compiledData;
    } catch (error) {
      console.log("Error compiling data:", error);
    }
  }

  async receiveCompiledData(token) {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        console.log("Processing... retrying in 2 seconds");

        // Use a Promise-based delay function
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return this.receiveCompiledData(token);
      } else {
        return response.data.stdout
      }

    } catch (error) {
      console.log("Error compiling data:", error);
    }
  }
}

module.exports = SocketService;
