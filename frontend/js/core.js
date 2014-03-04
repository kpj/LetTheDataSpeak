var PlayerInit = function($masterdiv){

	var musicGenerator = undefined; 
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
		//console.log(next); 
	}

	var play = function() {
		stop(); 
		sequence = new DnaSequence($masterdiv.find(".data").val().toUpperCase());
		interval = setInterval(iterate, 500);
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

	$masterdiv.find("select").change(function(){
		var newFont = $masterdiv.find("select").attr("disabled", "disabled").val();
		$masterdiv.find(".play").attr("disabled", "disabled");  
		musicGenerator = new MidiPlayer(newFont, function(){
			$masterdiv.find(".play").removeAttr("disabled"); 
			$masterdiv.find("select").removeAttr("disabled"); 
		}); 
	}).change(); 
}

$(function(){
	$(".row").each(function(){
		PlayerInit($(this)); 
	}); 
})