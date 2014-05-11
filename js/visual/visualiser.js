/*
	player.html Visualiser

	Handles visualisation of played notes. 
*/

var Visualiser = function($div, count) {

	//for callbacks
	var me = this; 

	/* Configuation */

	var drop_per_tick = 2; //pixels to drop per tick
	var tick_length = 50; //length of a tick

	var startColor = [0, 0, 255]; //first color 
	var endColor = [0, 255, 0]; //last color

	//this will store the original width of the divs
	var oWidth = 0; 

	//we have not started and not stoped yet. 
	var started = false; 
	var stopped = false; 


	//store the state of the visualisations
	var state = new Array(count); 
	
	//init state
	for(var i = 0 ; i < state.length ; i++) {
		state[i] = 0; 
	}

	//clear everything that is here from before just to make sure
	$div.empty();

	//set all the colors
	for(var i = 0 ; i < state.length ; i++) {

		//add a new div
		var newDiv = $("<div class='stroke'>").appendTo($div); 

		

		//compute color
		var step = (i/count); 
		var c0 = Math.floor(startColor[0]+(endColor[0] - startColor[0])*step); 
		var c1 = Math.floor(startColor[1]+(endColor[1] - startColor[1])*step); 
		var c2 = Math.floor(startColor[2]+(endColor[2] - startColor[2])*step); 

		//set the color
		newDiv.css({
			"left": (i+1)*newDiv.width(), 
			"background-color": "rgb("+c0.toString()+", "+c1.toString()+", "+c2.toString()+")"
		}); 

		//store the original width
		oWidth = newDiv.width(); 

		//set it to 0
		newDiv.width(0); 
	}

	this.drawTick = function() {
		//draw the current state

		//find all the strokes
		var strokes = $div.find(".stroke"); 

		//compute the new width of the bars
		var nw = Math.floor(Math.min(oWidth, $div.width() / (count+1))); 

		//set all the heights correctly
		for(var i = 0 ; i < state.length ; i++) {
			strokes.eq(i)
			.height(2*state[i])
			.width(nw)
			.css("left", (i+1)*nw); 
		}
		
	}

	this.stateTick = function() {
		//compute a tick and drop all of the strokes

		for(var i = 0 ; i < state.length ; i++) {
			if(state[i] > drop_per_tick) {
				state[i] -= drop_per_tick; 
			} else {
				state[i] = 0; 
			}
		}
	}

	var doTick = function() {
		//perform and entire tick

		if(stopped) {
			//we are stopped, do nothing
			started = false; 
			stopped = false; 
		} else {
			//first update the strokes and then draw them
			me.stateTick(); 
			me.drawTick(); 

			//call this function again
			window.setTimeout(doTick, tick_length); 
		}
	}

	this.hit = function(i, h) {
		//hits a stroke

		if (h < 1500){
			h = 1500; 
		}

		//update stroke state
		state[i] = Math.round(h*drop_per_tick/tick_length); 
	}

	this.start = function() {
		//start ticking if we haven't started already

		if(!started) {
			started = true; 
			doTick(); 
		}
	}

	this.stop = function() {
		//stop ticking after the next timeout
		stopped = true; 
	}

	this.clear = function() {
		//empty the existing div

		$div.empty();
	}
}