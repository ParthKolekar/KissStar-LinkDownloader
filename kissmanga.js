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
                    var stringStart = result.search("var lstImages"); 
                    var stringEnd = result.search("var lstImagesLoaded"); 
                    var javascriptToExecute = result.substring(stringStart, stringEnd);
                    eval(javascriptToExecute);
                    
                    long_test += "mkdir \"" + episodeLinks[i]['name'] + "\" && "

                    long_test += lstImages.map(
                            function(element, iterator, array){
                                return "curl -C- -L -o \"" + episodeLinks[i]['name'] + "/" + iterator + "\." + element.split(".").pop() + "\" \"" + element + "\" && "; 
                            }).reduce(
                                function(previous, current, iterator, array){
                                    return previous + " " + current; 
                                });
                  },
         async:   false, 
         script:  true
    });       
}

console.log(long_test);
