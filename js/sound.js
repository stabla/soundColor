$(document).ready(function() {

var isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) {
  $('.headText').replaceWith("Not available on Internet Explorer (beacause IE not supporting Web Audio API). Make your life easier, better and developper's life, use Mozilla Firefox or whatever else. Thank you!");
  $('audio').hide();
}
    
    
    // Check if it is a mobile browser. Don't support Web AUDIO API. Not used yet, but it will.
    
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};    
    

$(function () {
  var ctx;
  if (typeof AudioContext !== "undefined") {
      ctx = new AudioContext();
  } else if (typeof webkitAudioContext !== "undefined") {
      ctx = new webkitAudioContext();

  } else {
      $(".hideIfNoApi").hide();
      $(".showIfNoApi").show();
      
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

  var outputThreshold = 50; // in milliseconds
  var lastOutput = new Date().valueOf() - outputThreshold; // Setting this to 0 initially will ensure it runs immediately, sry not anymore
  var showMessageCounter = 0; // Setting this to 0 to have switching message
  var  colorModifiers = {};

  $('.inputDiv input')
    .on('input', function(){
      $(this)
        .parent()
        .prev()
        .find('span')
        .text($(this).val());
      colorModifiers[$(this)[0].id] = $(this).val();
    })
    .each(function(){
      colorModifiers[$(this)[0].id] = $(this).val();
    });

///////// FUNCTIONS LIBRARY /////////
// Each function of this code is useful. 
  var pickerValue = function (array) {
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

  // EVEN SECONDS ARE DEFINE BY sType (1)
  // ODD SECONDS ARE DEFINE BY sType (2)
  // I want to construct my rgb color.
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
          console.log('data[0]' + data[0])
      }
      if (new Date().valueOf() - lastOutput <= outputThreshold) {
          //console.log(storage[0]);
          
      console.log('getting value');
      }
      
      
      console.log('mdr' + new Date().valueOf() - lastOutput <= outputThreshold)
      console.log('data' + data);

      doAll(data);

      constructColor(showMessageCounter % 2 + 1);

      showMessageCounter++;

      lastOutput = new Date().valueOf();

      $('#back').css({
          background: "-webkit-gradient(linear, left top, right top, from(" + colors[1] + "), to(" + colors[2] + "))"
      }).css({
          background: "-moz-linear-gradient(left, " + colors[1] + " 0%, " + colors[2] + " 100%)"
      });

      $('.blank, a').css({
          color: "#fff"
      });

  };

  // player -> analyser -> speakers
  // (Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4)
  $("#player").bind('canplay', function () {
      var src = ctx.createMediaElementSource(this);
      src.connect(analyser);
      analyser.connect(ctx.destination);
  });
  update();
});
});
