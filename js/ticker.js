var Ticker = function(preparsedObject, soundFont, tickLength){
	var me = this; 
	var preparsedObject = preparsedObject; 


	var Timeouts = []; 

	var isRunning = false; 
	var isStopped = false; 


	this.cycle = function(){
		if(!isStopped){
			//set all the timeouts

			preparsedObject.text.map(function(e){
				Timeouts.push(
					window.setTimeout(function(){
						me.drawText(e); 
					}, e.at*tickLength)
				); 
			}); 

			preparsedObject.play.map(function(e){
				Timeouts.push(
					window.setTimeout(function(){
						me.playSound(e); 
					}, e.at*tickLength) 
				); 
			}); 

			Timeouts.push(function(){
				//the next cycle
				me.cycle(); 
			}, preparsedObject.length*tickLength); 
		}
	}

	this.start = function(){
		if(isRunning){
			return false; 
		}

		isStopped = false; 

		me.cycle(); 

		return true; 
	}; 

	this.drawText = function(textObj){
		console.log("textdraw"); 
	}

	this.playSound = function(){
		console.log("playSound"); 
	}

	this.stop = function(){
		Timeouts.map(function(e){
			window.clearTimeout(e); 
		}); 

		isStopped = true; 
	}
}