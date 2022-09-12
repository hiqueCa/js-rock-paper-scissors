class ScoresManager {
  constructor(playerScore = 0, computerScore = 0) {
    this.playerScore = playerScore;
    this.computerScore = computerScore;
  }

  updateScores(result) {
    if (result === 'Win') {
      this.playerScore += 1;
    }
    else if (result === 'Lose') {
      this.computerScore += 1;
    }
  }

  resetScores() {
    this.computerScore = 0;
    this.playerScore = 0;
  }
};

const scores = new ScoresManager();

export default scores;