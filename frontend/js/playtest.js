$(function(){

	var musicGenerator = new MidiPlayer(); // to alter music generation simply exchange this class

	var interval = undefined;
	var sequence = undefined;


	var iterate = function() {
		var next = sequence.nextInteger(true);
		
		//lets play something
		/*if(!musicGenerator.isPlaying()) {
			musicGenerator.newTone({'multi': next});
		} else {
			musicGenerator.setAttributes({freq: T("pulse", {freq: next*10, add: 880, mul: 20}).kr()});
		}*/
		musicGenerator.setNote(next);
		musicGenerator.playNote();
	}

	var play = function() {
		stop(); 
		sequence = new DnaSequence($("#data").val().toUpperCase());

		interval = setInterval(iterate, 500);
	};

	var stop = function() {
		if(typeof interval !== "undefined"){
			clearInterval(interval);

			musicGenerator.stop();

			interval = undefined;
		}
	};

	$("#play").click(function() {play(); return false; });
	$("#stop").click(function() {stop(); return false; })
});
