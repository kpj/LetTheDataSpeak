Player.register((function(){
	var MIDINotes = ["Bb0", "Db1", "Eb1", "Gb1", "Ab1", "Bb1", "Db2", "Eb2", "Gb2", "Ab2", "Bb2", "Db3", "Eb3", "Gb3", "Ab3", "Bb3", "Db4", "Eb4", "Gb4", "Ab4", "Bb4", "Db5", "Eb5", "Gb5", "Ab5", "Bb5", "Db6", "Eb6", "Gb6", "Ab6", "Bb6", "Db7", "Eb7", "Gb7", "Ab7", "Bb7"];

	var MidiPlayer = function(font, callback) {
		var me = this;
		this._note = undefined;

		var channel = 0; 

		var fontprop = MidiPlayer.SoundFonts[font]; 

		MIDI.loadPlugin({
			soundfontUrl: "./../lib/midi/soundfont/",
			instruments: [font],
			callback: function() {
				for(var i=0;i<16;i++){
					MIDI.programChange(i, fontprop.programID);
				}
				callback(); 
			}
		});

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
	MidiPlayer.desc = "MIDI Player pentatonic"; //name of the player
	MidiPlayer.uname = "midi-penta"; //name of the player

	MidiPlayer.font_options = {}; //font options

	for(var key in MidiPlayer.SoundFonts){
		if(MidiPlayer.SoundFonts.hasOwnProperty(key)){
			MidiPlayer.font_options[key] = MidiPlayer.SoundFonts[key].name; 
		}
	}

	return MidiPlayer;
})()); 