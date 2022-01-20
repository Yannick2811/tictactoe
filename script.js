const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  let squares = document.querySelector(".squares");
  board.forEach((item) => {
    const square = document.createElement("div");
    square.className = "square";
    squares.append(square);
  });
  Array.from(squares.children).forEach((square, i) => {
    square.addEventListener("click", () => {
      square.classList.add(game.activePlayer.marker);
      // square.setAttribute("data", game.activePlayer.marker);
      square.textContent = game.activePlayer.marker;
      // board[i] = game.activePlayer.marker;
      square.style.pointerEvents = "none";
      game.remainingSpots -= 1;
      game.checkWinner();
      if (game.winnerDeclared == false) {
        if (game.remainingSpots > 0) {
          game.alertNextPlayer();
          game.nextPlayer();
        } else if (game.remainingSpots == 0) {
          game.declareTie();
        }
      }
    });
  });
  return {
    board,
  };
})();

const game = (() => {
  const playerOne = createPlayer("Player 1", "X");
  const playerTwo = createPlayer("Player 2", "O");

  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  const winnerAnnouncement = document.querySelector(".winner-announcement");
  const playerCount = document.querySelector(".player-count");

  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    winningAxes.forEach((item, i) => {
      if (
        gameBoard.board[item[0]] === this.activePlayer.marker &&
        gameBoard.board[item[1]] === this.activePlayer.marker &&
        gameBoard.board[item[2]] === this.activePlayer.marker
      ) {
        winnerAnnouncement.textContent = `${this.activePlayer.name} wins!`;
        this.winnerDeclared = true;
      }
    });
  }

  function alertNextPlayer() {
    this.activePlayer === playerOne
      ? (playerCount.textContent = "Player 2")
      : (playerCount.textContent = "Player 1");
  }

  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  function declareTie() {
    winnerAnnouncement.textContent = "It's a tie!";
  }

  return {
    activePlayer,
    remainingSpots,
    checkWinner,
    alertNextPlayer,
    nextPlayer,
    declareTie,
    winnerDeclared,
  };
})();
