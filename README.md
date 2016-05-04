# soundColor

First, I want to say to you to think about that's my first rep on git, and I want to improve myself, I accept any advice or critic. 



Into index.html
  define your audio source, and place your sound into song/ folder. :
  
    src="song/YourSong.mp3" 

  You can change the name of the artist and the name of the song on index.html, but that's not necessary.
  
  
  
Into js/sound.js
  You can change the value of speed, but I haven't create colors transition yet, so it should be a little bit awful
    change outPutThreshold (default value is to 50ms)
    
    var outputThreshold = 50;
    
  Currently, you can change the colors, but it's archaic
  Into constructColor function, set the LightUp function as you want. For example, a 
  
    Lightup(2, avgFirst[0]); 
  
  increase the red color (avgFirst[0] correspond to red) by 2.  LightUp can increase from 1 to 5 max.
  
  avgX (it can be avgFirst or avgSecond) is our color. But avgX is an array, and in this array, the first value is red, the second value is green, and the last value is blue. So if you want to modify blue of the second array, change into constructColor function avgSecond[2], but where did I change it you ask yourself, right ?
  
  The sType is the second you want to improve, so, into the avgFirst you will the change the even seconds arrays. It's quite difficult to understand, but, to increase by 3 the red color of the even second, change :
  
        avgFirst[0] = LightUp(1, avgFirst[0]); 
    INTO
         avgFirst[0] = LightUp(3, avgFirst[0]);
  
