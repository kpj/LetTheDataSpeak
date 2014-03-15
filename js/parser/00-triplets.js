Parser.register((function(){
	var TripletsParser = function(input, config){
		//TODO: Make this properly
		var result = []; 
		var i = 0; 

		var mapping = function(key){
			return ({'A': '0','G': '1','T': '2','C': '3'})[key] || ""; 
		}

		while(i < input.length){
			//Iterate over the sequence and push the single thingy
			if(input.length > i+3){
				var str = input.substring(i, i+3).toUpperCase(); 
				var noteId = parseInt(mapping(str[0]) + mapping(str[1]) + mapping(str[2]), 4); 

				if(str.length == 3){
					result.push({
						"type": "note", 
						"at": i, 
						"length": 1, 
						"note": noteId
					}); 

					console.log(str); 

					result.push({
						"type": "display", 
						"at": i, 
						"length": 1, 
						"text": str
					}); 
				}
			}

			i = i+3; 
		}
		
		return result; 
	}; 

	TripletsParser.desc = "Triplets"; 
	TripletsParser.uname = "triplets"; 
	TripletsParser.config = {}; 

	return TripletsParser; 
})()); 