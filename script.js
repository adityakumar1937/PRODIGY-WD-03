const gameBoard = document.getElementById("game-board");
const resultDisplay = document.getElementById("game-info");
const restartButton = document.getElementById("restart-button");
const cellBoard = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
resultDisplay.textContent = "Circle goes first.";

// Function to create the game board and add event listeners
function createBoard() {
  cellBoard.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

// Initial creation of the game board
createBoard();

// Function to handle a player's move
function addGo(e) {
  const cellIndex = e.target.id;
  if (cellBoard[cellIndex] === "") {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);

    cellBoard[cellIndex] = go;
    go = go === "circle" ? "cross" : "circle";
    resultDisplay.textContent = "It is now " + go + "'s turn";

    e.target.removeEventListener("click", addGo);

    // Check for a winner after each move
    const winner = checkScore();
    if (winner) {
      showRestartButton();
    }
  }
}

// Function to check for a win
function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winingChance = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const array of winingChance) {
    const circleWins = array.every((cell) => cellBoard[cell] === "circle");
    if (circleWins) {
      resultDisplay.textContent = "Circle Wins!";
      removeEventListeners(allSquares);
      return "circle";
    }

    const crossWins = array.every((cell) => cellBoard[cell] === "cross");
    if (crossWins) {
      resultDisplay.textContent = "Cross Wins!";
      removeEventListeners(allSquares);
      return "cross";
    }
  }

   // Check for a tie
   if (cellBoard.every((cell) => cell !== "")) {
    resultDisplay.textContent = "It's a tie!";
    showRestartButton();
    return "tie";
  }

  return null;
}

// Function to remove event listeners from squares
function removeEventListeners(squares) {
  squares.forEach((square) => {
    square.removeEventListener("click", addGo);
  });
}

// Function to show the restart button
function showRestartButton() {
  restartButton.style.display = "block";
}

// Function to hide the restart button
function hideRestartButton() {
  restartButton.style.display = "none";
}

// Add an event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Function to restart the game
function restartGame() {
  cellBoard.fill(""); // Reset the game board array
  resultDisplay.textContent = "Circle goes first.";
  gameBoard.innerHTML = ""; // Clear the game board elements
  hideRestartButton(); // Hide the restart button
  createBoard(); // Create a new game board with event listeners
}
