const tetriminios = require('./tetriminios.json');

class ClassTipo {
    constructor() { 
		console.log("init class Piece")
		this.x = 4
		this.y = 0
		this.rotation = 0
		this.index_piece = 0
		this.width = 0
		this.height = 0
	}

	newPiece (){
		this.index_piece = Math.floor(Math.random() * 7);
		this.x = 4
		this.y = 0
		this.rotation = Math.floor(Math.random() * 3)
		this.width =  tetriminios[this.index_piece].rotation[this.rotation][0].length
		this.height = tetriminios[this.index_piece].rotation[this.rotation].length
	}
	
	rotate(){
		this.rotation++;
		this.rotation = this.rotation % 4;
	}

	right(){
		this.x += 1;
	}

	left(){
		this.x -= 1;
	}

	print(){
		console.log("Piece:", this.index_piece, " x:", this.x, " y:", this.y," Rotation:", this.rotation, " Width:", this.width, " Height: ", this.height)
		console.log(tetriminios[this.index_piece].rotation[this.rotation])
	}    
}

module.exports = ClassTipo;