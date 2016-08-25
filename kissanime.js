var origin = window.location.origin;
var episodeLinks = $('table.listing a').map(
        function(i,el) { 
            return { 
                'link': $(el).attr('href'),
                'name': $(el).text().replace('\n', '').trim()
            }
        });
$.ajaxSetup({async:false});
$.getScript(origin+"/Scripts/asp.js");
var long_url; 
var i; 
var long_test = "";
for (i = episodeLinks.length - 1 ; i >= 0; i--) {
    jQuery.ajax({
         url:    origin + episodeLinks[i]['link'], 
         success: function(result) {
                    var $result = eval($(result));
                    var stringStart = result.search("<div style=\"font-size: 14px; font-weight: bold; padding-top: 15px\" id=\"divDownload\">"); 
                    var stringEnd = result.search("1280x720.mp4</a>"); 
                    var download_text = result.substring(stringStart, stringEnd);

                    console.log(stringStart);
                    console.log(stringEnd);
                   
                    $("body").append('<div id="episodeasdf' + i + '" style="display: none;"></div>');
                    $('#episodeasdf' + i).append(download_text); 

                    var aDownload = $('#episodeasdf' + i + 'div a').map(function(i,el) { return $(el); });

                    var j; 

                    for(j = 0; j < aDownload.length; j++) {
                    	long_url = aDownload[j].attr('href');
                        long_test += "curl -C- -L -o \"" + episodeLinks[i]['name'] + "\".mp4 \"" + long_url + "\" && ";
                    }
                  },
         async:   false, 
         script:  true
    });       
}

long_test += "ls";

var blob = new Blob([long_test], {type: 'application/x-sh'});
var url = URL.createObjectURL(blob);
window.open(url, "_blank");
