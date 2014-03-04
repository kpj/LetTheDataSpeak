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

	var startColor = [0, 0, 255]; 
	var endColor = [0, 255, 0]; 

	for(var i=0;i<state.length;i++){
		var newDiv = $("<div class='stroke'>").appendTo($div); 
		var step = (i/count); 

		var c0 = Math.floor(startColor[0]+(endColor[0] - startColor[0])*step); 
		var c1 = Math.floor(startColor[1]+(endColor[1] - startColor[1])*step); 
		var c2 = Math.floor(startColor[2]+(endColor[2] - startColor[2])*step); 

		newDiv.css({
			"left": i*newDiv.width(), 
			"background-color": "rgb("+c0.toString()+", "+c1.toString()+", "+c2.toString()+")"
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