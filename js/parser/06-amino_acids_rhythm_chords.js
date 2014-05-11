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
		var offset = 16;

		var extra_velo = 3;

		var combi_offset = 4;
		var combis = [];

		var counter = 0;
		// continuous beat
		while(i < input.length){
			if(input.length >= i+3){
				var str = input.substring(i, i+3).toUpperCase(); 
				var noteId = offset + mapping[str]; 

				if(str.length == 3){
					if(counter % 8 != 0) {
						result.push({
							"type": "note", 
							"at": i, 
							"length": extra_velo, 
							"note": noteId, 
							"volume": 0
						}); 
					} else {
						result.push({
							"type": "note", 
							"at": i, 
							"length": extra_velo, 
							"note": noteId, 
							"volume": 0
						});
						result.push({
							"type": "note", 
							"at": i, 
							"length": extra_velo, 
							"note": noteId+combi_offset, 
							"volume": 0
						});

						if(input.length > i+8)
							combis.push([i, noteId, noteId+combi_offset]);
					}

					result.push({
						"type": "display", 
						"at": i, 
						"length": 1, 
						"text": str
					}); 
				}
			}

			i += 3;
			counter++;
		}

		// add combination to all other notes
		for(var p in combis) {
			for(var i = 1 ; i < 8 ; i++) {
				//if(combis[p][0]+i*3 > result.length)
				//	break;

				result.push({
					"type": "note", 
					"at": combis[p][0]+i*3, 
					"length": 1, 
					"note": combis[p][1], 
					"volume": 0
				});
				result.push({
					"type": "note", 
					"at": combis[p][0]+i*3, 
					"length": 1, 
					"note": combis[p][2], 
					"volume": 0
				});
			}
		}

		/*for(var p in result) {
			result[p].at *= 2;
		}*/
		
		return result; 
	}; 

	AAParser.desc = "Amino acids (rhythm chords)"; 
	AAParser.uname = "amino_acids_rhythm_chords"; 

	return AAParser; 
})()); 