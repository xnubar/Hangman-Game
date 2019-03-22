var words = ["passenger", "scorpions", "hozier", "radiohead", "imagine dragons"]

var currentWord = document.getElementById("current-word")
var remainingGuesses = document.getElementById("remaining-guesses")
var guessedLetters = document.getElementById("guessed-letters")
var wins = document.getElementById("wins");
var correctAnswer = document.getElementById("correct-answer");
var correctAnswerImg = document.getElementById("correct-answer-img");
var word = "";
var wordWithUnderscore = [];
var isGuessed;
var userGuess = "";
var audio;
function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function randomWordWithUnderscore(word) {
    wordWithUnderscore = [];
    var symbol;
    for (let i = 0; i < word.length; i++) {
        symbol = word.charCodeAt(i);
        if ((symbol >= 65 && symbol <= 90) || (symbol >= 97 && symbol <= 122)) {
            wordWithUnderscore.push("_");
        } else {
            wordWithUnderscore.push(word[i]);
        }
    }
}




function reStart() {
    guessedLetters.innerHTML = "";
    remainingGuesses.innerHTML = 13;
    word = randomWord();
    randomWordWithUnderscore(word);
    currentWord.innerHTML = wordWithUnderscore.toString().split(",").join("");
}

function matchLetter(letter, word) {
    isGuessed = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            wordWithUnderscore[i] = letter;
            isGuessed = true;
        }
    }
    currentWord.innerHTML = wordWithUnderscore.toString().split(",").join("");
    wrongGuessesLetters(letter);
}



function wrongGuessesLetters(letter) {
    var symbol = letter.charCodeAt();
    if ((symbol >= 65 && symbol <= 90) || (symbol >= 97 && symbol <= 122)) {

        if (!isGuessed) {
            if (guessedLetters.innerHTML === "") {
                guessedLetters.innerHTML = letter;
            } else {
                guessedLetters.innerHTML += ", " + letter;
            }
            remainingGuesses.innerHTML = parseInt(remainingGuesses.innerHTML) - 1;
        }
    }

}

reStart();
window.onkeypress = function (event) {
    console.log(word)
    if (parseInt(remainingGuesses.innerHTML) > 0 && parseInt(remainingGuesses.innerHTML) <= 13) {
        userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        matchLetter(userGuess, word)
        if (word === wordWithUnderscore.toString().split(",").join("")) {
            wins.innerHTML = parseInt(wins.innerHTML) + 1;
            correctAnswer.innerHTML = word.toUpperCase();
            correctAnswerImg.src = "./assets/images/" + word + ".png";
            if (audio != undefined) {
                audio.pause();
            }
            audio = new Audio("./assets/musics/" + word + ".mp3");
            audio.play();
            reStart();
        }
    } else {
        reStart();
    }


}

