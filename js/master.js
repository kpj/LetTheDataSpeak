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

var loaded_num = 0;
window.onmessage = function(e){
	if (e.data == 'loaded') {
		loaded_num++;
	}

	if(loaded_num == 2) {
		// all iframes loaded
		$('#loading_screen').hide();
		$('.container').fadeTo('400', 1);
	}
};