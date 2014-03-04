var SimpleWaves = function() {
	var me = this;
	this._wave = undefined;

	this.newTone = function(attrs) {
		me._wave = T("sin", {freq: attrs["multi"] * 10})
		.on("ended", function() {
			this.pause();
		}).bang().play();
	}

	this.setAttributes = function(attr) {
		me._wave.set(attr);
	};

	this.stop = function() {
		me._wave.pause();
		me._wave = undefined;
	}

	this.isPlaying = function() {
		return typeof this._wave !== "undefined";
	}
}

/* insert fonts here */
var MidiSoundfonts = {
	"acoustic_grand_piano": {
		"name": "Piano", 
		"programChange": [0, 0], 
		"setVolume": [0, 127], 
		"note": function(x){
			return 21 + (x % 75);
		}
	}
}


var MidiPlayer = function(font, callback) {
	var me = this;
	this._note = undefined;

	// TODO: make this nice and pretty
	var instruments = {}; 
	instruments[font] = 0; 

	var fontprop = MidiSoundfonts[font]

	MIDI.loadPlugin({
		soundfontUrl: "./../lib/midi/soundfont/",
		instruments: Object.keys(instruments),
		callback: function() {
			console.log("Loaded MIDI"); 

			MIDI.setVolume(fontprop.setVolume[0], fontprop.setVolume[1]);
			MIDI.programChange(fontprop.programChange[0], fontprop.programChange[1]);

			callback(); 
		}
	});

	this.setNote = function(note) {
		me._note = fontprop.note(note); 
	}

	this.playNote = function() {
		MIDI.noteOn(0, me._note, 100);
	};

	this.stop = function() {
		this._note = undefined;
	}

	this.isPlaying = function() {
		return typeof this._note !== "undefined";
	}
}