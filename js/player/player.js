/*
	player.html Player Logic

	General player logic
*/

var Player = function(uname, font, callback){
	//Initialise the right player when called
	return new Player.Players[uname](font, callback); 
}

//Our Object of players
Player.Players = {}; 


Player.register = function(newPlayer){
	//register a new player
	Player.Players[newPlayer.uname] = newPlayer; 
}