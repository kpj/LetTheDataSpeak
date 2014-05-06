Player.register((function(){
	var MIDINotes = ["A0", "B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7", "D7", "E7", "F7", "G7", "A7", "B7", "C8"]

	var MidiPlayer = function(font) {
		var me = this;
		this._note = undefined;

		var channel = 0; 

		var fontprop = MidiPlayer.SoundFonts[font]; 

		this.setNote = function(note) {
			var note = MIDI.keyToNote[MIDINotes[note % MIDINotes.length]]; 
			console.log(MIDINotes[note % MIDINotes.length]); 

			me._note = note;  
		}

		this.setVolume = function(vol){
			MIDI.setVolume(channel, vol);

			console.log("Set volume to", vol);
		}

		this.playNote = function(length) {
			var length = (typeof length == "number")?length:100; 
			MIDI.noteOn(channel, me._note, length);
			channel = (channel + 1) % 16; 
		};

		this.stop = function() {
			MIDI.noteOff(channel, me._note);
			this._note = undefined;
		}

		this.isPlaying = function() {
			return typeof this._note !== "undefined";
		}


		for(var i=0;i<16;i++){
			MIDI.programChange(i, fontprop.programID);
		}
	}

	/* Sound fonts */
	MidiPlayer.SoundFonts = {
		"marimba": {
			"name": "Marimba", 
			"channel": 4, 
			"programID": 12, 
			"note": function(x){
				return 21 + (x % 75);
			}
		}, 

		"acoustic_grand_piano": {
			"name": "Piano", 
			"channel": 0, 
			"programID": 0, 
			"note": function(x){
				return 21 + Math.floor(87/63 * x);
			}
		}, 
		
		"choir_aahs": {
			"name": "Choir", 
			"channel": 1, 
			"programID": 52, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},

		"xylophone": {
			"name": "Xylophone", 
			"channel": 2, 
			"programID": 13, 
			"note": function(x){
				return 21 + (x % 75);
			}
		}, 

		"acoustic_bass": {
			"name": "Acoustic Bass", 
			"channel": 6, 
			"programID": 32, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},

		"synth_drum": {
			"name": "Synth Drum", 
			"channel": 6, 
			"programID": 118, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},

		"fx_6_goblins": {
			"name": "Goblins", 
			"channel": 6, 
			"programID": 101, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},
	}; 

	//Meta information
	MidiPlayer.desc = "MIDI Player C Major"; //name of the player
	MidiPlayer.uname = "midi-cmajor"; //name of the player

	MidiPlayer.font_options = {}; //font options

	for(var key in MidiPlayer.SoundFonts){
		if(MidiPlayer.SoundFonts.hasOwnProperty(key)){
			MidiPlayer.font_options[key] = MidiPlayer.SoundFonts[key].name; 
		}
	}

	return MidiPlayer;
})()); 