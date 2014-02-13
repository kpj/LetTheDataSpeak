// global variables
var size = 10;
var grid = [];
var step = 0;

// helper functions
function create_table(n) {
	var table = $('<table></table>');

	// add time line
	var row = $('<tr></tr>')
		.attr('id', 'timeline')
	;

	for(x = 0 ; x < n ; x++) {
		var col = $('<td></td>')
			.text('-');

		row.append(col);
	}
	table.append(row);

	// add music points
	for(y = 0 ; y < n ; y++) {
		var row = $('<tr></tr>');

		for(x = 0 ; x < n ; x++) {
			// table entry
			var col = $('<td></td>')
				.text('[ ]')
				.data('x', y) // *cough*
				.data('y', x) // ...
				.data('enabled', false)
				.click(function(e) {
					var me = $(e.target);

					// handle table
					me.data('enabled', !me.data('enabled'));
					if(me.data('enabled')) {
						me.text('[x]');
					} else {
						me.text('[ ]');
					}

					// update grid
					grid[me.data('y')][me.data('x')]['enabled'] = me.data('enabled');
				})
			;

			// grid entry (grid must be initialized here!)
			grid[col.data('y')][col.data('x')]['freq1'] = (x + 1) * 100;
			grid[col.data('y')][col.data('x')]['freq2'] = (size - y) * 100;

			row.append(col);
		}

		table.append(row);
	}

	return table;
}

function gen_grid(n) {
	var g = [];

	for(y = 0 ; y < n ; y++) {
		g.push([]);
		for(x = 0 ; x < n ; x++) {
			g[y].push({'enabled': false});
		}
	}

	return g;
}

function iterate() {
	// update timeline
	$($('#timeline').children()[(step != 0) ? step - 1 : size - 1]).text('-');
	$($('#timeline').children()[step]).text('|');

	// play tune
	var cur = grid[step];
	for(var i = 0 ; i < size ; i++) {
		var dat = cur[i];
		if(dat['enabled']) {
			// play tune
			var sine1 = T("sin", {freq: T("pulse", {freq: dat['freq1'], add: 880, mul: 20}).kr()});
			var sine2 = T("cos", {freq: dat['freq2']});

			T("perc", {r:800}, sine1, sine2).on("ended", function() {
				this.pause();
			}).bang().play();
		}
	}


	step = (step + 1) % size;
}


// set up page
$(document).ready(function() {
	grid = gen_grid(size);

	$('#grid').empty();
	$('#grid').append(create_table(size));

	window.setInterval(iterate, 800);
});