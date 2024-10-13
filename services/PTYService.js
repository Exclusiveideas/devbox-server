//PTYService.js
const os = require("os");
const pty = require("node-pty");

class PTY {
  constructor(socket) {
    // Setting default terminals based on user os
    this.shell = os.platform() === "win32" ? "powershell.exe" : "bash";
    this.ptyProcess = null;
    this.socket = socket;

    // Initialize PTY process.
    this.startPtyProcess();
  }

  /**
   * Spawn an instance of pty with a selected shell.
   */
  startPtyProcess() {
    this.ptyProcess = pty.spawn(this.shell, [], {
      name: "xterm-color",
      cwd: process.env.HOME, // Which path should terminal start
      env: process.env, // Pass environment variables
    });

    // Add a "data" event listener.
    this.ptyProcess.on("data", (data) => {
      // Whenever terminal generates any data, send that output to socket.io client
      this.sendToClient(data);
    });
  }

  /**
   * Use this function to send in the input to Pseudo Terminal process.
   * @param {*} data Input from user like a command sent from terminal UI
   */

  write(data) {
    this.ptyProcess.write(data + "\n");
  }

  sendToClient(data) {
    // Emit data to socket.io client in an event "output"

    const cleanData = this.stripAnsiCodes(data);
    const normalizedData = cleanData.replace(/\r?\n/g, "\r\n");

    const matchedOutput = normalizedData.match(/>> (\S+)/);

    // if (match) {
    this.socket.emit("output", matchedOutput);
    // }

  }

  // Helper function to strip ANSI escape codes
  stripAnsiCodes(input) {
    return input.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-ntqry=><]/g,
      ""
    );
  }
}

module.exports = PTY;
