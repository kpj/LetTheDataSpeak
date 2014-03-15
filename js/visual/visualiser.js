var Visualiser = function($div, count) {
	var state = new Array(count); 
	
	//init state
	for(var i = 0 ; i < state.length ; i++) {
		state[i] = 0; 
	}

	var strokes = 0; 

	var newWidth = function() {
		return Math.floor(Math.min(oWidth, $div.width() / (count+1))); 
	}

	$div.empty(); //empty junk from before

	var $vbar = $("<div class='vbar'>").appendTo($div); 
	var $vtext = $("<div>").appendTo($("<div class='vtext'>").appendTo($div)); 

	var startColor = [0, 0, 255]; 
	var endColor = [0, 255, 0]; 

	for(var i = 0 ; i < state.length ; i++) {
		var newDiv = $("<div class='stroke'>").appendTo($div); 
		var step = (i/count); 

		var c0 = Math.floor(startColor[0]+(endColor[0] - startColor[0])*step); 
		var c1 = Math.floor(startColor[1]+(endColor[1] - startColor[1])*step); 
		var c2 = Math.floor(startColor[2]+(endColor[2] - startColor[2])*step); 

		newDiv.css({
			"left": (i+1)*newDiv.width(), 
			"background-color": "rgb("+c0.toString()+", "+c1.toString()+", "+c2.toString()+")"
		}); 

		oWidth = newDiv.width(); 

		newDiv.width(0); 
	}

	var drop_per_tick = 2; 
	var tick_length = 50; 

	this.drawTick = function() {
		//draw the current state
		var strokes = $div.find(".stroke"); 
		var nw = newWidth(); 

		//set the height
		for(var i = 0 ; i < state.length ; i++) {
			strokes.eq(i)
			.height(2*state[i])
			.width(nw)
			.css("left", (i+1)*nw); 
		}
		
	}

	this.stateTick = function() {
		//tick the bars
		for(var i = 0 ; i < state.length ; i++) {
			if(state[i] > drop_per_tick) {
				state[i] -= drop_per_tick; 
			} else {
				state[i] = 0; 
			}
		}
	}

	this.setText = function(last, now, next){
		$vtext.empty().append(
			$("<span class='prev'>").text(last), 
			$("<span class='cur'>").text(now), 
			$("<span class='next'>").text(next)
		).css("margin-top", -$vtext.height() / 2);
	}

	var me = this; 

	var doTick = function() {
		if(stopped) {
			started = false; 
			stopped = false; 
		} else {
			me.stateTick(); 
			me.drawTick(); 
			window.setTimeout(doTick, tick_length); 
		}
	}

	this.hit = function(i, h) {
		if (h < 1000){
			h = 3000; 
		}
		state[i] = Math.round(h/tick_length); 
	}

	var started = false; 
	var stopped = false; 

	this.start = function() {
		if(!started) {
			started = true; 
			doTick(); 
		}
	}

	this.moveLine = function(len){
		var margin = Math.floor(Math.min(oWidth, $div.width() / count)); 
		$vbar.stop().css({"left": margin}); 
		$vbar.animate({"left": $div.width() - margin}, len); 
	}

	this.stop = function() {
		stopped = true; 
	}

	this.clear = function() {
		$div.empty();
	}
}