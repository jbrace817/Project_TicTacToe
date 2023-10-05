function player(marker) {
  return marker;
}

const gameBoard = (function () {
  const boxes = document.querySelectorAll(".box");
  const markBox = () => {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.addEventListener("click", (e) => {
        box.innerHTML = playerTurns.switchPlayer();
      });
    }
  };
  const resetBoard = () => {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.innerHTML = "";
    }
  };

  //   const [...test] = boxes;

  return { markBox, resetBoard };
})();

const playerTurns = (function () {
  const player1 = player("X");
  const player2 = player("O");
  let currentPlayer = player2;
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      return currentPlayer;
    } else {
      currentPlayer = player1;
      return currentPlayer;
    }
  };
  return { switchPlayer };
})();

const checkWinner = (function () {})();

const displayController = (function () {
  gameBoard.markBox();
  //   gameBoard.resetBoard();
  //   console.log(gameBoard.test);
})();
