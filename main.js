//to do:
// - make it a playable link
// - ask user its emojis
// - create a homepage to start game

//board set up
player_x = "X"
player_o = "O"
x_emoji = "🤍"
o_emoji = "💜"

//attaching constant variables to items from html
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = player_x;
let board = ["", "", "", "", "", "", "", "", ""];
let running = true; //if the game is active. False if someone wins or its a draw

//list of winning conditions
const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

//Game Initizalization

function initGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked)); //when a cell is clicked, run cellClicked()
  restartBtn.addEventListener("click", restartGame); //if restartBtn is clicked, run restartGame()
}

function cellClicked() {
  const index = this.getAttribute("data-index"); //grabs data index(0-8) to know which cell was clicked

  if (board[index] !== "" || !running) return;
  //if the index clicked is already full, or the game isnt running, do nothing

  updateCell(this, index); //fill the cell with the emoji
  checkWinner(); //check if someone won yet
}

//updates board array to be taken
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer === player_x ? x_emoji : o_emoji;
  //check if currentPlayer === x, if x is True then put x emoji, otherwise put o emoji
}

function changePlayer() {
  currentPlayer = currentPlayer === player_x ? player_o : player_x;
  let currentEmoji = currentPlayer === player_x ? x_emoji : o_emoji;
  statusText.textContent = `Player ${currentEmoji}'s turn`;
}

function checkWinner() {
  let winnerFound = false;

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerFound = true;
      break;
    }
  }

  if (winnerFound) {
    let winnerEmoji = currentPlayer === player_x ? x_emoji : o_emoji;
    statusText.textContent = `🎉 Player ${winnerEmoji} Wins! 🎉`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = player_x;
  board = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.textContent = `Player ${x_emoji}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

initGame();