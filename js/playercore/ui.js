var UI = {}; 

UI.init = function(){
	//initialise
	UI._lockAll(); 

	//update all the lists
	UI._updateParserList(); 
	UI._updatePlayerList(); 

	//bind all the events
	UI._elements.play.click(function(){
		UI.play(); 
	}); 

	UI._elements.stop.click(function(){
		UI.stop(); 
	}); 

	UI._elements.PlayerConfig.click(function(){
		UI.PlayerConfig(); 
	}); 

	UI._elements.playerSelect.change(function(){
		UI._playerUpdated(); 
	}); 

	UI._elements.parserSelect.change(function(){
		UI._parserUpdated(); 
	}); 

	UI._elements.instrumentSelect.change(function(){
		UI._instrumentUpdated(); 
	}); 

	UI._stopState();

	if(window.location.hash == "#right"){
		$("body").addClass("right"); 
	} else {
		$("body").addClass("left"); 
	}

	Presets.init(); 
}; 

UI.play = function(){
	//called when hitting the start button
	UI._lockAll();

	var noSpaces = UI._elements.data.val().replace(/\s+/g, '');

	UI._ticker = new Ticker(noSpaces, $("div.visualiser"), UI._config, function(){
		UI._startState(); //once we have started
		UI._ticker.start(); 
	}); 	
}; 

UI.stop = function(){
	//called when hitting the stop button
	UI._lockAll(); 
	UI._ticker.stop(); 
	UI._stopState(); 
}; 

UI.PlayerConfig = function(){
	//called when hitting the Parser Config Button
}; 

UI._updateParserList = function(){
	//update the parser list
	UI._lockAll(); 
	UI._elements.parserSelect.empty(); 

	
	for(var key in Parser.Parsers){
		UI._elements.parserSelect.append(
			$("<option>")
			.attr("value", key)
			.text(Parser.Parsers[key].desc)
		); 
	}

	UI._parserUpdated(); 
}; 

UI._parserUpdated = function(){
	//called when the parser is updated
	UI._lockAll(); 
	
	UI._config.parser = UI._elements.parserSelect.val(); 
	//load the default config for the parser

	UI._stopState(); 
}

UI._updatePlayerList = function(){
	//update the player list

	UI._lockAll(); 
	UI._elements.playerSelect.empty(); 

	
	for(var key in Player.Players){
		UI._elements.playerSelect.append(
			$("<option>")
			.attr("value", key)
			.text(Player.Players[key].desc)
		); 
	}

	UI._playerUpdated(); 
}; 

UI._playerUpdated = function(){
	//called when the player is updated
	UI._lockAll(); 
	UI._config.player = UI._elements.playerSelect.val(); 
	UI._updateInstrumentList(); 
	UI._stopState(); 
}; 

UI._updateInstrumentList = function(){
	//updates the instrument list

	UI._lockAll(); 
	UI._elements.instrumentSelect.empty(); 

	var font_options = Player.Players[UI._config.player].font_options;
	var did = false; 

	for(var key in font_options){
		UI._elements.instrumentSelect.append(
			$("<option>")
			.attr("value", key)
			.text(font_options[key])
		); 
		did = true; 
	}

	if(!did){
		UI._elements.instrumentSelect.append(
			$("<option>")
			.attr("value", "")
			.text("N/A")
		);
	}

	UI._instrumentUpdated(); 
}; 

UI._instrumentUpdated = function(){
	//called when the instrument is updated
	UI._lockAll(); 
	UI._config.instrument = UI._elements.instrumentSelect.val(); 
	UI._stopState(); 
}

UI._lockAll = function(){
	//locks the UI in the playing state

	UI._elements.play.attr("disabled", "disabled");  
	UI._elements.stop.attr("disabled", "disabled");
	UI._elements.PlayerConfig.attr("disabled", "disabled"); 
	UI._elements.parserSelect.attr("disabled", "disabled");  
	UI._elements.playerSelect.attr("disabled", "disabled"); 
	UI._elements.instrumentSelect.attr("disabled", "disabled"); 
}; 

UI._unLockAll = function(){
	//locks the UI in the stopped state

	UI._elements.play.removeAttr("disabled"); 
	UI._elements.stop.removeAttr("disabled"); 
	UI._elements.PlayerConfig.removeAttr("disabled"); 
	UI._elements.parserSelect.removeAttr("disabled"); 
	UI._elements.playerSelect.removeAttr("disabled"); 
	UI._elements.instrumentSelect.removeAttr("disabled"); 
	if(UI._elements.instrumentSelect.val() == ""){
		// N/A
		UI._elements.instrumentSelect.attr("disabled", "disabled"); 
	}
}; 

UI._stopState = function(){
	UI._unLockAll(); 
	UI._elements.stop.attr("disabled", "disabled"); 
}

UI._startState = function(){
	UI._lockAll(); 
	UI._elements.stop.removeAttr("disabled"); 
}

UI._elements = {
	"data": $("textarea.data"), 
	"play": $(".play"), 
	"stop": $(".stop"), 
	"PlayerConfig": $(".options.player"), 
	"parserSelect": $(".selectable.parser"), 
	"playerSelect": $(".selectable.player"), 
	"instrumentSelect": $(".selectable.instrument")
}; 

UI._config = {
	"player": undefined, 
	"parser": undefined, 
	"instrument": undefined, 
	"content": undefined, 
	"tickLength": 100, 
	"baseVolume": 127
}; 