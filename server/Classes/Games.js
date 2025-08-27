class Games {
    constructor() { 
		console.log("init class")
	}
    /*
	 ** Comment
	 */
	start = () => {
		return new Promise((resolve, reject) => {
			console.log("class tipo")
		});
	};
	// create Room
	create = (io, socket, data, players) => {
		return new Promise((resolve, reject) => {
			console.log("create rooms", data)
		});
	};
}

module.exports = Games;