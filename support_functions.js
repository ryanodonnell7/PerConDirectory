function range(j, k) { 
  return Array
      .apply(null, Array((k - j) + 1))
      .map(function(_, n){ return n + j; }); 
}

/* set up countdown timer 
mins should either be a round number (minutes) or
a proportion that, when multiplied by 60, 
is a whole number (seconds) */
function setBreakTimer (mins) {

  if (mins < 1) {
    minutes = 0;
    seconds = mins * 60;
  } else {
    minutes = mins;
    seconds = 00;
  }

  document.getElementById('countdownTimer').innerHTML = minutes + ":" + seconds;
  startTimer();
}

/* functions in this file are sourced in all phases of membias */

function startTimer() {
  
  var presentTime = document.getElementById('countdownTimer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}

  if(m<0){
    $('#contButton').show();
    $('#restTimer').hide();
    $('#countdownTimer').hide();
    proceedToNextTask('break');
    return;
  }
  
  document.getElementById('countdownTimer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* get browser and screen size information */
  function getBrowserInfo () {

    createInputElement(navigator.product,'engine');
    createInputElement(navigator.platform,'platform');
    createInputElement(navigator.language,'language');
    createInputElement(screen.width,'width');
    createInputElement(screen.height,'height');
}

/* functions to restrict trials to a specified duration */
var trialTimer;

function SetTrialDuration (dur) {
    trialTimer = setTimeout(function () {
      console.log('here')
      // hide prior trial stim
    $('.stim, .dot').hide();
      currSubTask++
      taskFunctions[task](); 
    }, dur);
  }

function stopTrialDuration () {
  clearTimeout(trialTimer);
}



function showContButton () {

  $(document).bind("keydown.key", function(event) {
    if (event.which == 187) {
      $('#contButton').show();
    }
  });
}

/* pressing enter key clicks continue button */
function pressEnterCont () {
  $(document).bind("keydown.key", function(event) {
    if (event.which == 13 && $('#contButton').is(':visible')) {
      $('#contButton').click();
    }
  });

   $(document).bind("keydown.key", function(event) {
    if (event.which == 13 && $('#acceptButton').is(':visible')) {
      $('#acceptButton').click();
    }
  });
}


function keyBindConf () {
  $(document).bind("keydown.key", function(event) {
    if ($('#confContainer').is(':visible')) {
      if (event.which == 65) {recordResponses(1);} // a
      if (event.which == 83) {recordResponses(2);} // s
      if (event.which == 68) {recordResponses(3);} // d
      if (event.which == 70) {recordResponses(4);} // f
    }
  });  
}

/* does what it says */
function hideVisibleInstructions() {

  visibleInstruct = $('.instructions:visible');
  $(visibleInstruct).hide();

}

/* record a variable as an input element */
function createInputElement(value,name){
      newElem = document.createElement('input');
      newElem.type = 'hidden';
      newElem.value = value;
      newElem.name = name;
      newElem.id = name;
      document.getElementById('responses').appendChild(newElem);        
}

/* show the current trial number out of all trials */
function updateTrialCounter(counter, numTrial) { 
  tc = document.getElementById('trialCounter');
  count = counter + 1
  tc.innerText = 'Trial ' + count + ' of ' + numTrial;
}

//creates the equivlanet of Matlab's find function in javascript
Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === el) {
            idxs.unshift(i);
        }
    }
    return idxs;
};
