/*
	Master JS Script
*/

$(function(){
	//playall button
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

	//stopall button
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
}); 

(function(){
	//count how many frames have loaded
	var loaded_num = 0;

	window.onmessage = function(e){
		if (e.data == 'loaded') {
			loaded_num++;
		}

		//if all iframes have loaded, hide everything
		if(loaded_num == 2) {
			$('#loading_screen').hide();
			$('.container').fadeTo('400', 1);
		}
	};
})(); 