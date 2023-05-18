const cells = document.getElementsByClassName("cell")
function eventListener(){
  for (let i = 0; i < cells.length; i++){
    cells[i].addEventListener("click", addXO);
  }

}
eventListener();

const board = document.getElementById("board");

let currentPlayer = "playerX";

const allWinningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let playerXGuess = [];
let playerOGuess = [];

document.getElementById("newGame").addEventListener("click", newGame);

// everytime a player clicks into the cell, a div is created for the player. This position 
// is then funneled to the global variable of either playerXGuess or playerOGuess
// players should not be able to reassign their "mark" inside the cell
// it should alternate between player X and player O, and display who's turn it is
function addXO(e){
  const addMark = document.createElement("div");
  addMark.classList.add(currentPlayer);
  e.target.append(addMark);
    if (currentPlayer === "playerX"){
      playerXGuess.push(Number(e.target.id));
      currentPlayer = "playerO";
      e.target.removeEventListener("click", addXO);
      document.getElementById("thisPlayersTurn").innerHTML = "Player O is up!";
    } else {
      playerOGuess.push(Number(e.target.id));
      currentPlayer = "playerX";
      e.target.removeEventListener("click", addXO);
      document.getElementById("thisPlayersTurn").innerHTML = "Player X is up!";
    }
    xOTallies()
}

// small helper funtion to see if the player has enough (3) X or O "marks" 
// to be checked against winning combonations
function xOTallies(){
  if (playerXGuess.length === 5){
    tieBreaker();
  } else if (playerXGuess.length <= 4){
    validateScore();
  } else if (playerOGuess.length <= 4){
    validateScore();
  } 
}

// helper function to validate X player's score
function validateScore(){
  for (const singleWinningCombo of allWinningCombos){
    let isValid = true;
    for (const individualWinningNumber of singleWinningCombo){
      if (!playerXGuess.includes(individualWinningNumber)){
        isValid = false;
      } 
    } 
    if (isValid === true){
      document.getElementById("thisPlayersTurn").innerHTML = "Player X WINS!";
      // create a new div inside html<div id="winningMessage"> 
      const winningMessageDiv = document.getElementById("winningDiv");
      const winnerMessageP = document.createElement("p");
      const newGameP = document.createElement("p");
      // add class of .winningMessageText so it will display styling from your css
      winnerMessageP.classList.add("winningMessageText");
      newGameP.classList.add("winningMessageText");
      winnerMessageP.innerHTML = "WINNER!";
      newGameP.innerHTML = "Select NEW GAME to play again";
      winningMessageDiv.append(winnerMessageP);
      winningMessageDiv.append(newGameP);
      board.style.backgroundImage = "url(Winner.jpg)";
      
    } 
    
  }
  for (const singleWinningCombo of allWinningCombos){
    let isValid = true;
    for (const individualWinningNumber of singleWinningCombo){
      if (!playerOGuess.includes(individualWinningNumber)){
        isValid = false;
      }
    } 
    if (isValid === true){
      document.getElementById("thisPlayersTurn").innerHTML = "Player O WINS!";
      // create a new div inside html<div id="winningMessage"> 
      const winningMessageDiv = document.getElementById("winningDiv");
      const winnerMessageP = document.createElement("p");
      const newGameP = document.createElement("p");
      // add class of .winningMessageText so it will display styling from your css
      winnerMessageP.classList.add("winningMessageText");
      newGameP.classList.add("winningMessageText");
      winnerMessageP.innerHTML = "WINNER!";
      newGameP.innerHTML = "Select NEW GAME to play again";
      winningMessageDiv.append(winnerMessageP);
      winningMessageDiv.append(newGameP);
      board.style.backgroundImage = "url(Winner.jpg)";
    }
    
  }
}

function tieBreaker(){
  for (const singleWinningCombo of allWinningCombos){
    let isValid = true;
    for (const individualWinningNumber of singleWinningCombo){
      if (!playerXGuess.includes(individualWinningNumber)){
        isValid = false;
        }
      }
      if (isValid === true){
        validateScore();
        return;
      } else if (isValid !== true){
        document.getElementById("thisPlayersTurn").innerHTML = "It's a DRAW! Click the New Game button!";
        board.style.backgroundColor = "grey";
      }
  }
}

function newGame(){
  let playerMadeDivs = document.querySelectorAll("div.playerX, div.playerO");
  document.getElementById("thisPlayersTurn").innerHTML = "Player X BEGIN!";
  console.log(playerMadeDivs);
  const winningMessageDiv = document.getElementById("winningDiv");
  const winnerMessageP = document.getElementsByClassName("winningMessageText");
  winningMessageDiv.remove(winnerMessageP);
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML= '';
  }
  playerXGuess = [];
  playerOGuess = [];
  eventListener();
  board.style.backgroundColor = "rgba(0, 0, 0, 0.747)";
  currentPlayer = "playerX";
}
