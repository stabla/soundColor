// By @idkn (github). 
// If any request about changing, improve my code, contact me giomebs@gmail.com, I will take any comment. 

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
            avgFirst[0] = LightUp(1, avgFirst[0]);
            avgFirst[1] = LightUp(1, avgFirst[1]);
            avgFirst[2] = LightUp(1, avgFirst[2]);


            r1 = avgFirst[0];
            g1 = avgFirst[1];
            b1 = avgFirst[2];
            color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
        } else if (sType === 2) {
            avgSecond[0] = LightUp(1, avgSecond[0]);
            avgSecond[1] = LightUp(1, avgSecond[1]);
            avgSecond[2] = LightUp(1, avgSecond[2]);

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
            if (count >= 1) { // is data sum more or equal to 1 ? if yes, then i launch everything, because if it is not, it's running for nothing.
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

                    $('.text').css({
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