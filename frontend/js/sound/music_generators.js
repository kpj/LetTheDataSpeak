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
		"channel": 0, 
		"programID": 0, 
		"note": function(x){
			return 21 + (x % 75);
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
}


var MidiPlayer = function(font, callback) {
	var me = this;
	this._note = undefined;

	// TODO: make this nice and pretty
	var fontprop = MidiSoundfonts[font]; 

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

	this.playNote = function() {
		MIDI.noteOn(fontprop.channel, me._note, 100);
	};

	this.stop = function() {
		this._note = undefined;
	}

	this.isPlaying = function() {
		return typeof this._note !== "undefined";
	}
}