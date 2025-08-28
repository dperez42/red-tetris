// npm start
// https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/index.js
// https://github.com/sawyerf/red-tetris/blob/main/back/utils/Game.ts

const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");


const Games = require("./Classes/Games.js");
const Piece = require("./Classes/Piece.js");
const Player = require("./Classes/Player.js");


const PORT = process.env.PORT || 1337;
const app = express();
const server = http.createServer(app);

let rooms = [];
let players = [];
let count = 0;
let play = new Player(10,20, "daniel")
play.addPiece()

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
    if (data.key ==='ArrowLeft'){
      play.piece.left()
      play.print()
    }
    if (data.key ==='ArrowRight'){
      play.piece.right()
      play.print()
    }
    if (data.key ===' '){
      play.piece.right()
      play.print()
    }
    if (data.key ==='ArrowDown'){
      play.print()
    }
    if (data.key ==='Escape'){
      play.print()
    }

  });
  socket.on("disconnect", () => {
    console.log("socket disconnect")
  });
});


app.get("/:room/:player", (req, res) => {
  // check if rooms exist or not
  // not, create and player admin (start/restart game) 
  // yes 
  // A empezado ?
  //    si --- join
  //    no --- avisar


  //console.log(req)
  const {room, player}= req.params
  const socket = 1
  const data = {"room": room, "player": player}
  /*
  let Game = new Games(room, player)
  Game.info()
  console.log("checking pieces")
  let piece = new Piece()
  piece.newPiece()
  piece.print()
  piece.right()
  piece.print()
  piece.left()
  piece.print()
  piece.rotate()
  piece.print()
  */
  count++
  //Game.create(io, socket, data, players)
  play.piece.right()
  play.print()
  res.send(data);
  
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});