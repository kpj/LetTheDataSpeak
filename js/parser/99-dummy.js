Parser.register((function(){
	var DummyParser = function(input, config){
		var result = []; 

		for(var i=0;i<64;i++){
			//Iterate over the sequence and push the single thingys

			result.push({
				"type": "note", 
				"at": i, 
				"length": 1, 
				"note": i
			}); 

			result.push({
				"type": "display", 
				"at": i, 
				"length": 1, 
				"text": i.toString()
			}); 
		}

		return result; 
	}; 

	DummyParser.desc = "Dummy"; 
	DummyParser.uname = "dummy"; 
	DummyParser.config = {
		"num": {
			"name": "Number", 
			"type": "number", 
			"params": {"min": 100, "max": 1000}, 
			"default": 200, 
			"help": "A numerical parameter"
		}, 
		"bool": {
			"name": "Flag", 
			"type": "boolean", 
			"default": false, 
			"help": "A boolean parameter"
		}, 
		"string": {
			"name": "Text", 
			"type": "string", 
			"default": "", 
			"help": "A string parameter"
		}
	}; 

	return DummyParser; 
})()); 