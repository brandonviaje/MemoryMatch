// Memory Match — memory_match.js

// dom objects
const board = document.getElementById("board");
const statusMoves = document.getElementById("moves");
const statusMatches = document.getElementById("matches");
const statusTime = document.getElementById("time");
const message = document.getElementById("message");
const resetBtn = document.getElementById("btn-reset");
const newGameBtn = document.getElementById("btn-new-game");
const difficultyDropdown = document.getElementById("difficulty");

const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍑","🥥","🍓","🍋","🍈","🍊","🥭","🍏","🍐","🍅","🥑",];

let flippedCards = [];
let moves = 0;
let matches = 0;
let timer = 0;
let timerInterval;
let lockBoard = false;
let currentBoard = [];
let currentRows = 4;
let currentCols = 4;

// shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// show card face
function showCard(card) {
  card.innerHTML = `<div class="face">${card.dataset.face}</div>`;
  card.dataset.flipped = "true";
}

// hide card face
function hideCard(card) {
  card.innerHTML = `<div class="back">❓</div>`;
  card.dataset.flipped = "false";
  card.classList.remove("wrong");
}

// card flip 
function flipCard(e) {
  if (lockBoard) return;
  const card = e.currentTarget;

  // prevent clicking already flipped or matched cards
  if (card.dataset.flipped === "true" || card.classList.contains("matched"))
    return;

  showCard(card);
  flippedCards.push(card);
  // if user flipped 2 cards, lock board, update move and check for match
  if (flippedCards.length === 2) {
    lockBoard = true;
    moves++;
    statusMoves.textContent = moves;
    checkMatch();
  }
}

// check if cards are matching
function checkMatch() {
  const [card1, card2] = flippedCards;

  // check if face of cards match
  if (card1.dataset.face === card2.dataset.face) {
    // mark both cards as permanently matched
    card1.classList.add("matched");
    card2.classList.add("matched");

    // increment matches counter and update display
    matches++;
    statusMatches.textContent = matches;

    resetFlip(); // reset the flippedCards array and unlock the board

    // if all pairs are matched, end the game
    if (matches === currentBoard.length / 2) endGame();
  } else {
    // cards dont match: highlight them as wrong
    card1.classList.add("wrong");
    card2.classList.add("wrong");

    // hide cards again and reset flippedCards
    setTimeout(() => {
      hideCard(card1);
      hideCard(card2);
      resetFlip();
    }, 1000);
  }
}

function resetFlip() {
  flippedCards = [];
  lockBoard = false;
}

// start timer
function startTimer() {
  clearInterval(timerInterval); // clear timer

  timer = 0;
  statusTime.textContent = timer;

  // increment timer
  timerInterval = setInterval(() => {
    timer++;
    statusTime.textContent = timer;
  }, 1000);
}

// reset moves/matches/message
function resetStatus() {
  moves = 0;
  matches = 0;
  statusMoves.textContent = moves;
  statusMatches.textContent = matches;
  message.textContent = "";
}

// game end
function endGame() {
  clearInterval(timerInterval); // clear timer

  // show message
  message.textContent = `You won! ${moves} moves, ${timer} seconds.`;
  message.classList.add("winner");
  message.style.display = "block";
}

// create card element
function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.face = emoji;
  card.dataset.flipped = "false";
  card.innerHTML = `<div class="back">❓</div>`;
  card.addEventListener("click", flipCard);
  return card;
}

// prepare board for play (reset status and timer)
function prepareBoardForPlay() {
  flippedCards = [];
  lockBoard = false;
  message.style.display = "none";
  resetStatus();
  startTimer();
}

// build dynamic board (4x4 or 6x6)
function buildBoardDynamic(rows, cols) {
  board.innerHTML = "";
  currentRows = rows;
  currentCols = cols;
  board.style.setProperty("--rows", rows); // CSS height calculation

  const totalPairs = (rows * cols) / 2;

  // update DOM
  const totalPairsSpan = document.getElementById("total-pairs");
  if (totalPairsSpan) totalPairsSpan.textContent = totalPairs;

  let selectedEmojis = emojis.slice(0, totalPairs);
  let cardsArray = shuffle([...selectedEmojis, ...selectedEmojis]); // shuffle cards
  currentBoard = cardsArray.slice();

  cardsArray.forEach((emoji) => board.appendChild(createCard(emoji)));
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  prepareBoardForPlay();
}

// Event Listeners

// exec on page load
document.addEventListener("DOMContentLoaded", () => {
  buildBoardDynamic(4, 4); // start first game

  // navbar burger for mobile
  const burger = document.querySelector(".navbar-burger");
  if (burger) {
    const menu = document.getElementById(burger.dataset.target);
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }
});

// reset btn
resetBtn.addEventListener("click", () => {
  if (!currentBoard.length) return;
  board.innerHTML = "";
  currentBoard.forEach((emoji) => board.appendChild(createCard(emoji)));
  board.style.gridTemplateColumns = `repeat(${currentCols}, 1fr)`;
  prepareBoardForPlay();
});

// new game btn
newGameBtn.addEventListener("click", () => {
  buildBoardDynamic(currentRows, currentCols);
});

// difficulty dropdown
difficultyDropdown.addEventListener("change", () => {
  const size = parseInt(difficultyDropdown.value);
  buildBoardDynamic(size, size);
});
