// By @idkn on github. 
// If any request about changing, improve my code, contact me giomebs@gmail.com, I will take any comment. 

/*! slidereveal - v1.1.1 - 2016-03-04
* https://github.com/nnattawat/slidereveal
* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
!function(a){var b=function(a,b){var c=a.css("padding-"+b);return c?+c.substring(0,c.length-2):0},c=function(a){var c=b(a,"left"),d=b(a,"right");return a.width()+c+d+"px"},d=function(b,c){var d={width:250,push:!0,position:"left",speed:300,trigger:void 0,autoEscape:!0,show:function(){},shown:function(){},hidden:function(){},hide:function(){},top:0,overlay:!1,zIndex:1049,overlayColor:"rgba(0,0,0,0.5)"};this.setting=a.extend(d,c),this.element=b,this.init()};a.extend(d.prototype,{init:function(){var b=this,d=this.setting,e=this.element,f="all ease "+d.speed+"ms";e.css({position:"fixed",width:d.width,transition:f,height:"100%",top:d.top}).css(d.position,"-"+c(e)),d.overlay&&(e.css("z-index",d.zIndex),a("body").prepend("<div class='slide-reveal-overlay'></div>"),a(".slide-reveal-overlay").hide().css({position:"fixed",top:0,left:0,height:"100%",width:"100%","z-index":d.zIndex-1,"background-color":d.overlayColor}).click(function(){b.hide()})),e.data("slide-reveal",!1),d.push&&a("body").css({position:"relative","overflow-x":"hidden",transition:f,left:"0px"}),d.trigger&&d.trigger.length>0&&d.trigger.on("click.slideReveal",function(){e.data("slide-reveal")?b.hide():b.show()}),d.autoEscape&&a(document).on("keydown.slideReveal",function(c){0===a("input:focus, textarea:focus").length&&27===c.keyCode&&e.data("slide-reveal")&&b.hide()})},show:function(b){var d=this.setting,e=this.element;(void 0===b||b)&&d.show(e),d.overlay&&a(".slide-reveal-overlay").show(),e.css(d.position,"0px"),d.push&&("left"===d.position?a("body").css("left",c(e)):a("body").css("left","-"+c(e))),e.data("slide-reveal",!0),(void 0===b||b)&&setTimeout(function(){d.shown(e)},d.speed)},hide:function(b){var d=this.setting,e=this.element;(void 0===b||b)&&d.hide(e),d.push&&a("body").css("left","0px"),e.css(d.position,"-"+c(e)),e.data("slide-reveal",!1),(void 0===b||b)&&setTimeout(function(){d.overlay&&a(".slide-reveal-overlay").hide(),d.hidden(e)},d.speed)},toggle:function(a){var b=this.element;b.data("slide-reveal")?this.hide(a):this.show(a)}}),a.fn.slideReveal=function(b,c){return void 0!==b&&"string"==typeof b?this.each(function(){var d=a(this).data("slide-reveal-model");"show"===b?d.show(c):"hide"===b?d.hide(c):"toggle"===b&&d.toggle(c)}):this.each(function(){a(this).data("slide-reveal-model")&&a(this).data("slide-reveal-model").remove(),a(this).data("slide-reveal-model",new d(a(this),b))}),this}}(jQuery);


$(document).ready(function() {
    $('.set').css('visibility', 'visible');
    
    
    (function ($) {
  // Private attributes and method
  var getPadding = function($el, side) {
    var padding = $el.css('padding-' + side);
    return padding ? +padding.substring(0, padding.length - 2) : 0;
  };

  var sidePosition = function($el) {
    var paddingLeft = getPadding($el, 'left');
    var paddingRight = getPadding($el, 'right');
    return ($el.width() + paddingLeft + paddingRight) + "px";
  };

  var SlideReveal = function($el, options) {
    // Define default setting
    var setting = {
      width: 250,
      push: true,
      position: "left",
      speed: 300, //ms
      trigger: undefined,
      autoEscape: true,
      show: function(){},
      shown: function(){},
      hidden: function(){},
      hide: function(){},
      top: 0,
      overlay: false,
      "zIndex": 1049,
      overlayColor: 'rgba(0,0,0,0.5)'
    };

    // Attributes
    this.setting = $.extend(setting, options);
    this.element = $el;

    this.init();
  };

  // Public methods
  $.extend(SlideReveal.prototype, {
    init: function() {
      var self = this;
      var setting = this.setting;
      var $el = this.element;

      var transition = "all ease " + setting.speed + "ms";
      $el.css({
        position: "fixed",
        width: setting.width,
        transition: transition,
        height: "100%",
        top: setting.top
      })
      .css(setting.position, "-" + sidePosition($el));

      if (setting.overlay) {
        $el.css('z-index', setting.zIndex);
        $("body").prepend("<div class='slide-reveal-overlay'></div>");
        $(".slide-reveal-overlay")
        .hide()
        .css({
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          'z-index': setting.zIndex - 1,
          'background-color': setting.overlayColor,
        }).click(function() {
          self.hide();
        });
      }

      // Add close stage
      $el.data("slide-reveal", false);

      if (setting.push){
        $("body").css({
          position: "relative",
          "overflow-x": "hidden",
          transition: transition,
          left: "0px"
        });
      }

      // Attach trigger using click event
      if (setting.trigger && setting.trigger.length > 0) {
        setting.trigger.on('click.slideReveal', function() {
          if (!$el.data("slide-reveal")) { // Show
            self.show();
          } else { // Hide
            self.hide();
          }
        });
      }

      // Bind hide event to ESC
      if (setting.autoEscape) {
        $(document).on('keydown.slideReveal', function(e) {
          if ($('input:focus, textarea:focus').length === 0) {
            if (e.keyCode === 27 && $el.data("slide-reveal")) { // ESC
              self.hide();
            }
          }
        });
      }
    },

    show: function(triggerEvents) {
      var setting = this.setting;
      var $el = this.element;

      // trigger show() method
      if (triggerEvents === undefined || triggerEvents) { setting.show($el); }

      // show overlay
      if (setting.overlay) {
        $(".slide-reveal-overlay").show();
      }

      // slide the panel
      $el.css(setting.position, "0px");
      if (setting.push) {
        if (setting.position === "left") {
          $("body").css("left", sidePosition($el));
        } else {
          $("body").css("left", "-" + sidePosition($el));
        }
      }
      $el.data("slide-reveal", true);

      // trigger shown() method
      if (triggerEvents === undefined || triggerEvents) {
        setTimeout(function() {
          setting.shown($el);
        }, setting.speed);
      }
    },

    hide: function(triggerEvents) {
      var setting = this.setting;
      var $el = this.element;

      // trigger hide() method
      if (triggerEvents === undefined || triggerEvents) { setting.hide($el); }

      // hide the panel
      if (setting.push) {
        $("body").css("left", "0px");
      }
      $el.css(setting.position, "-" + sidePosition($el));
      $el.data("slide-reveal", false);

      // trigger hidden() method
      if (triggerEvents === undefined || triggerEvents) {
        setTimeout(function(){
          // hide overlay
          if (setting.overlay) {
            $(".slide-reveal-overlay").hide();
          }

          setting.hidden($el);
        }, setting.speed);
      }
    },

    toggle: function(triggerEvents) {
      var $el = this.element;
      if ($el.data('slide-reveal')) {
        this.hide(triggerEvents);
      } else {
        this.show(triggerEvents);
      }
    }
  });

  // jQuery collection methods
  $.fn.slideReveal = function (options, triggerEvents) {
    if (options !== undefined && typeof(options) === "string") {
      this.each(function() {
        var slideReveal = $(this).data('slide-reveal-model');

        if (options === "show") {
          slideReveal.show(triggerEvents);
        } else if (options === "hide") {
          slideReveal.hide(triggerEvents);
        } else if (options === 'toggle') {
          slideReveal.toggle(triggerEvents);
        }
      });
    } else {
      this.each(function() {
        if ($(this).data('slide-reveal-model')) {
          $(this).data('slide-reveal-model').remove();
        }
        $(this).data('slide-reveal-model', new SlideReveal($(this), options));
      });
    }

    return this;
  };

}(jQuery));    
})


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
    analyser.fftSize = 64;
    var data = new Uint8Array(analyser.frequencyBinCount);

    // All var needed outside the functions
    var storageOne = [];
    var storageTwo = [];
    var storageThree = [];
    var storageOne2 = [];
    var storageTwo2 = [];
    var storageThree2 = [];

    var avgFirst = [];
    var avgSecond = [];

    var average = 0;
    var r1, g1, b1, r2, g2, b2;
    var color1;
    var color2;

    var lastOutput = 0; // Setting this to 0 initially will ensure it runs immediately
    var outputThreshold = 50; // in milliseconds
    var showMessageCounter = 0; // Setting this to 0 to have switching message
    
    var r1u = 1, g1u = 1, b1u = 1, r2u = 1, g2u = 1, b2u = 1;
    
    
    r1u = document.getElementById("r1u");
    g1u = document.getElementById("g1u");
    b1u = document.getElementById("b1u");
    r2u = document.getElementById("r2u");
    g2u = document.getElementById("g2u");
    b2u = document.getElementById("b2u");

    var resR1u = document.getElementById("resR1u"),
        resG1u = document.getElementById("resG1u"),
        resB1u = document.getElementById("resB1u"),
        resR2u = document.getElementById("resR2u"),
        resG2u = document.getElementById("resG2u"),
        resB2u = document.getElementById("resB2u");

    
r1u.addEventListener("input", function() {
    resR1u.innerHTML = r1u.value;
}, false); 

g1u.addEventListener("input", function() {
    resG1u.innerHTML = g1u.value;
}, false); 

b1u.addEventListener("input", function() {
    resB1u.innerHTML = b1u.value;
}, false); 

r2u.addEventListener("input", function() {
    resR2u.innerHTML = r2u.value;
}, false); 

g2u.addEventListener("input", function() {
    resG2u.innerHTML = g2u.value;
}, false); 

b2u.addEventListener("input", function() {
    resB2u.innerHTML = b2u.value;
}, false); 


 
    
    ///////// FUNCTIONS LIBRARY /////////
    // EVEN SECONDS ARE DEFINE BY sType (1)
    // ODD SECONDS ARE DEFINE BY sType (2)

    // Sort out the main array data[] and inject each 3 values into another array. There's existing 3 array which depends if it's the second even second or odd. (I called it sType)
    var pickerValue = function (array, sType = '1') {
        if (sType === 1) {
            for (var starterOne = 0; starterOne < 30; starterOne += 3) {
                storageOne.push(array[starterOne]);
            };
            for (var starterTwo = 1; starterTwo <= 30; starterTwo += 3) {
                storageTwo.push(array[starterTwo]);
            };
            for (var starterThree = 2; starterThree <= 30; starterThree += 3) {
                storageThree.push(array[starterThree]);
            }

        } else if (sType === 2) {
            for (var starterOne = 0; starterOne < 30; starterOne += 3) {
                storageOne2.push(array[starterOne]);
            };
            for (var starterTwo = 1; starterTwo <= 30; starterTwo += 3) {
                storageTwo2.push(array[starterTwo]);
            };
            for (var starterThree = 2; starterThree <= 30; starterThree += 3) {
                storageThree2.push(array[starterThree]);
            }
        }
    };

    // Calculate the average of array. Very useful to calcul the average of my one seconde's three arrays.
    var calcAvg = function (array) {
        var sum = 0;
        for (var countCalcAvg = 0; countCalcAvg < array.length; countCalcAvg++) {
            sum += parseInt(array[countCalcAvg], 10);
        }

        if (array.length > 0) {
            average = sum / array.length;
        }
        return Math.round(average);
    };


    // By using this function, we delete all values from storageOne, storageTwo, storageThree, and their newer arrays by selecting sType as 2.  
    var cleanUpArray = function (sType = '1') {
        if (sType === 1) {
            storageOne.length = 0;
            storageTwo.length = 0;
            storageThree.length = 0;
        } else if (sType === 2) { // THIS IS THE 2 ARRAYS
            storageOne2.length = 0;
            storageTwo2.length = 0;
            storageThree2.length = 0;
        }
    };

    // Doing the two precedent thing in one time. 
    var doAll = function (array, sType = '1') {
        if (sType === 1) {
            pickerValue(array, 1);

            avgFirst[0] = calcAvg(storageOne);
            avgFirst[1] = calcAvg(storageTwo);
            avgFirst[2] = calcAvg(storageThree);


            if (avgFirst[0] >= 255) {
                avgFirst[0] = 255;
            }
            if (avgFirst[1] >= 255) {
                avgFirst[1] = 255;
            }
            if (avgFirst[2] >= 255) {
                avgFirst[2] = 255;
            }
        } else if (sType === 2) {
            pickerValue(array, 2);

            avgSecond[0] = calcAvg(storageOne2);
            avgSecond[1] = calcAvg(storageTwo2);
            avgSecond[2] = calcAvg(storageThree2);


            if (avgSecond[0] >= 255) {
                avgSecond[0] = 255;
            }
            if (avgSecond[1] >= 255) {
                avgSecond[1] = 255;
            }
            if (avgSecond[2] >= 255) {
                avgSecond[2] = 255;
            }
        }
    };


    // This lightup our colours, howMuch can take values from 0 to 5, and avg is the focusAverage we want to change. 
    var LightUp = function (howMuch = '0', avg) {
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

    // I want to construct my rgb color. 
    var constructColor = function (sType = '1') {
        if (sType === 1) {
            avgFirst[0] = LightUp(r1u.value, avgFirst[0]);
            avgFirst[1] = LightUp(g1u.value, avgFirst[1]);
            avgFirst[2] = LightUp(b1u.value, avgFirst[2]);


            r1 = avgFirst[0];
            g1 = avgFirst[1];
            b1 = avgFirst[2];
            color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
        } else if (sType === 2) {
            avgSecond[0] = LightUp(r2u.value, avgSecond[0]);
            avgSecond[1] = LightUp(g2u.value, avgSecond[1]);
            avgSecond[2] = LightUp(b2u.value, avgSecond[2]);

            r2 = avgSecond[0];
            g2 = avgSecond[1];
            b2 = avgSecond[2];
            color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
        }
    };

    // Function update();
    function update() {
        requestAnimationFrame(update);
        analyser.getByteFrequencyData(data);
        analyser.smoothingTimeConstant = 0.2;

        var count = 0;
        for (var i = data.length; i--;) {
            count += data[i];
            if (count >= 1) {
                if (new Date().valueOf() - lastOutput > outputThreshold) {
                    if (showMessageCounter === 0 || showMessageCounter % 2 === 0) {
                        if (showMessageCounter === 0) {
                            doAll(data, 1);
                        } else {
                            cleanUpArray(1);
                            doAll(data, 1);
                            constructColor(1);
                        }
                        showMessageCounter++;

                    } else {
                        if (showMessageCounter === 1) {
                            doAll(data, 2);
                        } else {
                            cleanUpArray(2);
                            doAll(data, 2);
                            constructColor(2);

                        }
                        showMessageCounter++;
                    }
                    lastOutput = new Date().valueOf();

                    $('#back').css({
                        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
                    }).css({
                        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
                    });

                    $('.blank').css({
                        color: "#fff"
                    });
                    $('a').css({
                        color: "#fff"
                    });
                }
            }
        }
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


$('#slider').slideReveal({
    trigger: $("#trigger")
});