const Piece = require("./Piece.js");

class ClassTipo {
    constructor(sizeColumn, sizeRow, name) { 
		console.log("init class Player")
		this.sizeColumn = sizeColumn
		this.sizeRow = sizeRow
		this.name = name
		this.piece = new Piece
		this.nb_piece = 0
		this.field = Array.from({ length: sizeRow }, () => Array(sizeColumn).fill(0));
		this.field_piece = Array.from({ length: sizeRow }, () => Array(sizeColumn).fill(0));
		this.score = 0
		this.freeze_lines = 0
		this.addPiece()
		this.merge()
		//console.log(this.field)
		//console.log(this.piece.print())
	}

	addPiece(game){
		this.piece.newPiece()
		console.log(this.piece.print())
	}

	print(){
		console.log("Player:", this.name)
		let field_temp = Array.from({ length: this.sizeRow }, () => Array(this.sizeColumn).fill(0));
		for (let i = 0; i < this.sizeRow; i++){
         for (let j = 0; j < this.sizeColumn; j++){
                field_temp[i][j]=this.field[i][j];
		 }
		}
		for (let i = this.piece.y; i < this.piece.height; i++){
         for (let j = this.piece.x; j < (this.piece.x +  this.piece.width); j++){
            field_temp[i][j]=1;
		 }
		}
		for (let i = 0; i < this.sizeRow; i++){
         for (let j = 0; j < this.sizeColumn; j++){
                process.stdout.write(field_temp[i][j] + " ");
		 }
		 console.log()
		}
	}
	merge(){
		let field_temp = Array.from({ length: this.sizeRow }, () => Array(this.sizeColumn).fill(0));
		for (let i = 0; i < this.sizeRow; i++){
         for (let j = 0; j < this.sizeColumn; j++){
                field_temp[i][j]=this.field[i][j];
		 }
		}
		for (let i = this.piece.y; i < this.piece.height; i++){
         for (let j = this.piece.x; j < (this.piece.x +  this.piece.width); j++){
            if (this.piece.data[i-this.piece.y][j-this.piece.x]===1){
				field_temp[i][j]=1;
			}
		 }
		}
		this.field_piece = field_temp
	}
	getBoard(){
		let field_temp = Array.from({ length: this.sizeRow }, () => Array(this.sizeColumn).fill(0));
		for (let i = 0; i < this.sizeRow; i++){
         for (let j = 0; j < this.sizeColumn; j++){
                field_temp[i][j]=this.field[i][j];
		 }
		}
		for (let i = this.piece.y; i < this.piece.height; i++){
         for (let j = this.piece.x; j < (this.piece.x +  this.piece.width); j++){
            field_temp[i][j]=1;
		 }
		}
		return field_temp
	}
}

module.exports = ClassTipo;