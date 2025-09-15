const Piece = require("./Piece.js");

class Game {
	constructor(name,  intervalTime) { 
		console.log("init class Game")
		this.name = name
		this.admin = null
		this.sockets = []
		this.players = []
		this.list_pieces = []
		this.addPiece()        //añado las primera piece
		this.isStart = false
		this.intervalId = null
		this.intervalTime = intervalTime
	}
	start(seed){
		this.isStart = true

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
	addPlayer(player, socket){
		this.players.push(player)
		this.sockets.push(socket)
		
		return
	}
	delPlayer(player_name){
		const filtered = this.players.filter(item => item.name !==player_name) // remove an element with specified valu
		this.players = filtered
		return
	}
	addPiece(){
		const piece = new Piece
		piece.newPiece()
		this.list_pieces.push(piece)
		console.log("añado piece a game")
		piece.print()
	}
	stop(){
		this.isStart = false
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
}

module.exports = Game;