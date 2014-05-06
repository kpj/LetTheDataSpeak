var Presets = {}; 

Presets.data = {
	"Normal Hemoglobin": "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACT", 
	"Sickle Cell Hemoglobin": "ATGGTGCACCTGACTCCTGTGGAGAAGTCTGCCGTTACT"
}; 

Presets.init = function(){
	$(".presets")
	.empty()

	for(var key in Presets.data){
		$(".presets").append($("<option>").val(Presets.data[key]).text(key))
	}

	$(".load").click(function(){
		$(".data").val($(".presets").val()); 
	})
}