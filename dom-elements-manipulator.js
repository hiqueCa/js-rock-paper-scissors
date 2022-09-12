class DomElementsManipulator {
  constructor(htmlDomElements = {
    gameButtons: null,
    body: null,
    gameResultsDiv: null,
  }) {
    this.gameButtons = htmlDomElements.gameButtons;
    this.body = htmlDomElements.body;
    this.gameResultsDiv = htmlDomElements.gameResultsDiv;
  }

  disableGameButtons() {
    for (let button of this.gameButtons) {
      button.disabled = true;
    };
  }

  enableGameButtons() {
    for (let button of this.gameButtons) {
      button.disabled = false;
    };
  }

  appendToGameResultsDiv(element) {
    this.gameResultsDiv.append(element);
  }
};

const domElements = new DomElementsManipulator(
  {
    gameButtons: document.querySelector('div.game-buttons').children,
    body: document.querySelector('body'),
    gameResultsDiv: document.querySelector('div.game-results'),
  }
);

export default domElements;