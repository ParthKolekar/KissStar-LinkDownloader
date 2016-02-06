var URL = window.location.origin;
var episodeLinks = $('table.listing a').map(
        function(i,el) { 
            return { 
                'link': $(el).attr('href'),
                'name': $(el).text().replace('\n', '').trim()
            }
        });
$.ajaxSetup({async:false});
$.getScript(URL+"/Scripts/asp.js");
var long_url; 
var videoQuality = '1280x720.mp4'
var i; 
var long_test = "";
for (i = episodeLinks.length - 1 ; i >= 0; i--) {
    jQuery.ajax({
         url:    URL + episodeLinks[i]['link'], 
         success: function(result) {
                    var $result = eval($(result));
                    var stringStart = result.search("var wra"); 
                    var stringEnd = result.search("document.write"); 
                    var javascriptToExecute = result.substring(stringStart, stringEnd);
                    eval(javascriptToExecute);
                   
                    $("body").append('<div id="episode' + i + '" style="display: none;"></div>');
                    $('#episode' + i).append(wra); 

                    var downloadQualityOptions = $('#episode' + i + ' a').map(function(i,el) { return $(el); });
                    var j; 
                    for(j = 0; j < downloadQualityOptions.length; j++) {
                        if(videoQuality === downloadQualityOptions[j].html()) {
                            long_url = downloadQualityOptions[j].attr('href');
                            long_test += "curl -C- -L -o \"" + episodeLinks[i]['name'] + "\".mp4 \"" + long_url + "\" && ";
                        }
                    }
                  },
         async:   false, 
         script:  true
    });       
}

console.log(long_test);
