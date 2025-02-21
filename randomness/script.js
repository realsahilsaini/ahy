import generateRandomNumber from "./utils/randNum.js";

window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

// Creating children HTML elements for the buttonsBlock
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let buttonsBlock = document.getElementById("buttonsBlock");
nums.forEach((num) => {
  let button = document.createElement("button");
  button.innerHTML = num;
  button.setAttribute(
    "class",
    "numBtn rounded-full bg-blue-500 text-white p-2 drop-shadow-lg border border-neutral-400/50 hover:scale-110 transistion-all duration-200 m-2"
  );
  button.setAttribute("onclick", `checkNumber(${num})`);
  buttonsBlock.appendChild(button);
});


// Initializations and Declarations for the game logic 
let total_attempts = 50;
let remaining_attempts = total_attempts;
let attempts = 0;
let best_attempts = localStorage.getItem("best_attempts") ?? 0; //lesser the better

//Correct guess min array
let correctGuesses = [];

//pre filling the text in the HTML
document.getElementById("message").innerHTML =
  "Start the game by guessing a number!";
document.getElementById("my_attempts").innerHTML = `Attempts: ${attempts}`;
document.getElementById(
  "remaining_attempts"
).innerHTML = `Remaining attempts: ${remaining_attempts}`;
document.getElementById(
  "best_attempts"
).innerHTML = `Best attempts: ${best_attempts}🎯`;

//We have to check if the given number matches the random number
function checkNumber(selectedNumber) {
  if (total_attempts === 0) {
    alert("You have exhausted all the attempts!😔");
    resetGame();
    return;
  }

  //Getting user input
  let user_input = selectedNumber;
  
  //Generate a random number
  let random_number = generateRandomNumber();
  console.log("Input: ", user_input, "Random: ", random_number);

  //Getting the HTML elements
  let my_attempts = document.getElementById("my_attempts");
  let message = document.getElementById("message");
  let remaining_attempts = document.getElementById("remaining_attempts");
  let best_attempts_text = document.getElementById("best_attempts");

  //Incrementing the attempts and showing the attempts
  ++attempts;
  my_attempts.innerHTML = `Attempts: ${attempts}`;

  //Decrementing the total attempts and showing the remaining attempts
  --total_attempts;
  remaining_attempts.innerHTML = `Remaining attempts: ${total_attempts}`;


  //Checking if the user input is equal to the random number
  if (user_input == random_number) {

    message.style.color = "green";
    message.innerHTML = "You guessed it right!🥳";

    best_attempts_text.innerHTML = `Best attempts: ${
      localStorage.getItem("best_attempts") ?? total_attempts
    }🎯`;

    //save best attempts in local storage
    if (!localStorage.getItem("best_attempts")) {
      localStorage.setItem("best_attempts", total_attempts);
    }

    //Push the correct guesses in the array
    correctGuesses.push(user_input);
    console.log("Correct Guesses: ", correctGuesses);

    //Makes restart block visible if user gets 2 correct guesses
    if (correctGuesses.length === 2) {
      disableNumBtns();
      document.getElementById("restartBlock").style.display = "block";
    }

  } else {
    message.innerHTML = "Try again!🤔";
    message.style.color = "red";
  }
}


//Restart the game after user gives all the right guessed number in a comma seperated values

//Reset button
function resetGame() {
  total_attempts = 50;
  remaining_attempts = total_attempts;
  attempts = 0;
  enableNumBtns();
  // best_attempts = 0;
  
  // Make correctGuesses empty
  correctGuesses = [];

  document.getElementById("restartBlock").style.display = "none";
  document.getElementById("message").removeAttribute("style");
  document.getElementById("message").innerHTML =
    "Start the game by guessing a number!";
  document.getElementById("my_attempts").innerHTML = `Attempts: ${attempts}`;
  document.getElementById(
    "remaining_attempts"
  ).innerHTML = `Remaining attempts: ${remaining_attempts}`;
  document.getElementById("best_attempts").innerHTML = `Best attempts: ${
    localStorage.getItem("best_attempts") ?? best_attempts
  }🎯`;
}

// document.getElementById('resetBtn').addEventListener('click', resetGame)

//Restart Logic
function restartGame() {

  if(document.getElementById('restartInput').value === ''){
    resetGame();
    return
  }

  if(localStorage.getItem('best_attempts') > total_attempts){
    resetGame();
    return;
  }

  let restart_input = document
    .getElementById("restartInput")
    .value.split(",")
    .map(Number);
  console.log("Correct Guesses: ", correctGuesses);
  console.log("Restart Input: ", restart_input);

  if (
    restart_input.length === correctGuesses.length &&
    restart_input.every((val, index) => val === correctGuesses[index])
  ) {
    console.log('best_attempts', best_attempts);
    console.log('total_attempts', total_attempts);

    if (localStorage.getItem("best_attempts") < total_attempts) {
      best_attempts = total_attempts;
      localStorage.setItem("best_attempts", best_attempts+1);
    } else {
      best_attempts = total_attempts + 1;
      localStorage.setItem("best_attempts", best_attempts);
    }

    document.getElementById(
      "best_attempts"
    ).innerHTML = `Best attempts: ${best_attempts}🎯`;

    resetGame();
    // alert('You have guessed all the correct numbers!🎉');
  } else {
    alert("You have not guessed the right numbers!🤔");
  }

  // let restart_input = document.getElementById('restartInput').value.split(',');
}


//Disabling all the number buttons
function disableNumBtns(){
  let numBtns = document.querySelectorAll('.numBtn');
  numBtns.forEach((btn)=> {
    btn.disabled = true;
  })
}

//Enabling all the number buttons
function enableNumBtns(){
  let numBtns = document.querySelectorAll('.numBtn');
  numBtns.forEach((btn)=> {
    btn.disabled = false;
  })
}


window.checkNumber = checkNumber;
window.resetGame = resetGame;
window.restartGame = restartGame;
