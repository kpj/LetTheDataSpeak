function get_base_pairs() {
	return [
		"AG",
		"AT",
		"AC",
		"GA",
		"GT",
		"GC",
		"TA",
		"TG",
		"TC",
		"CA",
		"CG",
		"CT",
		"AA",
		"GG",
		"TT",
		"CC"
	];
}

function mutual_information(seq, kv) {
	/*
	 * The function I(k) quantifies the amount of information
	 * one obtains from the symbol i on a symbol j at a distance
	 * k within the sequence. It is, therefore, a measure of the
	 * strength of average correlation between the symbols i and j
	 * at a distance k.
	 * ["Information theory reveals large-scale synchronisation of statistical correlations in eukaryote genomes" - Dehnert, Helm, Hütt (2005)]
	 *
	 * Note: I(k) corresponds to mutual_information.get_information(k, ..), i to cur_pair[0], j to cur_pair[1] and k to ..well.. k
	 */

	var me = this;

	this.sequence = seq;

	this.kv = kv || [0, 1, 2];
	if(this.kv.indexOf(0) == -1) {
		// 0 is not in array, but we need it!
		this.kv.push(0);
	}

	this.init_dict = function() {
		dict = {};
		for(var i = 0 ; i < me.kv.length ; i++) {
			var k = me.kv[i];
			dict[k] = {};

			var entries = (k == 0) ? ["AA", "GG", "TT", "CC"] : get_base_pairs(); // little hack to have an easy handle for single frequencies (treat them as a pair with themselves)
			for(var e = 0 ; e < entries.length ; e++) {
				var cur = entries[e];

				// init with zero since we haven't processed any DNA yet
				dict[k][cur] = 0;
			}
		}
		return dict;
	}

	this.init_maxi = function() {
		maxi = {};
		for(var i = 0 ; i < me.kv.length ; i++) {
			maxi[me.kv[i]] = 0;
		}
		return maxi
	}

	this.get_frequencies = function() {
		// initialize dictionary
		var dict = me.init_dict();
		var maxi = me.init_maxi();

		// fill dictionary with absolute values
		for(var i = 0 ; i < me.sequence.length ; i++) {
			var base = me.sequence[i];

			// handle single/mutual frequencies
			for(var j = 0 ; j < me.kv.length ; j++) {
				var k = me.kv[j];
				var next_index = i + k;

				if(next_index < me.sequence.length) {
					// skip if not enough bases are available
					var next_base = me.sequence[next_index];
					dict[k][base + next_base]++;

					maxi[k]++; // needed for normalizing step
				}
			}
		}
		
		// normalize result
		for(var k in dict) {
			for(var base_combi in dict[k]) {
				dict[k][base_combi] /= maxi[k]; // divide number of combinations by total number in order to get frequency
			}
		}

		// done
		return dict;
	}

	this.get_information = function(k, dict) {
		var res = 0;
		var base_pairs = get_base_pairs();

		function get(i, j, k) {
			return dict[k][i+j];
		}

		for(var i = 0 ; i < base_pairs.length ; i++) {
			var cur_pair = base_pairs[i].split("");

			var p = get(cur_pair[0], cur_pair[1], k);
			res += (p == 0) ? 0 : p * log2(p / (get(cur_pair[0], cur_pair[0], 0) * get(cur_pair[1], cur_pair[1], 0)));
		}

		return res;
	}

	this.compute = function() {
		var res = [];

		var freqs = me.get_frequencies();

		for(var j = 0 ; j < me.kv.length ; j++) {
			var k = me.kv[j];

			if(k == 0)
				continue; // mutual information not defined for k=0

			var mutual_info = me.get_information(k, freqs);
			res.push(mutual_info);

			console.log(k, mutual_info);
		}

		return res;
	}
}