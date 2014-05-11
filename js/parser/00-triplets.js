/*
	Triplets Parser

	Interprets input data as triplets
*/

Parser.register((function(){
	var TripletsParser = function(input){


		var result = []; 
		var i = 0; 

		var pauses = 0;

		var mapping = function(key){
			var ret = ({'A': '0','G': '1','T': '2','C': '3'})[key];

			if(!ret)
				throw "roses are red, violets are blue";

			return ret;
		}

		while(i < input.length){
			//Iterate over the sequence and push the single thingy
			if(input.length >= i+3){
				var str = input.substring(i, i+3).toUpperCase();
				try { 
					var noteId = parseInt(mapping(str[0]) + mapping(str[1]) + mapping(str[2]), 4); 

					if(str.length == 3){
						result.push({
							"type": "note", 
							"at": i + pauses*3, 
							"length": 1, 
							"note": noteId, 
							"volume": 0
						}); 
					}
				} catch(err) {
					pauses++;
				}
			}

			i = i+3; 
		}
		
		return result; 
	}; 

	TripletsParser.desc = "Triplets"; 
	TripletsParser.uname = "triplets"; 

	return TripletsParser; 
})()); 