const CHOICES = ["rock", "paper", "scissors"];
const PLAYER_ID = 0;
const COMPUTER_ID = 1;

function computerPlay() {
  let choiceIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[choiceIndex];
}

function humanPlay() {
  let keepGoing = true;
  let userInput;

  while (keepGoing) {
    userInput = prompt("Rock, paper, or scissors?");

    if (userInput) {
      userInput = userInput.toLowerCase();
      
      if (isValidChoice(userInput)) {
        keepGoing = false;
      } else {
        console.log("Invalid choice, trying again");
      }
    } else {
      console.log("No choice made, trying again");
    }
  }

  return userInput;
}

function isValidChoice (choice) {
  return CHOICES.indexOf(choice) > -1;
}

function playRound(playerSelection, computerSelection) {
  console.log(`${playerSelection} vs ${computerSelection}`);

  let winningPlayerId = -1;

  if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')) {
    winningPlayerId = PLAYER_ID;
    console.log(`Player's ${playerSelection} beats computer's ${computerSelection}`);
  } else if ((computerSelection === 'rock' && playerSelection === 'scissors') ||
      (computerSelection === 'paper' && playerSelection === 'rock') ||
      (computerSelection === 'scissors' && playerSelection === 'paper')) {
    winningPlayerId = COMPUTER_ID;
    console.log(`Computer's ${computerSelection} beats players's ${playerSelection}`);
  } else {
    console.log(`${computerSelection} vs ${playerSelection}... nobody wins`);
  }

  return winningPlayerId;
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for(let i = 0; i < 5; i++) {
    let playerSelection = humanPlay();
    let computerSelection = computerPlay();
  
    let winningPlayerId = playRound(playerSelection, computerSelection);

    if (winningPlayerId === PLAYER_ID) {
      playerScore++;
    } else if (winningPlayerId === COMPUTER_ID) {
      computerScore++;
    }

    console.log(`Player: ${playerScore} - Computer: ${computerScore}`);
  }

  if(playerScore > computerScore) {
    console.log("Player wins!");
  } else if(computerScore > playerScore) {
    console.log("Computer wins!");
  } else {
    console.log("Oh no... it was tie :(");
  }
}

game();

