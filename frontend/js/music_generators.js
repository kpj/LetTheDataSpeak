SimpleWaves = function() {
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