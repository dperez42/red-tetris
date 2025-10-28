// npm start
// https://github.com/Ysrbolles/Red-tetris-42Network/blob/main/index.js
// https://github.com/sawyerf/red-tetris/blob/main/back/utils/Game.ts

const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const path = require('path');
const Redtetris = require("./Classes/Redtetris.js");
const Game = require("./Classes/Game.js");
const Piece = require("./Classes/Piece.js");
const Player = require("./Classes/Player.js");
const fs = require ('fs')
const dotenv = require('dotenv');

// INIT REDTETRIS
let redtetris = new Redtetris()

// get config vars
dotenv.config({path: __dirname + '/.env'})
console.log(process.env)
const PORT = process.env.SERVER_PORT || 1337;
console.log(PORT)

const app = express();
const server = http.createServer(app);

// Define CORS
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(__dirname + "/../client/dist/"));a
app.use('/assets', express.static(path.join(__dirname + '/../public/assets')));
app.disable('etag') //disable etag to avoid 304 during development

// Socket configuration
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
  },
  path: "",
});
io.on("connection", async (socket) => {
  const data = {
      'command':'info',
      'data': "CONNECTED TO SERVER"
  }
  socket.emit('red_tetris_client',data)
  try {
      socket.sendBuffer = [];
      console.log("Client Connected From", socket.handshake.headers.referer, socket.id);
      //console.log("Client Connected From", socket, socket.id);
  } catch (e) {
      console.log(e.message);
  }
  socket.on("red_tetris_server", async (data) => {
    //console.log("msg recieved in red-tetris server from ",socket.id,".",data)  
    if (data.command==='join'){
        //console.log("exist game?", data.roomName)
        const room_exists =  redtetris.checkGame(data.roomName)
        //console.log(room_exists)
        // Check if Game exists?
        if (!room_exists){
          console.log("creating game.", data.roomName)
          const game = new Game(data.roomName, 1)
          console.log("Player:", data.playerName, " init Room:", data.roomName)
          const player = new Player(10,20, data.playerName,socket.id)
          game.addPlayer(player, socket.id) // quito este array socketid
          redtetris.addGame(game)
          // send update msg to all player in the game
          game.sendUpdate(io)
        } else {
          // search game by name
          console.log('Game ',data.roomName," exist.")
          const game = redtetris.getGame(data.roomName)
          // check if user is in game yet
          const check_player = game.checkPlayer(data.playerName)
          if (!check_player) {
            console.log("Player:", data.playerName, " join to Room:", data.roomName)
            const player = new Player(10,20, data.playerName,socket.id)
            game.addPlayer(player, socket.id)
            game.info()
            // send update msg to all player in the game
            game.sendUpdate(io)
          } else {
            console.log("Player:", data.playerName, " already in Room:", data.roomName)
          }
        }
        
    }
    if (data.command==='start'){
      console.log("recieve startCountdown", data.gameName)
      // search game by name
      const game = redtetris.getGame(data.gameName)
      console.log("game",game)
      game.startCountdown(io)      
    }
    if (data.command==='move'){
      //console.log("recieve move", data)
      // search game by name
      const game = redtetris.getGame(data.gameName)
      //console.log(game)
      const player = game.getPlayerBySocket(data.playerSocket)
      //console.log(player)
      player.movePiece(data.move)
      // send update msg to all player in the game
      game.sendUpdate(io)
    }
    //console.log("send end")
  });
  socket.on("di sconnect", () => {
    console.log("socket disconnect",socket.id)
    const game = redtetris.getGameBySocket(socket.id)
    if (game){
      // delete player with socket look in all games 
      game.delPlayerBySocket(socket.id)
      // send update msg to all player in the game
      game.sendUpdate(io)
    }
  });
});


// Sending app by index.html

//app.get('/', (req, res) => {
  //console.log("paframeters:")//, req)
   //req.params={}
   //console.log("redirect", req.params)
  /*
  console.log("Lrrrl")
  console.log(req)
  const file = '/../client/dist/index.html'
  fs.readFile(__dirname + file, (err, data) => {
			if (err) {
				console.log(err)
				res.writeHead(500)
				return res.end('Error loading index.html')
			}
			res.writeHead(200)
			res.end(data)
		})
  */
  //res.send({"success":true, "msg":"join to game"});
  /*
  const options = {
    root: path.join(__dirname, '/../client/dist/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Content-Type': 'html',
      'Cache-Control':'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires':0
    }
  }
  const fileName = 'index.html'
   res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
});
*/
// this send back the game page /// 
app.get("/:user/:pp", (req, res, next) => {
  console.log("params",req.params.pp, req.params.user)
    // do the checks of rooms and player in join(socket)

  //const filePath = path.join(__dirname, '/../public/')
  const filePath = path.join(__dirname, '/../public/')
  console.log(filePath)
    res.sendFile(filePath + 'index.html', 
      {headers: {
        //'Content-Type': 'text/html',
        //'Cache-Control':' no-cache, no-store,must-revalidate',
        //'Pragma': 'no-cache',
        //'Expires':0
      }}, (err) => {
        if (err) {
          console.log(err)
          res.writeHead(500)
          return res.end('Error loading index.html')
        }
      })
  /*
  console.log("redirect", req.params.room)
  const query = {
          "a": 1,
          "b": 2,
          "valid":"your string here"
      };
  res.query = query
  res.redirect('/')
  */
  //next()
  /*
  const room_name = req.params.room 
  const player_name = req.params.player
  console.log("[/:room/:player].",room_name, player_name)
  // check if there are game
  console.log("[/:room/:player]. exist game?")
  const nb_games = redtetris.lenGame()
  let games_exist = true
  if (nb_games===0){
    games_exist = false
  }
  // check if rooms exist or not
  // Game no exists
  if (!redtetris.checkGame(room_name)){
    console.log("[/:room/:player]. creating game.You are admin")
    const game = new Game(room_name)
    const player = new Player(10,20, player_name)
    game.addPlayer(player)
    redtetris.addGame(game)
    const file = '/../client/dist/index.html'
    fs.readFile(__dirname + file, (err, data) => {
        if (err) {
          console.log(err)
          res.writeHead(500)
          return res.end('Error loading index.html')
        }
        res.writeHead(200)
        res.end(data)
      })
    //res.send({"success":true, "msg":"game created"});
    //res.sendFile('index.html', {'root': __dirname + '/../client/dist/'});
    console.log("Redtetris sstatus:", redtetris.info()) 
    //next()
  } else { // id exists check if is started
    console.log("[/:room/:player]. adding game?")
    const my_game = redtetris.getGame(room_name)
    // check if player is in game
    if (my_game.checkPlayer(player_name)) {
        res.send({"success":true, "msg":"just in game"});
        console.log("Redtetris sstatus:", redtetris.info())
        return
    }
    console.log("start",my_game.isStart)
    if (my_game.isStart) { 
      res.send({"success":false, "msg":"game started"});
      return
    } else { //JOIN TO GAME
      const my_player = new Player(10,20, player_name)
      my_game.addPlayer(my_player)
      console.log("Redtetris status:", redtetris.info())
      res.send({"success":true, "msg":"join to game"});
      return
    }

  } 
  console.log("nb of games", redtetris.lenGame())
  
  return
  */
});


/*
app.get("/list", (req, res) => {
   res.sendFile('index.html', {'root': __dirname + '/../client/dist/'});
});
app.get("/create", (req, res) => {
   res.sendFile('index.html', {'root': __dirname + '/../client/dist/'});
});
app.get("/game", (req, res) => {
   res.sendFile('index.html', {'root': __dirname + '/../client/dist/'});
});
*/
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});