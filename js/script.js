//Factory Function for players
function player(marker, name) {
  return { marker: marker, name: name };
}

//Gameboard interactivity
const gameBoard = (function () {
  const boxes = document.querySelectorAll(".box");
  const draw = () => {
    const arr = [];
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (box.innerHTML === "") {
        arr.push(box);
      }
    }
    if (arr.length === 0) {
      console.log("Draw");
      return true;
    }
  };
  return { boxes, draw };
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

  const playerSetup = (p1Name, p2Name) => {
    if (btn_X.classList.contains("active")) {
      player1 = player("X", p1Name);
      player2 = player("O", p2Name);
      // console.log(startup_modal.addNames().player1Val);
      if (p1Name === "") {
        player1.name = "P1";
        getP1Name.innerHTML = player1.name;
      } else {
        getP1Name.innerHTML = player1.name;
      }
      if (p2Name === "") {
        player2.name = "P2";
        getP2Name.innerHTML = player2.name;
      } else {
        getP2Name.innerHTML = player2.name;
      }
      playerID[0].innerHTML = player1.name;
      playerID[1].innerHTML = player2.name;
    } else if (btn_O.classList.contains("active")) {
      player1 = player("O", getP1Name.innerHTML);
      player2 = player("X", getP2Name.innerHTML);

      if (p1Name === "") {
        player1.name = "P1";
        getP1Name.innerHTML = p1Name;
      } else {
        getP1Name.innerHTML = player1.name;
      }
      if (p2Name === "") {
        player2.name = "P2";
        getP2Name.innerHTML = p2Name;
      } else {
        getP2Name.innerHTML = player2.name;
      }
    }
    console.log(player1);
    console.log(player2);
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
    playerSetup(player1.name, player2.name);
    console.log(getPlayer2().marker);
  });
  btn_X.addEventListener("click", () => {
    p1ToggleMarker();
    playerSetup(player1.name, player2.name);
  });
  // playerSetup();
  return { getPlayer1, getPlayer2, playerSetup };
})();

//Play Game
const playGame = (function () {
  const activePlayer = document.querySelectorAll(".player");
  const btn_whosFirst = document.querySelector(".whosFirst");

  const takeTurns = () => {
    let currentPlayer;

    if (activePlayer[0].classList.contains("active")) {
      currentPlayer = playerInfo.getPlayer1().marker;
      // ai.test();
      turnIndicator();
      // return currentPlayer;
    } else {
      currentPlayer = playerInfo.getPlayer2().marker;
      // ai.test();
      turnIndicator();

      // return currentPlayer;
    }
    return currentPlayer;
  };
  //Used to indicate who's turn it is.
  const turnIndicator = () => {
    activePlayer[0].classList.toggle("active");
    activePlayer[1].classList.toggle("active");
  };

  const whoGoesFirst = () => {
    displayController.resetBoard();
    const flipCoin = document.getElementById("flipCoin");
    flipCoin.classList.add("rotate");
    setTimeout(() => {
      flipCoin.classList.remove("rotate");
    }, 1500);
    const player1 = activePlayer[0];
    const player2 = activePlayer[1];
    const playerArray = [player1, player2];
    let randomPlayer =
      playerArray[Math.floor(Math.random() * playerArray.length)];

    if (randomPlayer.classList.contains("active")) {
    } else if (!checkForWinner.checkWinner()) {
      takeTurns();
      if (activePlayer[1].classList.contains("active")) {
        ai.test();
      }
    }
  };

  btn_whosFirst.addEventListener("click", whoGoesFirst);
  return { takeTurns, activePlayer };
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

const startup_modal = (function () {
  /**@type {HTMLElement} */
  const modal = document.querySelector(".modal");
  const firstQuestion = document.querySelector(".first");
  const onePlayer_modal = document.querySelector(".onePlayer");
  const twoPlayer_modal = document.querySelector(".twoPlayers");
  const btn_onePlayer = document.getElementById("btn_onePlayer");
  const btn_twoPlayer = document.getElementById("btn_twoPlayer");
  const slt_difficulty = document.getElementById("difficulty");
  //P1 Name
  const input_player1 = document.querySelectorAll(".player1");
  const input_player2 = document.querySelector(".player2");
  const btn_submit = document.getElementById("submit");
  const btn_skip = document.getElementById("skip");
  //P2 Avatar
  const p2Avatar = document.getElementById("p2Avatar");

  const hideFQ = () => {
    // modal.style.visibility = "hidden";
    firstQuestion.style.visibility = "hidden";
    onePlayer_modal.style.visibility = "hidden";
  };

  const one_Player = () => {
    hideFQ();
    onePlayer_modal.style.visibility = "visible";
  };

  const two_Players = () => {
    const twoClicked = true;
    hideFQ();
    twoPlayer_modal.style.visibility = "visible";
    return { twoClicked };
  };

  const difficulty = () => {
    const p1 = input_player1[0].value;
    onePlayer_modal.style.visibility = "hidden";
    modal.style.visibility = "hidden";
    playerInfo.playerSetup(p1, "A.I.");
    displayController.markBox();
  };

  const addNames = () => {
    const p1 = input_player1[1].value;
    const p2 = input_player2.value;
    twoPlayer_modal.style.visibility = "hidden";
    modal.style.visibility = "hidden";
    p2Avatar.setAttribute("src", "../images/player2.png");
    playerInfo.playerSetup(p1, p2);
    displayController.markBox();
  };

  const skip = () => {
    if (two_Players().twoClicked) {
      twoPlayer_modal.style.visibility = "hidden";
      modal.style.visibility = "hidden";
      addNames();
    }
  };

  btn_onePlayer.addEventListener("click", one_Player);
  btn_twoPlayer.addEventListener("click", two_Players);
  slt_difficulty.addEventListener("change", difficulty);
  btn_submit.addEventListener("click", addNames);
  btn_skip.addEventListener("click", skip);
  return { addNames };
})();

const ai = (function () {
  // playerArray[Math.floor(Math.random() * playerArray.length)];

  const test = () => {
    const openBox = [];
    let aimarker;
    if (playerInfo.getPlayer2().name === "A.I.") {
      for (let i = 0; i < gameBoard.boxes.length; i++) {
        const box = gameBoard.boxes[i];
        if (box.innerHTML === "") {
          console.log(box.innerHTML);
          openBox.push(box.id);
        }
      }

      if (checkForWinner.checkWinner() === undefined) {
        aimarker = openBox[Math.floor(Math.random() * openBox.length)];
        console.log(openBox);
        console.log(aimarker);
        console.log(gameBoard.draw());
        let test2 = document.getElementById(aimarker);
        const click_event = new CustomEvent("click", { once: true });
        console.log(test2);
        test2.dispatchEvent(click_event);
        // test2.innerHTML = playGame.takeTurns();
        // console.log(checkForWinner.checkWinner());
        // displayController.addWins();
        // if (checkForWinner.checkWinner() === undefined) {
        //   gameBoard.draw();
        // }
      }
      // playGame.takeTurns();
    }
  };

  return { test };
})();

//Display Controller
const displayController = (function () {
  const btn_resetBoard = document.querySelector(".clearBoard");
  const btn_resetGame = document.querySelector(".resetGame");
  const p1Wins = document.querySelector(".p1Wins");
  const p2Wins = document.querySelector(".p2Wins");

  const markBox = () => {
    for (let i = 0; i < gameBoard.boxes.length; i++) {
      const box = gameBoard.boxes[i];
      const multiplayer = () => {
        if (
          checkForWinner.checkWinner() === undefined &&
          box.innerHTML === ""
        ) {
          box.innerHTML = playGame.takeTurns();
          if (playGame.activePlayer[1].classList.contains("active")) {
            setTimeout(() => {
              ai.test();
            }, 800);
          }
          console.log(checkForWinner.checkWinner());
          addWins();

          if (checkForWinner.checkWinner() === undefined) {
            gameBoard.draw();
          }
        } else {
          console.log(checkForWinner.checkWinner());
        }
      };
      box.addEventListener("click", multiplayer);
    }
  };
  const addWins = () => {
    if (checkForWinner.checkWinner() === playerInfo.getPlayer1().name) {
      let currentWins = Number(p1Wins.innerHTML);
      p1Wins.innerHTML = ++currentWins;
    } else if (checkForWinner.checkWinner() === playerInfo.getPlayer2().name) {
      let currentWins = Number(p2Wins.innerHTML);
      p2Wins.innerHTML = ++currentWins;
    }
  };

  //Clears player markers on board
  const resetBoard = () => {
    const boxes = gameBoard.boxes;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      box.innerHTML = "";
    }
    console.log(playGame.activePlayer[0].classList.contains("active"));
    if (playGame.activePlayer[0].classList.contains("active")) {
    } else {
      ai.test();
    }
  };
  const resetWins = () => {
    p1Wins.innerHTML = 0;
    p2Wins.innerHTML = 0;
  };
  btn_resetGame.addEventListener("click", resetWins);
  btn_resetBoard.addEventListener("click", resetBoard);
  // markBox();
  return { markBox, addWins, resetBoard };
  // startup_modal.hidden();
})();
