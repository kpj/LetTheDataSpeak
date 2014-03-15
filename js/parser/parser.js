/* a Preparser */
var Parser = function(ModeArray){
	var PlayArray =  []; 
	var TextArray = []; 

	/* Create the PlayArray and TextArray array */
	ModeArray.map(function(elem){
		if(elem.type == "note"){
			PlayArray.push(elem); 
		} else if(elem.type == "display") {
			TextArray.push(elem); 
		}
	}); 

	/* sotr play and text array */
	PlayArray.sort(function(a, b){return a.at -  b.at; }); 
	TextArray.sort(function(a, b){return a.at - b.at; }); 

	var elem; 
	//two texts starting at the same time
	for(var i=0;i<TextArray.length;i++){
		elem = TextArray[i]; 
		if(i+1 < TextArray.length){
			if(TextArray[i+1].at == elem.at){
				console.warn("Warning: More than one text found starting at the same time "+elem.at+", joining text and using maximum length. ");

				//join the array members
				TextArray[i].length = Math.max(TextArray[i].length, TextArray[i+1].length); 
				TextArray[i].text += TextArray[i+1].text; 
				TextArray.splice(i+1, 1);
			}
		}
	}

	//two texts overlapping
	for(var i=0;i<TextArray.length;i++){
		elem = TextArray[i]; 
		if(i+1 < TextArray.length){
			if(elem.at + elem.length > TextArray[i+1].at){
				console.warn("Warning: Overlapping texts found with text staring at "+elem.at+", joining text and recalulating length. ");
				console.warn("Ending at: ", elem.at + elem.length, "Next Starting at: ", TextArray[i+1].at); 
				//join the array members
				TextArray[i].length = TextArray[i+1].at + TextArray[i+1].length - elem.at; 
				TextArray[i].text += TextArray[i+1].text; 
				TextArray.splice(i+1, 1);
			}
		}
	}

	/* make Texts have next and prev parameters */
	TextArray = TextArray.map(function(elem, i, arr){

		var nextIndex = (i+1) % arr.length; 
		var prevIndex = (i + (arr.length - 1)) % arr.length; 

		elem["nextText"] = arr[nextIndex].text; 
		elem["prevText"] = arr[prevIndex].text; 

		return elem; 
	}); 

	/* compute lengths */
	var playLength = Math.max.apply(Math, PlayArray.map(function(elem){return elem.at + elem.length; })); 
	var textLength = Math.max.apply(Math, TextArray.map(function(elem){return elem.at + elem.length; })); 

	if(playLength != textLength){
		console.warn("Warning: textLength and playLength mismatch, using maximum length for cycle length. "); 
		length = Math.max(playLength, textLength); 
	}
	var cycleLength = playLength; 
	
	return {
		"text": TextArray, 
		"play": PlayArray, 
		"length": cycleLength
	}
}

Parser.Parsers = {}; 

Parser.register = function(newParser){
	Parser.Parsers[newParser.uname] = newParser; 
}