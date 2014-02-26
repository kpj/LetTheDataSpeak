function DnaSequence(seq) {
	var me = this;

	this.sequence = seq;
	this.index = 0;

	this.next = function(cyclic) {
		var chunk = me.sequence.slice(me.index, me.index+3);
		me.index += 3;

		if(me.index >= me.sequence.length) {
			if(cyclic === true){
				me.index = me.index % me.sequence.length; 
			} else {
				throw new Error('Dna Overflow');
			}
		}
		
		return chunk;
	}

	this.mapping = {
		'A': '0',
		'G': '1',
		'T': '2',
		'C': '3'
	};

	this.nextInteger = function(cyclic) {
		var chunk = me.next(cyclic).split('').map(function(e) {
			return me.mapping[e];
		}).join('');
		//Base 4 is just fine for fixed-length-strings
		return parseInt(chunk, 4);
	}
}