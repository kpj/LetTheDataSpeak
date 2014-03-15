$(function(){

	//code in the master
	var addTrack = function(){
		$("#content").append(
			'<iframe class="row" src="./components/player.html">Please enable iframes. </iframe>', 
			'<hr />'
		).css("margin-top", - $("#content").height() / 2); 
	}

	addTrack(); 
	addTrack(); 

	$("#playall").click(function(){
		var frames = $("iframe").each(function(){
			$(this.contentWindow.document).find(".play").each(function(){
				if(!$(this).attr("disabled")){
					$(this).click(); 
				}
			});
		}); 
	}); 

	$("#stopall").click(function(){
		var frames = $("iframe").each(function(){
			$(this.contentWindow.document).find(".stop").each(function(){
				if(!$(this).attr("disabled")){
					$(this).click(); 
				}
			});
		}); 
	}); 
})