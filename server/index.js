// npm start
// https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/index.js
// https://github.com/sawyerf/red-tetris/blob/main/back/utils/Game.ts

const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");


const Games = require("./Classes/Games.js");
let Game = new Games();

const PORT = process.env.PORT || 1337;
const app = express();
const server = http.createServer(app);

let rooms = [];
let players = [];

app.use(cors());

// socket config
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
  },
  path: "",
});

io.on("connection", async (socket) => {
  try {
      socket.sendBuffer = [];
      console.log("Client Connected From", socket.handshake.headers.origin, socket.id);
    } catch (e) {
      console.log(e.message);
    }
  socket.on("topic_name", async (data) => {
    console.log("msg in topic",data)
  });
  socket.on("disconnect", () => {
    console.log("socket disconnect")
  });
});


app.get("/", (req, res) => {
  const socket = 1
  const data = {"msg": "pppp"}
  Game.create(io, socket, data, players)
  res.send({"test":"1"});
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});