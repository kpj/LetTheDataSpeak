Player.register((function(){
	var MidiPlayer = function(font, callback) {
		var me = this;
		this._note = undefined;

		var fontprop = MidiPlayer.SoundFonts[font]; 

		MIDI.loadPlugin({
			soundfontUrl: "./../lib/midi/soundfont/",
			instruments: [font],
			callback: function() {
				MIDI.setVolume(0, 127);
				MIDI.programChange(fontprop.channel, fontprop.programID);

				callback(); 
			}
		});

		this.setNote = function(note) {
			me._note = fontprop.note(note); 
		}

		this.playNote = function(length) {
			var length = (typeof length == "number")?length:100; 
			MIDI.noteOn(fontprop.channel, me._note, length);
		};

		this.stop = function() {
			MIDI.noteOff(fontprop.channel, me._note);
			this._note = undefined;
		}

		this.isPlaying = function() {
			return typeof this._note !== "undefined";
		}
	}

	/* Sound fonts */
	MidiPlayer.SoundFonts = {
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

		"violin": {
			"name": "Violin", 
			"channel": 3, 
			"programID": 40, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},

		"marimba": {
			"name": "Marimba", 
			"channel": 4, 
			"programID": 12, 
			"note": function(x){
				return 21 + (x % 75);
			}
		},

		"trumpet": {
			"name": "Trumpet", 
			"channel": 5, 
			"programID": 56, 
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
	MidiPlayer.desc = "MIDI Player"; //name of the player
	MidiPlayer.uname = "midi"; //name of the player

	MidiPlayer.font_options = {}; //font options
	for(var key in MidiPlayer.SoundFonts){
		if(MidiPlayer.SoundFonts.hasOwnProperty(key)){
			MidiPlayer.font_options[key] = MidiPlayer.SoundFonts[key].name; 
		}
	}

	return MidiPlayer;
})()); 