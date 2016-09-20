document.addEventListener('DOMContentLoaded', function(){ 

const d = document;
var isIE = /*@cc_on!@*/false || !!d.documentMode;
if (isIE) {
  d.getElementsByClassName('headText').outerHTML = "Not available on Internet Explorer (beacause IE not supporting Web Audio API). Make your life and developper's life easier, use Mozilla Firefox or whatever else. Thank you!";
  d.getElementsByTagName('audio').style.display = 'none';
}

(function() {
    console.log('la');
  var ctx;
  if (typeof AudioContext !== "undefined") {
      ctx = new AudioContext();
  } else if (typeof webkitAudioContext !== "undefined") {
      ctx = new webkitAudioContext();

  } else {
      d.getElementsByClassName('hideIfNoApi').style.display = 'none';
      d.getElementsByClassName('showIfNoApi').style.display = 'block';
      return;
  }
  // Create the analyser
  var analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  var data = new Uint8Array(analyser.frequencyBinCount);


  // All var needed outside the functions
  var storage = [[], [], []],
      avg = [],
      average = 0,
      r, g, b,
      colors = [];

  const outputThreshold = 50; // in milliseconds
  var lastOutput = new Date().valueOf() - outputThreshold, // Setting this to 0 initially will ensure it runs immediately, sry not anymore
      showMessageCounter = 0, // Setting this to 0 to have switching message
      colorModifiers = {};

//  $('.inputDiv input')
//    .on('input', function(){
//      $(this)
//        .parent()
//        .prev()
//        .find('span')
//        .text($(this).val());
//      colorModifiers[$(this)[0].id] = $(this).val();
//    })
//    .each(function(){
//      colorModifiers[$(this)[0].id] = $(this).val();
//    });

    d.getElementsByClassName('inputDiv').getElementsByTagName('input').addEventListener('input', function() {
        this.parentElement.previousElementSibling.querySelectorAll('span').textContent(this.valueOf);
        colorModifiers[this[0].id] = this.valueOf;
    }).forEach(function() {
        colorModifiers[this[0].id] = this.valueOf;
    });


    
// initialize necessary functions to do job
  function pickerValue(array) {
    for (var i = 0; i < 170; i ++) {
        storage[0][i] = array[3*i];
        storage[1][i] = array[3*i+1];
        storage[2][i] = array[3*i+2];
    }
  };
  // Calculate the average of array. Very useful to calcul the average of my one seconde's three arrays.
  var calcAvg = function (array) {
      var sum = 0;
      for (var countCalcAvg = 0; countCalcAvg < array.length; countCalcAvg++) {
          sum += parseInt(array[countCalcAvg], 10);
      }

      if (array.length) {
          average = sum / array.length;
      }

      var res = Math.round(average);
      return res >= 255 ? 255 : res;
  };
  // Doing the two precedent thing in one time.
  var doAll = function (array) {

    pickerValue(array);
    avg = storage.map(calcAvg);

  };
  // This lightup our colours, howMuch can take values from 0 to 5, and avg is the focusAverage we want to change.
  var LightUp = function (howMuch, avg) {
      var resultLightUp = avg;
      if (howMuch >= 0 && howMuch <= 5) {
          resultLightUp = avg * howMuch;
          if (resultLightUp >= 255) {
              return 255;
          } else {
              return resultLightUp;
          }
      }
  };
    
  /*
     EVEN SECONDS ARE DEFINE BY sType (1)
     ODD SECONDS ARE DEFINE BY sType (2)
     I want to construct my rgb color.
  */
  var constructColor = function (sType) {

    r = LightUp(colorModifiers['r'+(sType)+'u'], avg[0]);
    g = LightUp(colorModifiers['g'+(sType)+'u'], avg[1]);
    b = LightUp(colorModifiers['b'+(sType)+'u'], avg[2]);

    colors[sType] = "rgb(" + r + "," + g + "," + b + ")";
  };

  // Function update();
  function update() {
      requestAnimationFrame(update);
      analyser.getByteFrequencyData(data);
      analyser.smoothingTimeConstant = 0.2;


      if (!data[0]) {
        return;
      }
      if (new Date().valueOf() - lastOutput <= outputThreshold) {
          console.log(storage[0]);
      }

      doAll(data);

      constructColor(showMessageCounter % 2 + 1);

      showMessageCounter++;

      lastOutput = new Date().valueOf();
      
      const d_back = d.getElementById('back');
        d_back.style.background = "-webkit-gradient(linear, left top, right top, from(" + colors[1] + "), to(" + colors[2] + "))";
        d_back.style.background = "-moz-linear-gradient(left, " + colors[1] + " 0%, " + colors[2] + " 100%)";

      d.getElementsByClassName('blank').style.color = '#fff';
      d.getElementsByTagName('a').style.color = '#fff';

  };

  // player -> analyser -> speakers
  // (Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4)
d.getElementById('player').addEventListener("oncanplaythrough", function () {
      var src = ctx.createMediaElementSource(this);
      src.connect(analyser);
    console.log('here');
      analyser.connect(ctx.destination);
  });
  update();
}) ()
}, false);
