/*
	player.html Parser Logic

	General player logic
*/

var Parser = function(PlayArray){

	//sort the play array
	PlayArray.sort(function(a, b){return a.at -  b.at; }); 

	
	// teh length is one-based but indexes are zero based, so add 1
	var cycleLength = Math.max.apply(Math, PlayArray.map(function(elem){return elem.at + elem.length; }))+1; 

	PlayArray.filter(function(e){
		//negative notes are just pauses, they count but thats it. 
		return (e.note >= 0); 
	}); 

	return {
		"play": PlayArray, 
		"length": cycleLength+20
	}
}

//Our Object of parsers
Parser.Parsers = {}; 

Parser.register = function(newParser){
	//register a new parser

	Parser.Parsers[newParser.uname] = newParser; 
}