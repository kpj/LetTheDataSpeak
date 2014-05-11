/*
	player.html Ticker

	Combines player and visualiser components
*/

var Ticker = function(input, div, config){

	//for callbacks
	var me = this;

	//load some config stuffs
	var div = $(div); 
	var tickLength = config.tickLength; 

	//Visualiser and Sound player
	var TheSound = undefined; 
	var TheVisual = undefined; 

	//preparse the input with the selected parser
	var preparsedObject = Parser(
		Parser.Parsers[config.parser](input)
	); 

	//timeouts and state
	var Timeouts = []; 
	var isRunning = false; 

	this.cycle = function(){
		//run one cycle
		if(isRunning){

			//set all timeouts for this cycle
			preparsedObject.play.map(function(e){
				Timeouts.push(
					window.setTimeout(function(){
						me.playSound(e); 
					}, e.at*tickLength) 
				); 
			}); 

			//the next cycle
			Timeouts.push(window.setTimeout(function(){
				
				me.cycle(); 
			}, preparsedObject.length*tickLength)); 
		}
	}

	this.start = function(callback){
		//called to start everything

		if(isRunning){
			//we are already running
			return false; 
		}

		//set the state correctly
		isRunning = true; 

		//start Visual and begin cycling
		TheVisual.start(); 
		me.cycle(); 

		return true; 
	}; 

	this.playSound = function(obj){
		//called to notify everything that a certain sound is played. 

		//how long?
		var len = config.tickLength*obj.length; 

		//hit it visually
		TheVisual.hit(obj.note, len); 

		//play it with the sound
		TheSound.setNote(obj.note); 
		TheSound.setVolume(config.baseVolume+obj.volume); 
		TheSound.playNote(len); 
	}


	this.stop = function(){
		//called to stop everything

		Timeouts.map(function(e){
			window.clearTimeout(e); 
		}); 

		//stop sound and visual
		TheSound.stop(); 
		TheVisual.stop(); 
		TheVisual.clear(); 

		isRunning = false; 
	}

	//init sound and visual
	TheSound = Player(config.player, config.instrument); 
	TheVisual = new Visualiser(div, 64); 
}