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
        checkForWinner.checkWinner();
      });
    }
  };
  return { boxes, markBox };
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

const checkForWinner = (function () {
  const checkWinner = () => {
    const [box1, box2, box3, box4, box5, box6, box7, box8, box9] =
      gameBoard.boxes;
    const winBoxes = [
      [box1, box2, box3],
      [box4, box5, box6],
      [box7, box8, box9],
      [box1, box4, box7],
      [box2, box5, box8],
      [box3, box6, box9],
      [box1, box5, box9],
      [box3, box5, box7],
    ];
    for (let i = 0; i < winBoxes.length; i++) {
      const winArray = winBoxes[i];
      const allX = winArray.every((value) => value.innerHTML === "X");
      const allO = winArray.every((value) => value.innerHTML === "O");
      if (allX) {
        console.log("Player 1 Wins!");
      }
      if (allO) {
        console.log("Player 2 Wins!");
      }
    }
  };
  return { checkWinner };
})();

const resetGame = (function () {
  const btn_resetBoard = document.getElementById("resetBoard");
  const resetBoard = () => {
    const boxes = gameBoard.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.innerHTML = "";
    }
    btn_resetBoard.addEventListener("click", resetBoard);
  };
  resetBoard();
})();

const displayController = (function () {
  gameBoard.markBox();
})();
