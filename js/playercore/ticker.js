var Ticker = function(input, div, config, callback){
	var me = this;

	var preparsedObject = Parser(
		Parser.Parsers[config.parser](input, config.parserConfig)
	); 

	var div = $(div); 

	var TheSound = undefined; 
	var TheVisual = undefined; 

	var tickLength = config.tickLength; 

	//Timeing and stuff
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

			Timeouts.push(window.setTimeout(function(){
				//the next cycle
				me.cycle(); 
			}, preparsedObject.length*tickLength)); 

			TheVisual.moveLine(preparsedObject.length*tickLength); 
		}
	}

	this.start = function(callback){
		if(isRunning){
			return false; 
		}

		/* we start everything */
		isStopped = false; 
		isRunning = true; 

		TheVisual.start(); 
		me.cycle(); 

		return true; 
	}; 

	this.drawText = function(textObj){
		//draw some text
		//todo: actually implement this. 
		TheVisual.setText(textObj.prevText, textObj.text, textObj.nextText); 
	}

	/* SOUND */

	this.playSound = function(obj){
		//play some sound

		var len = config.tickLength*obj.length; 

		TheSound.setNote(obj.note); 
		TheSound.playNote(len); 

		TheVisual.hit(obj.note, len); 
	}

	this.stop = function(){
		Timeouts.map(function(e){
			window.clearTimeout(e); 
		}); 

		//stop sound and play visual
		TheSound.stop(); 
		TheVisual.stop(); 
		TheVisual.clear(); 

		isStopped = true; 
	}

	//intialise and call the calllback

	TheSound = Player(config.player, config.instrument, function(){
		callback(me); 
	}); 

	TheVisual = new Visualiser(div, 64); 
	//TODO: have the red bar thingy
}