class ClassTipo {
	x: number = 4;
	y: number = 0;
    constructor() { 
		console.log("init class")
		this.x = this.getIndexStart();
	}
    /*
	 ** Comment
	 */
	start = () => {
		return new Promise((resolve, reject) => {
			console.log("class tipo")
		});
	};
}

module.exports = ClassTipo;