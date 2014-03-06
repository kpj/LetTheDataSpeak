var PlayerInit = function($masterdiv){

	var musicGenerator = undefined; 
	var BarPlayer = new Bars($masterdiv.find(".right"), 64); 

	var interval = undefined;
	var sequence = undefined;


	var iterate = function() {
		var state = sequence.stateSequence(); 

		var next = sequence.nextInteger(true);
		var percent = sequence.percent(); 

		// play the music
		musicGenerator.setNote(next);
		musicGenerator.playNote();

		// draw the bars
		BarPlayer.start(); 
		BarPlayer.hit(next, percent); 
		BarPlayer.vbarTick(state, config.intervalLength.value); 
	}

	var play = function() {
		stop();

		sequence = new DnaSequence($masterdiv.find(".data").val().toUpperCase());
		interval = setInterval(iterate, config.intervalLength.value);
		BarPlayer.start(); 

		$masterdiv.find("select").attr("disabled", "disabled"); 
	};

	var stop = function() {
		if(typeof interval !== "undefined"){
			clearInterval(interval);

			musicGenerator.stop();

			BarPlayer.clear(); 
			BarPlayer.stop(); 
			interval = undefined;
		}

		$masterdiv.find("select").removeAttr("disabled"); 
	};

	$masterdiv.find(".play").click(function() {play(); return false; });
	$masterdiv.find(".stop").click(function() {stop(); return false; });
	$masterdiv.find(".options").click(function() { $(".options_panel").toggle(); });

	// create options panel
	for(var p in config) {
		var cur = config[p];
		var ele = $('<input>')
			.attr('type', cur.type)
			.attr('value', cur.default)
			.data('key', p)
			.val(cur.value)
			.change(function(e) {
				var ele = $(e.target);
				config[ele.data('key')].value = ele.val();
				$('#' + ele.data('key') + '_val').text(ele.val());
			})
		;

		for(var k in cur.input) {
			ele.attr(k, cur.input[k]);
		}

		$(".options_panel").append(
			'<span>' + p + '</span>',
			ele,
			'(<span id="' + p + '_val">' + ele.val() + '</span>)',
			'<br />'
		);
	}
	$(".options_panel").hide();

	var sel = $masterdiv.find("select"); 
	for (var key in MidiSoundfonts){
		sel.append($('<option>').val(key).text(MidiSoundfonts[key].name)); 
	}


	$masterdiv.find("select").change(function(){
		var newFont = $masterdiv.find("select").attr("disabled", "disabled").val();
		$masterdiv.find(".play").attr("disabled", "disabled");  
		musicGenerator = new MidiPlayer(newFont, function(){
			$masterdiv.find(".play").removeAttr("disabled"); 
			$masterdiv.find("select").removeAttr("disabled"); 
		}); 
	}).change(); 

	$masterdiv.find(".middle").css("margin-top", -$masterdiv.find(".middle").height()/2); 
}

$(function(){
	$(".row").each(function(){
		PlayerInit($(this)); 
	}); 
})