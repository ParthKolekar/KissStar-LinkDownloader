var URL = window.location.origin;
var episodeLinks = $('table.listing a').map(function(i,el) { return $(el).attr('href'); });
$.ajaxSetup({async:false});
$.getScript("http://kissanime.com/Scripts/asp.js");
var long_url; 
var videoQuality = prompt("Enter video quality you want to download. Example - '960x720.mp4' (without the quotes)"); 
var i; 
var long_test = "";
for (i = episodeLinks.length - 1 ; i >= 0; i--) {
	jQuery.ajax({
         url:    URL + episodeLinks[i], 
         success: function(result) {
                    var $result = eval($(result));
					var stringStart = result.search("var wra"); 
					var stringEnd = result.search("document.write"); 
					var javascriptToExecute = result.substring(stringStart, stringEnd);
					eval(javascriptToExecute);
					
					$("body").append('<div id="episode' + i + '" style="display: none;"></div>')
					$('#episode' + i).append(wra); 
					
					var downloadQualityOptions = $('#episode' + i + ' a').map(function(i,el) { return $(el); });
					var j; 
					for(j = 0; j < downloadQualityOptions.length; j++) {
						if(videoQuality === downloadQualityOptions[j].html()) {
							long_url = downloadQualityOptions[j].attr('href');
							long_test += "curl -C- -L -o " + i + ".mp4 " + long_url + "&&";
						}
					}
                  },
         async:   false, 
		 script:  true
    });       
}

console.log(long_test);
