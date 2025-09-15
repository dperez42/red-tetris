const { Socket } = require("socket.io")

class Games {
	constructor() { 
		console.log("init class Redtetris")
		this.games = []
		/*
		[
		{ 	name,  game name
			admin, username admin
			sockets, list of sockets players
		 	players[], list of players
			list_pieces[], list of pieces
			isStart (false/true), 
		},
		...
		]
		*/
	}
	addGame(game){
		this.games.push(game)
		return
	}
	delGame(game_name){
		const filtered = this.games.filter(item => item.name !==game_name) // remove an element with specified valu
		this.games = filtered
		return
	}
	lenGame(){
		return this.games.length
	}
	checkGame(room_name){
		let ex = false
		this.games.forEach(game => {
			if (game.name == room_name) {
				ex = true
			}
		});
		return ex
	}
	getGames(){
		return this.games
	}
	getGame(room_name){
		let my_game 
		this.games.forEach(game => {
			if (game.name == room_name) {
				my_game = game
				return game
			}
		});
		return my_game
	}
	info(){
		return this.games
	}
}

module.exports = Games;