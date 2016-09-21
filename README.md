# soundColor
Under MIT License. Created by me ( @idkn ).

First, I want to say to you to think about that's my first rep on git, and I want to improve myself, I accept any advice or critic.

#### Demo
Live version available here: https://idkn.github.io/soundColor/

#### How it works
Some magic with Web Audio API and fft (fast fourier transform). In fact, it's more about array's manipulation than magic. 


## Download
You can download it via bower

    bower install soundcolor

## Installation
###Into index.html
  define your audio source, and place your sound into song/ folder :

    src="song/YourSong.mp3"

  You can change the name of the artist and the name of the song on index.html, but that's not necessary.


### Into js/sound.js
  You can change the value of speed, but I haven't create colors transition yet, so it should be a little bit awful.
    Change outPutThreshold to have a better effects. (but still too many flashes)

    var outputThreshold = 50;

#### Errors
Actually, it's not running on mobile devices.

In view IE not supporting Web Audio API (http://caniuse.com/#feat=audio-api), soundColor not working in IE. Sorry. (but if someone use IE, please, help the world, and tell him about Mozilla).

If it's not running on Chrome, you can delete the
> crossorigin="anonymous"

into the audio tag (index.html page).

If you have this error :
> MediaElementAudioSource outputs zeroes due to CORS access restrictions for file://yourfile

run your chrome with this command

> chrome.exe --disable-web-security


#### Special thanks
I want to thanks Web Audio API developpers. (https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

Thanks to [@blacksponge](https://github.com/blacksponge)
