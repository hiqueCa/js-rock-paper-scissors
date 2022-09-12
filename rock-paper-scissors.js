import {
  POSSIBLE_COMPUTER_PLAYS,
  OUTCOME_RESULT_PROPS,
} from './constants.js';

const playerPossibleSelections = document.querySelectorAll('button');
const body = document.querySelector('body')
const gameResultsDiv = document.querySelector('div.game-results')
const gameButtons = document.querySelector('div.game-buttons').children;

let resultDiv = document.createElement('div');
let scoresDiv = document.createElement('div');
let playerScore = 0;
let computerScore = 0;

function playGame(playerSelection, computerSelection = computerPlay()) {
  const gameResult = checkForGameResult(playerSelection, computerSelection);

  updateScores(gameResult);
  outputRoundResults(gameResult, playerSelection, computerSelection);
  outputScores()
};

function adjustResultTextSize(size) {
  resultDiv.style.fontSize = `${size}px`
};

function updateResultDiv(outcome, playerSelection, computerSelection) {
  const { color, textContent } = OUTCOME_RESULT_PROPS[outcome];

  resultDiv.style.color = color;
  resultDiv.textContent = textContent(playerSelection, computerSelection);
};

function updateScores(result) {
  if (result === 'Win') {
    playerScore += 1;
  }
  else if (result === 'Lose') {
    computerScore += 1;
  };
};

function computerPlay(){
  const playIndex = getRandomIntegerInclusive(0, 2);
  return POSSIBLE_COMPUTER_PLAYS[playIndex];
};

function checkForGameResult(playerSelection, computerSelection) {
  let result = 'Win'

  if (playerSelection === 'Rock' && computerSelection === 'Paper') {
    result = 'Lose';
  } else if (playerSelection === 'Paper' && computerSelection === 'Scissors') {
    result = 'Lose';
  } else if (playerSelection === 'Scissors' && computerSelection === 'Rock') {
    result = 'Lose';
  } else if (playerSelection === computerSelection) {
    result = 'Draw';
  }

  return result;
};

function outputRoundResults(result, playerSelection, computerSelection) {
  updateResultDiv(result, playerSelection, computerSelection);
  adjustResultTextSize(25);
  gameResultsDiv.append(resultDiv)
};

function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  const pseudoRandomNumber = Math.random();

  return Math.floor(pseudoRandomNumber * (max - min)) + min;
};

function outputScores() {
  gameResultsDiv.append(updatedScoresDiv(playerScore, computerScore))
};

function updatedScoresDiv(playerScore, computerScore) {
  scoresDiv.textContent = `${playerScore} - ${computerScore}`
  return scoresDiv
};

function congratsPlayerWin() {
  scoresDiv.textContent = 'You have beaten the PC. Congratulations';
};

function warnPlayerLoss() {
  scoresDiv.textContent = 'You have been beaten. Try again.';
};

function resetScores() {
  playerScore = 0;
  computerScore = 0;

  return playerScore, computerScore;
};

function tryAgain() {
  const tryAgainDiv = document.createElement('div');
  const tryAgainButton = document.createElement('button');

  tryAgainDiv.append(tryAgainButton);

  tryAgainButton.textContent = "Try Again";
  tryAgainDiv.className = "try-again-button";

  body.appendChild(tryAgainDiv);
  
  tryAgainButton.addEventListener('click', () => {
    body.removeChild(tryAgainDiv);
    gameResultsDiv.replaceChildren();
    enableGameButtons();
  });
};

function disableGameButtons() {
  for (let button of gameButtons) {
    button.disabled = true;
  };
};

function enableGameButtons() {
  for (let button of gameButtons) {
    button.disabled = false;
  };
};

playerPossibleSelections.forEach( selection => {
  selection.addEventListener('click', () => {
    let playerSelection = selection.textContent;

    playGame(playerSelection);

    if (playerScore === 5) {
      disableGameButtons();
      resetScores();
      congratsPlayerWin();
      tryAgain();
    }
    else if (computerScore === 5) {
      disableGameButtons();
      resetScores();
      warnPlayerLoss();
      tryAgain();
    };
  });
});
