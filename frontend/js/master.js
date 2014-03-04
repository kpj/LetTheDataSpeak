$(function(){

	var addTrack = function(){
		$("#content").append(
			'<iframe class="row" src="./components/player.html">Please enable iframes. </iframe>', 
			'<hr />'
		).css("margin-top", - $("#content").height() / 2); 
	}

	addTrack(); 
	addTrack(); 
})