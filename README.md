How to use the script 
======================


Broken
------

The following scripts do not work any more. There has been an update to kissanime, and now openload
and other servers are being used, which do not work as nicely.


KissAnime Script
----------------

    $.getScript("https://raw.githubusercontent.com/ParthKolekar/KissStar-LinkDownloader/master/kissanime.js");

KissManga Script
----------------

    $.getScript("https://raw.githubusercontent.com/ParthKolekar/KissStar-LinkDownloader/master/kissmanga.js");

Description and usage instructions
==================================

If you're a free user on KissStar.to and want to download multiple episodes/manga at once, you'd usually have to visit each episode page individually one by one and get the download link again and again 

This app avoids that by basically allowing you to simply go to the main anime page, run the script and automatically get direct download links for all the episodes 

The detailed steps to use this script are as follows - 

##1. Login to KissStar.to using your account (make one if needed) 

##2. Press F12 and click on the console tab 

You should be on the URL of the anime i.e. https://kissanime.to/Anime/XXX or https://kissmanga.com/Manga/XXX

##3. Paste the following into the console window and press enter 

    $.getScript("https://rawgit.com/ParthKolekar/KissStar-LinkDownload/master/kiss<type>.js");

##4. Wait till all links are generated, and then copy them from the console window! 

Once you copy these links you can paste them on your terminal and start downloading.
