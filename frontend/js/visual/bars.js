var bars = function($div, count){
	var state = new Array(count); 
	
	//init state
	for(var i=0;i<state.length;i++){
		state[i] = 0; 
	}

	var strokes = 0; 


	var newWidth = function(){
		return Math.floor(Math.min(oWidth, $div.width() / count)); 
	}

	for(var i=0;i<state.length;i++){
		var newDiv = $("<div class='stroke'>").appendTo($div); 
		var step = Math.round((i/count)*255); 

		newDiv.css({
			"left": i*newDiv.width(), 
			"background-color": "rgb(0, "+step.toString()+", "+(255-step).toString()+")"
		}); 

		oWidth = newDiv.width(); 

		newDiv.width(0); 
	}

	this.drawTick = function(){
		//draw the current state
		var strokes = $div.find(".stroke"); 
		var nw = newWidth(); 

		console.log("width", nw); 

		//set the height
		for(var i=0;i<state.length;i++){
			strokes.eq(i).height(2*state[i]).width(nw).css("left", i*nw); 
		}
	}

	var drop_per_tick = 2; 
	var tick_length = 50; 

	this.stateTick = function(){
		//tick the bars
		for(var i=0;i<state.length;i++){
			if(state[i] > drop_per_tick){
				state[i] -= drop_per_tick; 
			} else {
				state[i] = 0; 
			}
		}
	}

	var me = this; 

	var doTick = function(){
		if(stopped){
			started = false; 
			stopped = false; 
		} else {
			me.stateTick(); 
			me.drawTick(); 
			window.setTimeout(doTick, tick_length); 
		}
	}

	this.hit = function(i){
		state[i] = 100; 
	}

	var started = false; 
	var stopped = false; 

	this.start = function(){
		if(!started){
			started = true; 
			doTick(); 
		}
	}

	this.stop = function(){
		stopped = true; 
	}
}