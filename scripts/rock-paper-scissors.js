const CHOICES = ["rock", "paper", "scissors"];
const PLAYER_ID = 0;
const COMPUTER_ID = 1;

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
  let choiceIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[choiceIndex];
}

function playRound(playerSelection, computerSelection) {
  console.log(`${playerSelection} vs ${computerSelection}`);

  let winningPlayerId = -1;
  let flavorText = '';

  if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')) {
    winningPlayerId = PLAYER_ID;
    flavorText = `Player's ${playerSelection} beats computer's ${computerSelection}`;
  } else if ((computerSelection === 'rock' && playerSelection === 'scissors') ||
      (computerSelection === 'paper' && playerSelection === 'rock') ||
      (computerSelection === 'scissors' && playerSelection === 'paper')) {
    winningPlayerId = COMPUTER_ID;
    flavorText = `Computer's ${computerSelection} beats players's ${playerSelection}`;
  } else {
    flavorText = `${computerSelection} vs ${playerSelection}... nobody wins`;
  }

  scoreRound(winner);
  setRoundResult(flavorText);

  return winningPlayerId;
}

function scoreRound(winningPlayerId){
  if(winningPlayerId === PLAYER_ID){
    playerScore++;
  } else if(winningPlayerId === COMPUTER_ID){
    computerScore++;
  }

  updateScoreboard();

  if(playerScore === 5 || computerScore === 5) {
    gameOver(winningPlayerId);
  }
}

function createButtonEvents(){
  const choiceButtons = document.querySelectorAll(".playerChoice");

  choiceButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const playerChoice = e.target.id;
      const computerChoice = computerPlay();

      const winner = playRound(playerChoice, computerChoice);

    });
  });

  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', initializeGame);
}

function gameOver(winningPlayerId){
  if(winningPlayerId === PLAYER_ID){
    setGameResult("Player wins!");
  } else if(winningPlayerId === COMPUTER_ID) {
    setGameResult("Computer wins!");
  }

  toggleChoiceButtons(false);

  const resetButton = document.querySelector('#resetButton');
  resetButton.classList.toggle("hidden");
}

function initializeGame(){
  playerScore = 0;
  computerScore = 0;

  setRoundResult('Choose your weapon');
  updateScoreboard();
  setGameResult();
  toggleChoiceButtons(true);

  const resetButton = document.querySelector('#resetButton');
  resetButton.classList.toggle("hidden");
}

function setRoundResult(message){
  const resultDiv = document.getElementById("roundResult");
  resultDiv.textContent = message;
}

function updateScoreboard(){
  const scoreBoardDiv = document.getElementById("scoreboard");
  scoreBoardDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function setGameResult(message){
  const gameOverDiv = document.getElementById("gameWinner");

  if(message){
    gameOverDiv.textContent = message;
  } else {
    gameOverDiv.textContent = '';
  }
}

function toggleChoiceButtons(enable){
  const choiceButtons = document.querySelectorAll(".playerChoice");

  choiceButtons.forEach((button) => {
    if(enable){
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

createButtonEvents();

initializeGame();

