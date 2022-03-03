function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  let pseudoRandomNumber = Math.random();

  return Math.floor(pseudoRandomNumber * (max - min)) + min;
};

function computerPlay(){
  let possiblePlays = ['rock', 'paper', 'scissors']
  let playIndex = getRandomIntegerInclusive(0, 2)
  return possiblePlays[playIndex]
};

function playRound(playerSelection, computerSelection=computerPlay()) {
  let outputPlayerSelection = formatOutputString(playerSelection);
  let outputComputerSelection = formatOutputString(computerSelection);
  let result = checkForGameResult(playerSelection, computerSelection);

  return outputGameResults(result, outputPlayerSelection, outputComputerSelection);
};

function checkForGameResult(playerSelection, computerSelection) {
  let result = 'Win'
  let caseInsensitivePlayerSelection = playerSelection.toLowerCase();

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

function outputGameResults(result, playerSelection, computerSelection) {
  if (result == 'Win') {
    return `You ${result}! ${playerSelection} beats ${computerSelection}`
  } else if (result == 'Lose') {
    return `You ${result}! ${computerSelection} beats ${playerSelection}`
  } else {
    return `A ${result}! ${playerSelection} equals ${computerSelection}`
  }
}

function formatOutputString(string) {
  let firstChar = string[0];
  let otherChars = string.slice(1).toLowerCase();

  return firstChar.toUpperCase() + otherChars;
};

function playGame() {
  for (let i = 0; i < 5; i++) {
    let playerSelection = prompt('Choose your play!');
    if (playerSelection) {
      console.log(playRound(playerSelection));
    } else {
      console.log("Please, select a valid play!");
      break;
    };
  };
};

playGame()