import { POSSIBLE_COMPUTER_PLAYS } from "./constants.js";

export function defineGameResult(playerSelection, computerSelection) {
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

export function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  const pseudoRandomNumber = Math.random();

  return Math.floor(pseudoRandomNumber * (max - min)) + min;
};

export function computerPlay(){
  const playIndex = getRandomIntegerInclusive(0, 2);
  return POSSIBLE_COMPUTER_PLAYS[playIndex];
};