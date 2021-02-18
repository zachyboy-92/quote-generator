"use strict";

//create a function where the game will be played
//create a value that will return the players pressed button
//create a value that will return the computers outcome
//create a function that will check the player and computers outcome and return a winner

// create variables with selected elements
let intro = document.querySelector("#intro");
let buttons = document.querySelectorAll(".option");

//Players Value
const playerOneValue = document.querySelector("#player1-value");
const computerValue = document.querySelector("#computer-value");
const playerOneImage = document.querySelector("#player1-image");
const computerImage = document.querySelector("#computer-image");
const winnerValue = document.querySelector("#computer");

//Winner score
let userScore = document.querySelector(".player__score");
let computerScore = document.querySelector(".computer__score");

//Play again buttons
const playAgain = document.querySelector("#playagain");
const startOver = document.querySelector("#startover");

//create an array of elements
// const choices = ["paper", "rock", "scissor"];
// const randomChoice = Math.floor(Math.random() * choices.length);

//User Picks
let userChoice;
function user(callback) {
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      userChoice = button.getAttribute("data-choice");
      playerOneImage.setAttribute("src", `./images/${userChoice}.png`);
      callback();
      return userChoice;
    });
  });
}

//Random choice
function getRandomValue() {
  const choices = ["paper", "rock", "scissor"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

//Computer Picks
let computersChoice;
function computer() {
  computersChoice = getRandomValue();
  computerImage.setAttribute("src", `./images/${computersChoice}.png`);
  return computersChoice;
}

user(computer);

let userResult = 0;
let computerResult = 0;

function userWins() {
  intro.textContent = "User Wins";
  userResult++;
  userScore.textContent = userResult;
}

function computerWins() {
  intro.textContent = "Computer Wins";
  computerResult++;
  computerScore.textContent = computerResult;
}

function winner(user, computer) {
  //Guard Clause
  if (!userChoice && !computersChoice) return;

  if (user === computer) {
    intro.textContent = "Draw";
  }

  if (user === "rock") {
    if (computer === "paper") {
      computerWins();
    } else if (computer === "scissor") {
      userWins();
    }
  }
  if (user === "paper") {
    if (computer === "rock") {
      userWins();
    } else if (computer === "scissor") {
      computerWins();
    }
  }

  if (user === "scissor") {
    if (computer === "rock") {
      computerWins();
    } else if (computer === "paper") {
      userWins();
    }
  }
}

function wait() {
  setTimeout(() => {
    winner(userChoice, computersChoice);
  }, 2000);
}
wait();

const again = function () {
  playerOneImage.setAttribute("src", "");
  computerImage.setAttribute("src", "");
};

//play again
playAgain.addEventListener("click", function () {
  again();
  getRandomValue();
  user(computer);
  wait();
});

//start over
startOver.addEventListener("click", function () {
  again();
  getRandomValue();
  userResult = 0;
  computerResult = 0;
  userScore.innerHTML = userResult;
  computerScore.innerHTML = computerResult;

  intro.textContent = "Try your luck";
  user(computer);
  wait();
});
