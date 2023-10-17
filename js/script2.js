//Factory Function for players
function player(marker, name) {
  return { marker: marker, name: name };
}

//Gameboard interactivity
const gameBoard = (function () {
  const boxes = document.querySelectorAll(".box");
  const markBox = () => {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.addEventListener("click", () => {
        if (!checkForWinner.checkWinner()) {
          box.innerHTML = playGame.takeTurns();
          console.log(checkForWinner.checkWinner());
          playGame.addWins();
        }
      });
    }
  };
  return { boxes, markBox };
})();

//Setup and retrieve player information
const playerInfo = (function () {
  const div_X = document.querySelector(".div-left");
  const div_O = document.querySelector(".div-right");
  const btn_X = document.querySelector(".btn-left");
  const btn_O = document.querySelector(".btn-right");
  const playerID = document.querySelectorAll(".btn-p");
  const getP1Name = document.querySelector(".player1Name");
  const getP2Name = document.querySelector(".player2Name");

  let player1;
  let player2;
  const playerSetup = () => {
    if (btn_X.classList.contains("active")) {
      player1 = player("X", getP1Name.innerHTML);
      player2 = player("O", getP2Name.innerHTML);

      if (player1.name === "") {
        player1.name = "P1";
        getP1Name.innerHTML = player1.name;
      }
      if (player2.name === "") {
        player2.name = "P2";
        getP2Name.innerHTML = player2.name;
      }
      playerID[0].innerHTML = player1.name;
      playerID[1].innerHTML = player2.name;
    } else if (btn_O.classList.contains("active")) {
      player1 = player("O", getP1Name.innerHTML);
      player2 = player("X", getP2Name.innerHTML);

      if (player1.name === "") {
        player1.name = "P1";
        getP1Name.innerHTML = player1.name;
      }
      if (player2.name === "") {
        player2.name = "P2";
        getP2Name.innerHTML = player2.name;
      }
    }
    console.log(player1);
  };

  const p1ToggleMarker = () => {
    const playerID = document.querySelectorAll(".btn-p");
    btn_X.classList.toggle("active");
    div_X.classList.toggle("active");
    btn_O.classList.toggle("active");
    div_O.classList.toggle("active");
    if (playerID[0].innerHTML === player1.name) {
      playerID[1].innerHTML = player1.name;
      playerID[0].innerHTML = player2.name;
    } else {
      playerID[1].innerHTML = player2.name;
      playerID[0].innerHTML = player1.name;
    }
  };

  const getPlayer1 = () => {
    const name = player1.name;
    const marker = player1.marker;

    return { name, marker };
  };

  const getPlayer2 = () => {
    const name = player2.name;
    const marker = player2.marker;
    return { name, marker };
  };

  btn_O.addEventListener("click", () => {
    p1ToggleMarker();
    playerSetup();
    console.log(getPlayer2().marker);
  });
  btn_X.addEventListener("click", () => {
    p1ToggleMarker();
    playerSetup();
  });
  playerSetup();
  return { getPlayer1, getPlayer2 };
})();

//Play Game
const playGame = (function () {
  const activePlayer = document.querySelectorAll(".player");

  const takeTurns = () => {
    let currentPlayer;
    if (activePlayer[0].classList.contains("active")) {
      currentPlayer = playerInfo.getPlayer1().marker;
      turnIndicator();
      return currentPlayer;
    } else {
      currentPlayer = playerInfo.getPlayer2().marker;
      turnIndicator();
      return currentPlayer;
    }
  };

  //Used to indicate who's turn it is.
  const turnIndicator = () => {
    activePlayer[0].classList.toggle("active");
    activePlayer[1].classList.toggle("active");
  };

  const addWins = () => {
    const p1Wins = document.querySelector(".p1Wins");
    const p2Wins = document.querySelector(".p2Wins");
    if (checkForWinner.checkWinner() === playerInfo.getPlayer1().name) {
      let currentWins = Number(p1Wins.innerHTML);
      p1Wins.innerHTML = ++currentWins;
    } else if (checkForWinner.checkWinner() === playerInfo.getPlayer2().name) {
      let currentWins = Number(p2Wins.innerHTML);
      p2Wins.innerHTML = ++currentWins;
    }
  };

  return { takeTurns, addWins };
})();

//Check for winner.
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
        let winner;
        playerInfo.getPlayer1().marker === "X"
          ? (winner = playerInfo.getPlayer1().name)
          : (winner = playerInfo.getPlayer2().name);

        return winner;
      } else if (allO) {
        let winner;
        playerInfo.getPlayer1().marker === "O"
          ? (winner = playerInfo.getPlayer1().name)
          : (winner = playerInfo.getPlayer2().name);

        return winner;
      }
    }
  };

  return { checkWinner };
})();

//Reset Game
const resetGame = (function () {
  const btn_resetBoard = document.getElementById("resetBoard");
  //ClearBoard
  const resetBoard = () => {
    const boxes = gameBoard.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.innerHTML = "";
    }
  };
  btn_resetBoard.addEventListener("click", resetBoard);
})();

//Display Controller
const displayController = (function () {
  gameBoard.markBox();
})();
