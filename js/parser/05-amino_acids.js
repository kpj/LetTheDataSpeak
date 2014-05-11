Parser.register((function(){
	var AAParser = function(input){
		//TODO: Make this properly
		var result = []; 
		var i = 0; 

		var mapping = {
			"TTT": 0,
			"TTC": 0,
			"TTA": 1,
			"TTG": 1,
			"TCT": 2,
			"TCG": 2,
			"TCA": 2,
			"TCC": 2,
			"TAT": 3,
			"TAC": 3,
			"TAA": 4,
			"TAG": 4,
			"TGA": 4,
			"TGT": 5,
			"TGC": 5,
			"TGG": 6,
			"CTT": 7,
			"CTG": 7,
			"CTA": 7,
			"CTC": 7,
			"CCC": 8,
			"CCA": 8,
			"CCG": 8,
			"CCT": 8,
			"CAT": 9,
			"CAC": 9,
			"CAA": 10,
			"CAG": 10,
			"CGG": 11,
			"CGC": 11,
			"CGT": 11,
			"CGA": 11,
			"ATT": 12,
			"ATC": 12,
			"ATA": 12,
			"ATG": 13,
			"ACC": 14,
			"ACA": 14,
			"ACT": 14,
			"ACG": 14,
			"AAC": 15,
			"AAT": 15,
			"AAG": 16,
			"AAA": 16,
			"AGC": 17,
			"AGT": 17,
			"AGG": 18,
			"AGA": 18,
			"GTT": 19,
			"GTA": 19,
			"GTC": 19,
			"GTG": 19,
			"GCC": 20,
			"GCT": 20,
			"GCA": 20,
			"GCG": 20,
			"GAC": 21,
			"GAT": 21,
			"GAG": 22,
			"GAA": 22,
			"GGG": 23,
			"GGT": 23,
			"GGA": 23,
			"GGC": 23
		};
		var offset = 30;

		var pauses = 0;

		while(i < input.length){
			//Iterate over the sequence and push the single thingy
			if(input.length >= i+3){
				var str = input.substring(i, i+3).toUpperCase(); 
				var noteId = offset + mapping[str]; 

				if(!noteId) {
					pauses++;
				} else {
					if(str.length == 3){
						result.push({
							"type": "note", 
							"at": i + pauses*3, 
							"length": 1, 
							"note": noteId, 
							"volume": 0
						}); 
					}
				}
			}

			i = i+3; 
		}
		
		return result; 
	}; 

	AAParser.desc = "Amino acids"; 
	AAParser.uname = "amino_acids"; 

	return AAParser; 
})()); 