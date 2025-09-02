// let randomNumber = Math.floor(Math.random() * 100 + 1);
let randomNumber;
const submit = document.querySelector("#check");
const userInput = document.querySelector("#userInput");
const errorMsg = document.querySelector(".errorMsg");
const guesses = document.querySelector(".guesses");
const remaining = document.querySelector(".remaining");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".startOver");
const mobileScreen = document.querySelector(".mobile-screen-section");

function generateRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

randomNumber = generateRandomNumber();
// console.log(randomNumber);

let prevGuess = [];
let numOfGuess = 0;
let totalGuess = 10;
let playGame = true;
let newGameHandler = null;

function addClass(el, name) {
  if (el && !el.className.includes(name)) {
    el.classList.add(name);
  }
}

function removeClass(el, name) {
  if (el && el.className.includes(name)) {
    el.classList.remove(name);
  }
}

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  errorMsg.innerHTML = "";

  if (isNaN(guess) || userInput.value === "") {
    errorMsg.innerHTML = "Please enter a valid number";
    userInput.focus();
  } else if (userInput.value.includes(".")) {
    errorMsg.innerHTML = "Please enter a whole number";
    userInput.focus();
  } else if (guess < 1) {
    errorMsg.innerHTML = "Please enter number more than 1";
    userInput.focus();
  } else if (guess > 100) {
    errorMsg.innerHTML = "Please enter number less than 100";
    userInput.focus();
  } else {
    removeClass(startOver, "disabled");
    removeClass(guesses.parentElement, "disabled");
    prevGuess.push(guess);
    numOfGuess++;
    displayGuess(guess);

    if (guess === randomNumber) {
      displayMessage(`YOU WON IN ${numOfGuess} TRIES!`);
      addClass(lowOrHi, "success");
      endGame();
    } else if (numOfGuess >= totalGuess) {
      displayMessage(`THE NUMBER IS ${randomNumber}, YOU LOST!`);
      addClass(lowOrHi, "danger");
      endGame();
    } else {
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess < randomNumber) {
    displayMessage(`LESS THAN THAT`);
  } else {
    displayMessage(`GREATER THAN THAT`);
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guesses.innerHTML += `<span>${guess}</span>`;
  // if (numOfGuess >= totalGuess) {
  //   remaining.innerHTML = "0";
  // } else {
  //   remaining.innerHTML = `${totalGuess - numOfGuess}`;
  // }
  remaining.innerHTML = `${Math.max(totalGuess - numOfGuess, 0)}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `${message}`;
}
function endGame() {
  userInput.value = "";
  errorMsg.innerHTML = "";
  userInput.setAttribute("disabled", "");
  submit.setAttribute("disabled", "");
  addClass(userInput.parentElement, "disabled");
  addClass(submit, "disabled");
  addClass(remaining.parentElement, "disabled");
  addClass(guesses.parentElement, "disabled");
  addClass(mobileScreen, "result");
  removeClass(lowOrHi, "warning");

  const div = document.createElement("div");
  addClass(div, "play-again");
  div.innerHTML = `<button id="newGame">
                    <i class="ri-play-circle-line"></i>
                    <span>PLAY AGAIN</span>
                  </button>`;
  startOver.appendChild(div);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");

  if (newGameHandler) {
    newGameButton.removeEventListener("click", newGameHandler);
  }

  newGameHandler = () => {
    randomNumber = generateRandomNumber();
    // console.log(randomNumber);
    prevGuess = [];
    numOfGuess = 0;
    guesses.innerHTML = "";
    remaining.innerHTML = `${totalGuess}`;
    lowOrHi.innerHTML = "";
    errorMsg.innerHTML = "";
    userInput.removeAttribute("disabled");
    submit.removeAttribute("disabled");
    removeClass(userInput.parentElement, "disabled");
    removeClass(submit, "disabled");
    removeClass(remaining.parentElement, "disabled");
    removeClass(mobileScreen, "result");
    removeClass(lowOrHi, "danger");
    removeClass(lowOrHi, "success");
    addClass(lowOrHi, "warning");
    addClass(startOver, "disabled");

    const playAgainDiv = document.querySelector(".play-again");
    if (playAgainDiv) {
      startOver.removeChild(playAgainDiv);
    }

    playGame = true;
  };

  newGameButton.addEventListener("click", newGameHandler);
}
