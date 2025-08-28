class Games {
	constructor(name, player, intervalTime) { 
		console.log("init class")
		this.name = name
		this.player = player
		this.list_pieces = []
		this.isStart = false
		this.intervalId = null
		this.intervalTime = intervalTime
	}
	start(seed){
		this.isStart = true
	}
	stop(){
		this.isStart = false
	}
	info(){
		console.log(this.name, this.player)
		return
	}
}

module.exports = Games;