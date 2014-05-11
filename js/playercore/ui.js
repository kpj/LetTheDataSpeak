/*
	player.html UI

	all required functions for the UI
*/

var UI = {}; 

UI.init = function(){
	//initialise

	//check if we are left or right
	if(window.location.hash == "#right"){
		$("body").addClass("right"); 
	} else {
		$("body").addClass("left"); 
	}

	UI._lockAll();  //lock stuff

	//update all the lists
	UI._updateParserList(); 
	UI._lockAll();  //lock stuff

	UI._updatePlayerList(); 
	UI._lockAll();  //lock stuff

	UI._updateDataSetsList(); 
	UI._lockAll();  //lock stuff

	

	//bind all the events
	UI._elements.play.click(function(){
		UI.play(); 
		return false; 
	}); 

	UI._elements.stop.click(function(){
		UI.stop(); 
		return false; 
	}); 

	UI._elements.playerSelect.change(function(){
		UI._playerUpdated(); 
		return false; 
	}); 

	UI._elements.parserSelect.change(function(){
		UI._parserUpdated(); 
		return false; 
	}); 

	UI._elements.instrumentSelect.change(function(){
		UI._instrumentUpdated(); 
		return false; 
	}); 

	UI._elements.load.click(function(){
		UI._dataSetUpdated();  
		return false; 
	})

	//load all the insturments

	UI._loadInstruments(function(){
		UI._stopState();

		//tell the parent that we have loaded
		window.parent.postMessage('loaded', '*')
	}); 
}; 

UI.play = function(){
	//called when hitting the start button

	UI._lockAll();

	var noSpaces = UI._elements.data.val().replace(/\s+/g, '');

	UI._ticker = new Ticker(noSpaces, $("div.visualiser"), UI._config); 

	UI._startState(); //once we have started
	UI._ticker.start();  	
}; 

UI.stop = function(){
	//called when hitting the stop button

	UI._lockAll(); 
	UI._ticker.stop(); 
	UI._stopState(); 
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

UI._dataSetUpdated = function(){
	//data set updated
	UI._elements.data.val(UI._elements.dataSetSelect.val());
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

UI._updateDataSetsList = function(){
	//called to update the dataset list

	var Presets = {
		"Normal Hemoglobin": "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACT", 
		"Sickle Cell Hemoglobin": "ATGGTGCACCTGACTCCTGTGGAGAAGTCTGCCGTTACT",
		"Fuer Elise": "TAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGTCGCGACTGATGGGGTGTAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGCTGCGACTGATGGGGCATAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGTCGCGACTGATGGGGTGTAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGCTGCGGCAACTGCAGGGGCGGCTGCCTAAGAAGGATAAGTCTAGTAAGCCACGGGTGCCGTTTAAGCCGCTACTGATGCTGTGGCCGCTGCGATCGCGGTGTAAGTGTAATGCGCCTAAGCCTAAGCCTAAGCCTAAGCCTAAGCCTAAGCGGCCGCTGCAACTGCAGGGGGCGTGGCAGCGATCGCGGGTGTGGTCGCGGCTACTGCTGGGGTGTAAGCCTAAGCCTAAGCGGCCGCTGCAACTGCAGGGGGCGTGGCAGCGATCGCGGGTGTGGCTGCGGCAACTGATGGGGCGGCTGCCGAAGGAGGCGTCTAGTAAACGGGTGTAGTTTAAGCCACTGATGGGGTGGCCGCTATCGGTGTGTAAGTGTAATGCGCCTAAGCCTAAGCCTAAGCCTAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGTCGCGACTGATGGGGTGTAAGCCTAAGCCTAAGCGGCCGCTACTGATGGGGGCGTGGCAATCGGAGGTGTGGCTGCGGGGGTGGGCGCA",
		"Treacher Collins Syndrome (healthy)": "GGAGGACTCAGAGAGCAGCAGCGAGGAGTCATCTGACAGTGAG",
		"Treacher Collins Syndrome (ill)": "GGAGGACTCAGAGCAGCAGCGAGGAGTCATCTGACAGTGAG"
	}; 

	UI._elements.dataSetSelect.empty(); 

	for(var key in Presets){
		UI._elements.dataSetSelect.append($("<option>").val(Presets[key]).text(key))
	}
}

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
	UI._elements.data.attr("disabled", "disabled"); 
	UI._elements.parserSelect.attr("disabled", "disabled");  
	UI._elements.playerSelect.attr("disabled", "disabled"); 
	UI._elements.instrumentSelect.attr("disabled", "disabled"); 
	UI._elements.dataSetSelect.attr("disabled", "disabled"); 
	UI._elements.load.attr("disabled", "disabled"); 
}; 

UI._unLockAll = function(){
	//locks the UI in the stopped state

	UI._elements.play.removeAttr("disabled");
	UI._elements.stop.removeAttr("disabled");
	UI._elements.data.removeAttr("disabled", "disabled"); 
	UI._elements.parserSelect.removeAttr("disabled"); 
	UI._elements.playerSelect.removeAttr("disabled"); 
	UI._elements.instrumentSelect.removeAttr("disabled"); 

	UI._elements.dataSetSelect.removeAttr("disabled"); 
	UI._elements.load.removeAttr("disabled"); 

	if(UI._elements.instrumentSelect.val() == ""){
		UI._elements.instrumentSelect.attr("disabled", "disabled"); 
	}
}; 

UI._stopState = function(){
	//enables the stopped state in the UI

	UI._unLockAll(); 
	UI._elements.stop.attr("disabled", "disabled"); 
}

UI._startState = function(){
	//enables the started state in the UI

	UI._lockAll(); 
	UI._elements.stop.removeAttr("disabled"); 
}

UI._loadInstruments = function(cb){
	//load all the instruments

	var instruments = ["marimba", "acoustic_grand_piano", "violin", "choir_aahs", "xylophone", "acoustic_bass", "synth_drum", "fx_6_goblins"]; 

	MIDI.loadPlugin({
		soundfontUrl: "./../lib/midi/soundfont/",
		instruments: instruments,
		callback: cb
	});
}

//contains all the UI elements
UI._elements = {
	"data": $("textarea.data"), 
	"play": $(".play"), 
	"stop": $(".stop"), 
	"load": $(".load"), 
	"parserSelect": $(".selectable.parser"), 
	"playerSelect": $(".selectable.player"), 
	"instrumentSelect": $(".selectable.instrument"), 
	"dataSetSelect": $(".selectable.presets")
}; 

//contains all the configuration settings
UI._config = {
	"player": undefined, 
	"parser": undefined, 
	"instrument": undefined, 
	"content": undefined, 
	"tickLength": 100, 
	"baseVolume": 127
}; 
