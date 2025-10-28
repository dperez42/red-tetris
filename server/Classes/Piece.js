const tetriminios = require('./tetriminios.json');

class ClassTipo {
    constructor() { 
		console.log("init class Piece")
		this.index_piece = 0
		this.x = 4
		this.y = 0
		this.rotation = 0
		this.width = 0
		this.height = 0
		this.data = []
		this.color = 1
		this.nb_piece = 1
		this.score = 0
		this.GameOver = false
	}

	firstPiece(list_pieces){
		this.index_piece = list_pieces[0].index_piece;
		this.x = list_pieces[0].x
		this.y = list_pieces[0].y
		this.rotation = list_pieces[0].rotation
		this.color = list_pieces[0].color

		this.width =  tetriminios[this.index_piece].rotation[this.rotation][0].length
		this.height = tetriminios[this.index_piece].rotation[this.rotation].length
		this.data = tetriminios[this.index_piece].rotation[this.rotation]
		this.color = 1
		this.nb_piece = 1
		this.score = 0
		this.GameOver = false
	}

	newPiece (){
		this.index_piece = Math.floor(Math.random() * 7);
		this.x = 4
		this.y = 0
		this.rotation = Math.floor(Math.random() * 3)
		this.width =  tetriminios[this.index_piece].rotation[this.rotation][0].length
		this.height = tetriminios[this.index_piece].rotation[this.rotation].length
		this.data = tetriminios[this.index_piece].rotation[this.rotation]
		this.color = 1 + Math.floor(Math.random() * 4)
		this.nb_piece = 1
		this.score = 0
		this.GameOver = false
	}
	checkGameOver(field) {
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				if (this.data[row][col] !== 0) {  // piece has a block
					const y = this.y + row;
					const x = this.x + col;
					if (field[y][x] !== 0) {
						// There's already a block at the spawn position
						return true;
					}
				}
			}
		}
		return false; // No collision → game can continue
	}
	checkCollision(field){
		for (let row = 0; row < this.height; row++) {
			for (let col = 0; col < this.width; col++) {
				// Si la celda de la pieza actual está vacía, no hay que verificar colisión
				if (this.data[row][col] === 0) continue;
				const newY = this.y + row 
				const newX = this.x + col 
				//console.log("newY", newY, field.length-1, "newX", newX)
				// 🔹 Comprobar colisión con los bordes
				if (newY >= field.length || newY < 0 || newX < 0 || newX >= field[0].length){
				//if (newY >= field.length) {
					return true; // fuera del tablero
				}
				// 🔹 Comprobar colisión con una celda ocupada
				if (field[newY][newX] !== 0) {
					return true;
				}
			}
		}
		return false
	}
	clearlines(field, freeze_lines){
		let linesCleared = 0;
		let check = 1
		while (check===1){
			check = 0
			for (let y = field.length - 1 - freeze_lines; y >= 0; y--) {
				if (field[y].every(cell => cell !== 0)) {
				field.splice(y, 1); // remove row at y
				field.unshift(Array(field[0].length).fill(0)); // add empty row at top
				linesCleared++;
				check=1
				//y++; // recheck same row
				}
			}
		}
		console.log("cleared ", linesCleared)
		return linesCleared;	
	}
	// set piece in field
	addPieceToField(field, list_pieces, nb_piece){
		for (let i = this.y; i < this.y + this.height; i++){
			for (let j = this.x; j < (this.x +  this.width); j++){
			   //// solo pinta lo que esta dentro de los limites
			   if ((i >=0 & i <20) & (j>=0 & j <10)){
				   //field[i][j]=1;
				   if (this.data[i-this.y][j-this.x]===1){
					   field[i][j]=this.color;
				   }
			   }
			}
		}
		// give me new piece ------------ 
		//this.newPiece ()
		//console.log("mew piece", this.nb_piece)
		this.index_piece = list_pieces[this.nb_piece].index_piece;
		this.x = list_pieces[this.nb_piece].x
		this.y = list_pieces[this.nb_piece].y
		this.rotation = list_pieces[this.nb_piece].rotation
		this.color = list_pieces[this.nb_piece].color

		this.width =  tetriminios[this.index_piece].rotation[this.rotation][0].length
		this.height = tetriminios[this.index_piece].rotation[this.rotation].length
		this.data = tetriminios[this.index_piece].rotation[this.rotation]
		this.nb_piece = this.nb_piece + 1
		// call check GameOver
		this.GameOver = this.checkGameOver(field)
		if (this.GameOver){console.loj("")}
	}
	getNb_piece(){
		return this.nb_piece
	}
	getScore(){
		return this.score
	}
	getGameStatus(){
		return this.GameOver 
	}
	// rotate
	rotate(field){
		this.rotation++;
		this.rotation = this.rotation % 4;
		this.data = tetriminios[this.index_piece].rotation[this.rotation]
		if (this.checkCollision(field)){
			this.rotation -= 1;
			this.rotation = this.rotation % 4;
			this.data = tetriminios[this.index_piece].rotation[this.rotation]
		}
	}
	// right
	right(field){
		this.x += 1;
		if (this.checkCollision(field)){
			this.x -= 1;
		}
	}
	// left
	left(field){
		this.x -= 1;
		if (this.checkCollision(field)){
			this.x += 1;
		}
	}
	// gravity
	down(gravity, list_pieces, field, freeze_lines){
		//console.log("calling down", this.score)
		//console.log("calling down",this.nb_piece, "--", list_pieces[this.nb_piece])
		this.y += gravity;
		//console.log("calling down",this.checkCollision(field))
		if (this.checkCollision(field)){
			//Undo Move
			this.y -= gravity;
			// Merge piece in field
			this.addPieceToField(field, list_pieces)
			// check full lines
			console.log("before:",this.score)
			this.score = this.score + this.clearlines(field, freeze_lines)
			console.log("after:",this.score)
		}
	}
	// softdrop
	softDrop(field){
		//console.log("softDrop")
		this.y += 1;
		if (this.checkCollision(field)){
			//Undo Move
			this.y -= 1;
			// Merge piece in field
			//this.addPieceToField(field)
			// check full lines
			this.clearlines(field)
		}
	}
	// harddrop
	hardDrop(field){
		//console.log("hardDrop")
		while(1){
			this.y += 1;
			if (this.checkCollision(field)){
				//Undo Move
				this.y -= 1;
				// Merge piece in field
				//this.addPieceToField(field)
				break
			}  
		}
		// check full lines
		this.clearlines(field)
	}
	// info
	print(){
		console.log("Piece:", this.index_piece, " x:", this.x, " y:", this.y," Rotation:", this.rotation, " Width:", this.width, " Height: ", this.height)
		console.log(tetriminios[this.index_piece].rotation[this.rotation])
	}    
}

module.exports = ClassTipo;