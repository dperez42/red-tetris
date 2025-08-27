class ClassTipo {
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
}

module.exports = ClassTipo;