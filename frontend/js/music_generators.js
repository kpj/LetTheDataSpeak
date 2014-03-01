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

var MidiPlayer = function() {
	var me = this;
	this._note = undefined;

	// TODO: make this nice and pretty
	var instruments = {
		"acoustic_grand_piano": 0,
		"acoustic_guitar_nylon": 24,
		"electric_bass_finger": 33
	};
	MIDI.loadPlugin({
	soundfontUrl: "./lib/midi/soundfont/",
	instruments: Object.keys(instruments),
	callback: function() {
			console.log("Loaded MIDI"); 

			MIDI.setVolume(0, 127);
			MIDI.programChange(0, 0);

			// enable play button
			$('#play').removeAttr('disabled');
		}
	});

	this.setNote = function(note) {
		me._note = 21 + (note % 75);
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