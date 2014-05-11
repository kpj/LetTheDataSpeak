/*
	player.html loader

	loads all required js files and then initalises the UI. 
*/

$(function(){


	loadExternalJS([
		/* MIDIJS */
		"../lib/midi/MIDI/AudioDetect.js", 
		"../lib/midi/MIDI/LoadPlugin.js", 
		"../lib/midi/MIDI/Plugin.js", 
		"../lib/midi/MIDI/Player.js", 
		"../lib/midi/inc/Base64.js", 
		"../lib/midi/inc/base64binary.js", 
		"../lib/midi/Window/DOMLoader.XMLHttp.js", 
		"../lib/midi/Window/DOMLoader.script.js", 

		/* Parser main and all enabled parsers */
		"../js/parser/parser.js", 

		"../js/parser/00-triplets.js", 
		"../js/parser/01-amino_acids.js", 
		"../js/parser/02-amino_acids_rhythm_chords.js", 
		"../js/parser/03-dummy.js", 

		/* Player main and all enabled players */
		"../js/player/player.js", 
		"../js/player/MIDIPlayer2.js", 
		"../js/player/MIDIPlayer.js", 
		"../js/player/MIDIPlayer2.js",  

		/* Visualiser */
		"../js/visual/visualiser.js", 

		/* UI */
		"../js/playercore/ui.js", 

		/* Ticker core */
		"../js/playercore/ticker.js", 

	], function(){
		//Lets initialise the UI. 
		UI.init(); 
	}); 
})