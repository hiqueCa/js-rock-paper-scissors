import { OUTCOME_RESULT_PROPS } from './constants.js';
import { 
  defineGameResult,
  computerPlay,
} from './helper-functions.js';
import scores from './scores-manager.js';
import domElements from './dom-elements-manipulator.js';

const playerPossibleSelections = document.querySelectorAll('button');

let resultDiv = document.createElement('div');
let scoresDiv = document.createElement('div');

function playGame(playerSelection, computerSelection = computerPlay()) {
  const gameResult = defineGameResult(playerSelection, computerSelection);

  scores.updateScores(gameResult);
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

function outputRoundResults(result, playerSelection, computerSelection) {
  updateResultDiv(result, playerSelection, computerSelection);
  adjustResultTextSize(25);
  domElements.gameResultsDiv.append(resultDiv)
};

function outputScores() {
  domElements.gameResultsDiv.append(updatedScoresDiv(scores.playerScore, scores.computerScore))
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

function tryAgain() {
  const tryAgainDiv = document.createElement('div');
  const tryAgainButton = document.createElement('button');

  tryAgainDiv.append(tryAgainButton);

  tryAgainButton.textContent = "Try Again";
  tryAgainDiv.className = "try-again-container";

  domElements.body.appendChild(tryAgainDiv);
  
  tryAgainButton.addEventListener('click', () => {
    domElements.body.removeChild(tryAgainDiv);
    domElements.gameResultsDiv.replaceChildren();
    domElements.enableGameButtons();
  });
};

playerPossibleSelections.forEach( selection => {
  selection.addEventListener('click', () => {
    let playerSelection = selection.textContent;

    playGame(playerSelection);

    if (scores.playerScore === 5) {
      domElements.disableGameButtons();
      scores.resetScores();
      congratsPlayerWin();
      tryAgain();
    }
    else if (scores.computerScore === 5) {
      domElements.disableGameButtons();
      scores.resetScores();
      warnPlayerLoss();
      tryAgain();
    };
  });
});
