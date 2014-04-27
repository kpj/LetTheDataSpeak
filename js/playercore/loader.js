$(function(){
	//playLoader
	//loads and initalises the player
	//essentially loads a lot of external JS Files. 

	loadExternalJS([
		/* the midi libs */
		"../lib/midi/MIDI/AudioDetect.js", 
		"../lib/midi/MIDI/LoadPlugin.js", 
		"../lib/midi/MIDI/Plugin.js", 
		"../lib/midi/MIDI/Player.js", 
		"../lib/midi/inc/Base64.js", 
		"../lib/midi/inc/base64binary.js", 
		"../lib/midi/Window/DOMLoader.XMLHttp.js", 
		"../lib/midi/Window/DOMLoader.script.js", 

		/* the parser + parsers */
		"../js/parser/parser.js", 
		"../js/parser/00-triplets.js", 
		"../js/parser/05-amino_acids.js", 
		"../js/parser/06-amino_acids_rhythm_chords.js", 
		"../js/parser/10-codon_frequency.js", 
		"../js/parser/11-codon_frequency.js",
		"../js/parser/99-dummy.js", 

		/* the player + players */
		"../js/player/player.js", 
		"../js/player/MIDIPlayer2.js", 
		"../js/player/MIDIPlayer.js", 
		"../js/player/MIDIPlayer2.js", 
		"../js/player/SimpleWaves.js", 

		/* the visualiser */
		"../js/visual/visualiser.js", 

		/* the core */
		"../js/playercore/ui.js", 
		"../js/playercore/ticker.js", 

	], function(){
		//we have finished loading, lets start the UI
		UI.init(); 
	}); 
})