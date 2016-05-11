# soundColor
Under MIT License. Created by me (@idkn).

First, I want to say to you to think about that's my first rep on git, and I want to improve myself, I accept any advice or critic. 

## Demo
Live version available here : http://goo.gl/Ra24Cf

## Installation
###Into index.html
  define your audio source, and place your sound into song/ folder. :
  
    src="song/YourSong.mp3" 

  You can change the name of the artist and the name of the song on index.html, but that's not necessary.
  
  
  
###Into js/sound.js
  You can change the value of speed, but I haven't create colors transition yet, so it should be a little bit awful.
    Change outPutThreshold (default value is to 11ms) to have a better effects.
    
    var outputThreshold = 11;

#### Errors
Actually, it's not running on mobile devices.

In view of the IE not supporting Web Audio API (http://caniuse.com/#feat=audio-api), soundColor not working in IE. Sorry. (but if someone use IE, please, help the world, and tell him about Mozilla).

If it's not running on Chrome, you can delete the 
> crossorigin="anonymous"

into the audio tag (index.html page). 

If you have this errror :
> MediaElementAudioSource outputs zeroes due to CORS access restrictions for file://yourfile

run your chrome with this command 

> chrome.exe --disable-web-security 


### Special thanks
I want to thanks Web Audio API developpers.

[SlideReveal]((http://nnattawat.github.io/slideReveal/) of @nnattawat is really usefull 

