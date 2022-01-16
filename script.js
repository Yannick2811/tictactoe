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
  Array.from(squares.children).forEach((square) => {
    square.addEventListener("click", () => {
      const playerCount = document.querySelector(".player-count");
      if (playerCount.textContent === "Player 1") {
        square.textContent = "X";
        playerCount.textContent = "Player 2";
      } else {
        square.textContent = "O";
        playerCount.textContent = "Player 1";
      }
    });
  });
})();

const game = () => {
  const playerOne = createPlayer("Player 1", "X");
  const playerTwo = createPlayer("Player 2", "O");
};
