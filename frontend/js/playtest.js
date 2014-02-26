$(function(){

	var interval = undefined;
	var sequence = undefined;

	var wave = undefined;

	var frequencyPlot = undefined;
	var plotInterval = undefined;


	var iterate = function() {
		//get something here

		var next = sequence.nextInteger(true);
		
		//lets play something
		if(typeof wave == "undefined") {
			wave = T("sin", {freq: T("pulse", {freq: next*10, add: 880, mul: 20}).kr()})
			.on("ended", function() {
				this.pause();
			}).bang().play();

			frequencyPlot = T("fft").listen(wave);
		} else {
			wave.set({freq: T("pulse", {freq: next*10, add: 880, mul: 20}).kr()});
		}
	}

	var play = function() {
		stop(); 
		sequence = new DnaSequence($("#data").val());

		interval = setInterval(iterate, 500);
		plotInterval = setInterval(function() {
			if(typeof frequencyPlot !== "undefined") {
				frequencyPlot.plot({target: $("#canvas")[0]});
			}
		}, 50);
	};

	var stop = function() {
		if(typeof interval !== "undefined"){
			clearInterval(interval);
			clearInterval(plotInterval);

			interval = undefined;
			wave = undefined;
			frequencyPlot = undefined;
			plotInterval = undefined;
		}
	};

	$("#play").click(function() {play(); return false; });
	$("#stop").click(function() {stop(); return false; })
});