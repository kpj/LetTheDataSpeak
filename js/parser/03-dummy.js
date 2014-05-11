/*
	Dummy Parser

	Just plays all the notes available. 
*/

Parser.register((function(){
	var DummyParser = function(input){
		var result = []; 

		var i = 0; 
		for(i=0;i<64;i++){
			result.push({
				"type": "note", 
				"at": i, 
				"length": 1, 
				"note": i, 
				"volume": Math.round(Math.random()*100) - 50
			}); 
		}

		return result; 
	}; 

	DummyParser.desc = "Sound Checker"; 
	DummyParser.uname = "dummy"; 

	return DummyParser; 
})()); 