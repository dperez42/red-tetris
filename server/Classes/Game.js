const Piece = require("./Piece.js");

class Game {
	constructor(name, gravity) { 
		console.log("init class Game")
		this.name = name
		this.admin = null
		this.sockets = []
		this.players = []
		// add pieces to list this.list_pieces = []
		console.log(` creating initial list of pieces ...`);
		this.list_pieces = []
		this.addPieces(20)
		this.isStart = false
		this.intervalGame = null
		this.countGame = 200 // for testing purpose
		this.gravity = gravity
		this.isCountdown = false
		this.countdown = 5
		this.intervalCountdown = null
	}
	
	gamelogic(io){
		//console.log("exec game logic")
		// move pieces
		this.players.forEach(player => {
			player.movePiece('down', this.gravity, this.list_pieces)
		});
		// check if more pieces are needed
		this.players.forEach(player => {
			if (player.getNbpiece()>this.list_pieces.length-10){
				this.addPieces(20)
			}
		});
		// checks status game players is Finish?
		// check if more pieces are needed
		this.players.forEach(player => {
			if (player.getStatusGame()){
				
			}
		});
		// send update
		this.sendUpdate(io)
	}
	sendUpdate(io){
		this.sockets.forEach(socketId => {
			const socket = io.sockets.sockets.get(socketId);
			if (socket) {
				//console.log(`sending ${socket}`)
				const data ={}
				data.name =this.name
				data.admin = this.admin 
				//data.sockets = this.sockets 
				data.players = this.players
				data.list_pieces = this.list_pieces 
				data.isStart = this.isStart 
				//data.intervalGame = this.intervalGame 
				data.gravity = this.gravity 
				data.isCountdown = this.isCountdown 
				data.countdown = this.countdown 
				//data.intervalCountdown = this.intervalCountdown 
				const msg = {
					'command':'update',
					'data': data
				}
				//console.log(data)
				socket.emit('red_tetris_client', msg);
			} else {
			  console.warn(`Socket not found: ${socketId}`);
			}
		});
	}
	start(seed,io){
		console.log(` starting game with seed ${seed} ...`);
		this.isStart = true
		// send message of start
		// 🔥 Send update to each socket in this.sockets
		this.sockets.forEach(socketId => {
			const socket = io.sockets.sockets.get(socketId);
			if (socket) {
				console.log(`sending ${socket}`)
				const msg = {
					'command':'start',
					'isStart': this.isStart,
				  }
				socket.emit('red_tetris_client', msg);
			} else {
			  console.warn(`Socket not found: ${socketId}`);
			}
		});
		// add first piece to all
		this.players.forEach(player => {
			player.addFirstPiece(this.list_pieces)
		});
		// send update
		this.sendUpdate(io)

		// start interval of game logic
		
		this.intervalGame = setInterval(() => {
			this.countGame--
			this.gamelogic(io)
			if (this.countGame<0){
				clearInterval(this.intervalGame);
				this.countGame=10
				console.log("Interval stopped");
			}
		},400)
	}
	stop(){
		//this.isStart = false
	}
	startCountdown(io){
		console.log(`Countdown of ${this.name}: ${this.countdown}`);
		if (this.isCountdown) return; // evita múltiples countdowns
		this.isCountdown = true
		this.intervalCountdown = setInterval(() => {
			this.countdown--;
			console.log(`Countdown of ${this.name}: ${this.countdown}`);
			// Aquí podrías mando update a los jugadores
			// 🔥 Send update to each socket in this.sockets
			this.sockets.forEach(socketId => {
				const socket = io.sockets.sockets.get(socketId);
				if (socket) {
					console.log(`sending ${socket}`)
					const msg = {
						'command':'countdown',
						'isCountdown': this.isCountdown,
						'countdown':this.countdown
					  }
					socket.emit('red_tetris_client', msg);
				} else {
				  console.warn(`Socket not found: ${socketId}`);
				}
			  });
			if (this.countdown <= 0) {
			  clearInterval(this.intervalCountdown);
			  this.intervalCountdown = null;
			  this.isCountdown = false
			  this.countdown = 5;
			  console.log(`Countdown of ${this.name} finished...`);
			  // 🔥 Send update to each socket in this.sockets
				this.sockets.forEach(socketId => {
					const socket = io.sockets.sockets.get(socketId);
					if (socket) {
						console.log(`sending ${socket}`)
						const msg = {
							'command':'countdown',
							'isCountdown': this.isCountdown,
							'countdown': this.countdown
						}
						socket.emit('red_tetris_client', msg);
					} else {
					console.warn(`Socket not found: ${socketId}`);
					}
				});
			  // 🔥 start game
			  this.start(Math.random(),io); // o pasa un seed real
			}
		  }, 1000);
	}
	checkPlayer(player_name){
		let ex = false
		this.players.forEach(player => {
			if (player.name == player_name) {
				ex = true
			}
		});
		return ex
	}
	//add player to game
	addPlayer(player, socket){
		// Add player in players[]
		this.players.push(player)
		// Add player socket in sockets[]
		this.sockets.push(socket)
		return
	}
	//delete a player from a game by name
	delPlayer(player_name){
		// Delete player by name in players[]
		const filtered = this.players.filter(item => item.name !==player_name) // remove an element with specified valu
		this.players = filtered
		return
	}
	//get player by socket_id
	getPlayerBySocket(socket_id){
		for (let i = 0; i < this.players.length; i++){
			if (this.players[i].socket === socket_id) return this.players[i]
		}
		return null
	}
	//delete a player from a game by socket.id
	delPlayerBySocket(socket){
		// Delete player by socket in players[]
		const filtered = this.players.filter(item => item.socket !== socket) // remove an element with specified valu
		this.players = filtered
		// Delete player socket in socket[]
		const filtered_sockets = this.sockets.filter(item => item !== socket)
		this.sockets = filtered_sockets
		return
	}
	addPieces(nb){
		for (let i = 0; i < nb; i++) {
			const piece = {}
			piece.index_piece = Math.floor(Math.random() * 7);
			piece.x = 4
			piece.y = 0
			piece.rotation = Math.floor(Math.random() * 4)
			piece.color = 1 + Math.floor(Math.random() * 4)
			this.list_pieces.push(piece)
			console.log("añado piece a game")
			//piece.print()
		}
		console.log("list of pieces")
		console.log(this.list_pieces)
	}
	info(){
		console.log("name of the game:",this.name, "list of players:",this.players)
		return
	}
	getName(){
		return this.name
	}
	getSockets(){
		return this.sockets
	}
	getNbPieces(){
		return this.list_pieces.length	
	}
}

module.exports = Game;