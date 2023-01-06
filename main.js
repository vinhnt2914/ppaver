var words = [
    'Project Outcomes',
  ];
  var letters = "abcdefghijklmnopqrstuvwxyz#%&^+=-",
      speed = 250,
      steps = 4,
      loader = document.querySelector('#loader');
  
  function getRandomWord() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
  }
  function getRandomLetter() {
    var randomLetter = letters[Math.floor(Math.random() * letters.length)];
    return randomLetter;
  }
  
  function randomWordLoop() {
    var word = getRandomWord();
    var textLength = word.length;
    for(var i = 0; i < textLength; i++) {    
      (function(i,word){
        letterAppear(i, word);
      })(i,word)
    }
    
    function letterAppear(i, word) {
      setTimeout(function() {
        randomLetters(i, word);
      }, speed*i);  
    }
  
    function randomLetters(i, word) {
      for (var j = 0; j <= steps; j++) {
        charsAnim(i, word, j);
      }
    }
  
    function charsAnim(i, word, j) {
      setTimeout(function() {
        var count = j; 
        if (j < steps) {           
          randomChar(i, word, count, j);
        } else {
          goodChar(i, word, count, j);
        }
        /* seems it fails less if I divide j, don't know why */
        /*}, (speed/steps)*(j / 1.8));*/
      }, ((speed/steps)*j) - (speed/steps));
    }
  
    function randomChar(i, word, count, j) {
      var letter = getRandomLetter();    
      if (j > 0) {
        var oldText = loader.textContent.slice(0, -1);
      } else {
        var oldText = loader.textContent;
      }
      loader.textContent = oldText + letter;    
    }
    function goodChar(i, word, count, j) {
      var oldText = loader.textContent.slice(0, -1);  
      loader.textContent = oldText + word[i];
      if (i == textLength - 1 ) {
        removeWord();
      }
    }
    
    function removeWord() {
      setTimeout(function() {
        for (var k = 0; k < textLength; k++) {
           removeLetters(k);
        }
      }, speed*2);
    }
    function removeLetters(k) {
      setTimeout(function() {
        removeLetter(k);
      }, 75*k);
    }
    function removeLetter(k) {
      var actualText = loader.textContent.slice(0, -1);
      loader.textContent = actualText;
      if (k == textLength - 1) {
        randomWordLoop();
      }
    }
  }
  
  randomWordLoop();

// function([string1, string2],target id,[color1,color2])    
consoleText(['Group Reflection.',], 'text',['tomato','rebeccapurple','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('groupreflect-effect');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'groupreflect-effect hidden'
      visible = false;

    } else {
      con.className = 'groupreflect-effect'

      visible = true;
    }
  }, 400)
}
