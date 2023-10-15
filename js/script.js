function player(marker) {
  return { marker: marker };
}

const gameBoard = (function () {
  const boxes = document.querySelectorAll(".box");
  const markBox = () => {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.addEventListener("click", () => {
        if (!checkForWinner.checkWinner()) {
          box.innerHTML = playerTurns.switchPlayers();
          console.log(checkForWinner.checkWinner());
        }
      });
    }
  };

  return { boxes, markBox };
})();

const playerTurns = (function () {
  const div_X = document.querySelector(".div-left");
  const div_O = document.querySelector(".div-right");
  const btn_X = document.querySelector(".btn-left");
  const btn_O = document.querySelector(".btn-right");

  // let player1 = player("X");
  let player1 = "";
  let player2 = "";
  let currentPlayer = player2;

  btn_O.addEventListener("click", () => {
    p1ToggleMarker();
    whoIsPlayer1();
  });
  btn_X.addEventListener("click", () => {
    p1ToggleMarker();
    whoIsPlayer1();
  });

  const whoIsPlayer1 = () => {
    const x = player(btn_X.firstElementChild.innerHTML);
    const o = player(btn_O.firstElementChild.innerHTML);
    const playerID = document.querySelectorAll(".btn-p");
    if (btn_X.classList.contains("active")) {
      player1 = x.marker;
      player2 = o.marker;
      playerID[0].innerHTML = "P1";
      playerID[1].innerHTML = "P2";
    } else {
      player1 = o.marker;
      player2 = x.marker;
      playerID[1].innerHTML = "P1";
      playerID[0].innerHTML = "P2";
    }
    console.log(`player1: ${player1}`);
  };

  const getPlayer1 = () => {
    return player1;
  };

  const p1ToggleMarker = () => {
    btn_X.classList.toggle("active");
    div_X.classList.toggle("active");
    btn_O.classList.toggle("active");
    div_O.classList.toggle("active");
  };

  //Active Player Indicator
  const playerIndicator = () => {
    const indicator = document.querySelectorAll(".player");
    indicator[0].classList.toggle("active");
    indicator[1].classList.toggle("active");
  };

  const switchPlayers = () => {
    whoIsPlayer1();
    if (currentPlayer === player1) {
      currentPlayer = player2;
      playerIndicator();
      return currentPlayer;
    } else {
      currentPlayer = player1;
      playerIndicator();
      return currentPlayer;
    }
  };

  return { switchPlayers, getPlayer1 };
})();

const checkForWinner = (function () {
  const checkWinner = () => {
    winner = false;
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

      if (playerTurns.getPlayer1() === "X") {
        if (allX) {
          console.log("Player 1 Wins!");
          return true;
        }
        if (allO) {
          console.log("Player 2 Wins");
          return true;
        }
      }
      if (playerTurns.getPlayer1() === "O") {
        if (allO) {
          console.log("Player 1 Wins!");
          return true;
        }
        if (allX) {
          console.log("Player 2 Wins");
          return true;
        }
      }
    }
    // console.log(playerTurns.getPlayer1());
    return false;
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
