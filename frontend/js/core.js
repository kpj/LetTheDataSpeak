var PlayerInit = function($masterdiv){

	var musicGenerator = new MidiPlayer();
	var BarPlayer = new bars($masterdiv.find(".right"), 64); 

	var interval = undefined;
	var sequence = undefined;


	var iterate = function() {
		var next = sequence.nextInteger(true);
		
		//play the music
		musicGenerator.setNote(next);
		musicGenerator.playNote();

		//paly the bars
		BarPlayer.start(); 
		BarPlayer.hit(next); 
		
		//log output to console
		console.log(next); 
	}

	var play = function() {
		stop(); 
		sequence = new DnaSequence($masterdiv.find(".data").val().toUpperCase());
		interval = setInterval(iterate, 500);
		BarPlayer.start(); 
	};

	var stop = function() {
		if(typeof interval !== "undefined"){
			clearInterval(interval);

			musicGenerator.stop();

			setTimeout(function(){BarPlayer.stop(); }, 50*50+1000); 
			interval = undefined;
		}
	};

	$masterdiv.find(".play").click(function() {play(); return false; });
	$masterdiv.find(".stop").click(function() {stop(); return false; }); 

	var callback = function(){
		$masterdiv.find(".play").removeAttr("disabled").length; 
	}

	if($("body").attr("MIDIReady") == true){
		callback(); 
	} else {
		$("body").on("MIDIReady", callback); 
	}
}

$(function(){
	$(".row").each(function(){
		PlayerInit($(this)); 
	}); 
})