$(function(){
	$("#playall").click(function(){
		var frames = $("iframe").each(function(){
			$(this.contentWindow.document).find(".play").each(function(){
				if(!$(this).attr("disabled")){
					$(this).click(); 
				}
			});
		}); 
		return false; 
	}); 

	$("#stopall").click(function(){
		var frames = $("iframe").each(function(){
			$(this.contentWindow.document).find(".stop").each(function(){
				if(!$(this).attr("disabled")){
					$(this).click(); 
				}
			});
		}); 
		return false; 
	}); 
})