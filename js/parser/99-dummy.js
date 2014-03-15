Parser.register((function(){
	var DummyParser = function(input){
		var result = []; 

		for(var i=0;i<64;i++){
			//Iterate over the sequence and push the single thingys

			result.push({
				"type": "note", 
				"at": i, 
				"length": 1, 
				"note": i, 
				"volume": Math.round(Math.random()*100) - 50
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

	return DummyParser; 
})()); 