// app.js

const express = require('express');
const app = express();
var cors = require('cors');
const SocketService = require("./services/SocketService");
const dotenv = require('dotenv');

dotenv.config();


// Set up express to parse JSON
app.use(express.json());


// Enable CORS for all routes
app.use(cors())

app.get('/', (req, res) => {
  console.log('App connected')
  res.send("App running")
});

// Start server
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log("Server listening on : ", PORT);

  const socketService = new SocketService();

  // We are going to pass server to socket.io in SocketService.js
   socketService.attachServer(server);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;