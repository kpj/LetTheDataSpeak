$(function(){

	var interval = undefined; 
	var sequence = undefined; 


	var iterate = function(){
		//get something here

		var next = sequence.nextInteger(true);
		
		//lets play something
		T("sin", {freq: T("pulse", {freq: next*10, add: 880, mul: 20}).kr()})
		.on("ended", function() {
			this.pause();
		}).bang().play();
	}

	var play = function(){
		stop(); 
		sequence = new DnaSequence($("#data").val()); 
		interval = setInterval(iterate, 800); 
	};

	var stop = function(){
		if(typeof interval !== "undefined"){
			clearInterval(interval); 
			interval = undefined; 
		}
	};

	$("#play").click(function(){play(); return false; });
	$("#stop").click(function(){stop(); return false; })
});