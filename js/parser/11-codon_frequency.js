Parser.register((function(){
	var TripletsParser = function(input){
		//TODO: Make this properly
		var result = []; 
		var i = 0; 

		var mapping = function(key){
			return ({'A': '0','G': '1','T': '2','C': '3'})[key] || ""; 
		}

		var codon_frequencies = {};
		var codon_counter = 0; // currently not sure which step size to take

		// compute frequencies
		for(var j = 0 ; j < input.length - 2 ; j++) {
			var codon = input[j] + input[j+1] + input[j+2];
			if(codon in codon_frequencies) {
				codon_frequencies[codon]++;
			} else {
				codon_frequencies[codon] = 1;	
			}

			codon_counter++;
		}
		for(var key in codon_frequencies) {
			codon_frequencies[key] /= codon_counter;
		}


		while(i < input.length){
			//Iterate over the sequence and push the single thingy
			if(input.length > i+3){
				var str = input.substring(i, i+3).toUpperCase(); 
				var codon = str[0] + str[1] + str[2];
				var noteId = parseInt(mapping(str[0]) + mapping(str[1]) + mapping(str[2]), 4); 

				if(str.length == 3){
					result.push({
						"type": "note", 
						"at": i, 
						"length": Math.round(Math.log(codon_frequencies[codon]) * 10), 
						"note": noteId, 
						"volume": 0
					}); 

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

	TripletsParser.desc = "CodonFrequencyTempo"; 
	TripletsParser.uname = "codon_freq_tempo"; 

	return TripletsParser; 
})()); 