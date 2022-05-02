const POSSIBLE_COMPUTER_PLAYS = [
  'rock',
  'paper',
  'scissors',
];

const playerPossibleSelections = document.querySelectorAll('button');
const body = document.querySelector('body');
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
  const caseInsensitivePlayerSelection = playerSelection.toLowerCase();

  if (caseInsensitivePlayerSelection === 'rock' && computerSelection === 'paper') {
    result = 'Lose';
  } else if (caseInsensitivePlayerSelection === 'paper' && computerSelection === 'scissors') {
    result = 'Lose';
  } else if (caseInsensitivePlayerSelection === 'scissors' && computerSelection === 'rock') {
    result = 'Lose';
  } else if (caseInsensitivePlayerSelection == computerSelection) {
    result = 'Draw';
  }

  return result;
};

function outputRoundResults(result, playerSelection, computerSelection) {
  if (result == 'Win') {
    resultDiv.textContent =`You ${result}! ${playerSelection} beats ${computerSelection}`;
  } else if (result == 'Lose') {
    resultDiv.textContent = `You ${result}! ${computerSelection} beats ${playerSelection}`;
  } else {
    resultDiv.textContent = `A ${result}! ${playerSelection} equals ${computerSelection}`;
  };

  body.append(resultDiv)
};

function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  const pseudoRandomNumber = Math.random();

  return Math.floor(pseudoRandomNumber * (max - min)) + min;
};

function outputScores() {
  body.append(updatedScoresDiv(playerScore, computerScore))
};

function updatedScoresDiv(playerScore, computerScore) {
  scoresDiv.textContent = `${playerScore} - ${computerScore}`
  return scoresDiv
}

playerPossibleSelections.forEach( selection => {
  selection.addEventListener('click', () => {
    let playerSelection = selection.textContent;

    playGame(playerSelection);

    if (playerScore === 5) {
      playerScore = 0
      computerScore = 0
      scoresDiv.textContent = 'You have beaten the PC. Congratulations'
    }
    else if (computerScore === 5) {
      playerScore = 0
      computerScore = 0
      scoresDiv.textContent = 'You have been beaten. Try again.'
    };
  });
});
