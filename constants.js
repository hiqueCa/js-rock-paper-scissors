export const POSSIBLE_COMPUTER_PLAYS = [
  'Rock',
  'Paper',
  'Scissors',
];

export const OUTCOME_RESULT_PROPS = {
  'Win': {
    color: 'green',
    textContent: function(playerSelection, computerSelection) {
      return `You win! ${playerSelection} beats ${computerSelection}`;
    },
  },
  'Lose': {
    color: 'darkred',
    textContent: function(playerSelection, computerSelection) {
      return `You lose! ${computerSelection} beats ${playerSelection}`;
    },
  },
  'Draw': {
    color: 'orange',
    textContent: function(playerSelection, computerSelection) {
      return `A draw! ${playerSelection} equals ${computerSelection}`;
    },
  },
};