var Player = function(uname, font, callback){
	return new Player.Players[uname](font, callback); 
}

Player.Players = {}; 

Player.register = function(newPlayer){
	Player.Players[newPlayer.uname] = newPlayer; 
}