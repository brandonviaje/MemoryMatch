// high scores data
const scores = [
  { player: "Ava", moves: 22, time: 58, date: "2026-01-10" },
  { player: "Noah", moves: 24, time: 63, date: "2026-01-09" },
  { player: "Mia", moves: 26, time: 71, date: "2026-01-08" },
  { player: "Liam", moves: 27, time: 75, date: "2026-01-07" },
  { player: "Zoe", moves: 29, time: 82, date: "2026-01-06" },
  { player: "Ethan", moves: 30, time: 88, date: "2026-01-06" },
  { player: "Ivy", moves: 31, time: 90, date: "2026-01-05" },
  { player: "Sam", moves: 33, time: 95, date: "2026-01-05" },
  { player: "Kai", moves: 34, time: 101, date: "2026-01-03" },
  { player: "Emma", moves: 35, time: 104, date: "2026-01-03" },
];

const scoresBody = document.getElementById("scores-body");

// populate table dynamically
function populateHighScores() {
  scoresBody.innerHTML = ""; // clear table body

  const sortedScores = [...scores].sort((a, b) => a.moves - b.moves); // sort by least moves
 
  // insert one row per score
  sortedScores.forEach((score, index) => {
    const tr = document.createElement("tr"); // create table row

    // rank
    const rankTd = document.createElement("td");
    rankTd.textContent = index + 1; // update rank
    tr.appendChild(rankTd);

    // player
    const playerTd = document.createElement("td");
    playerTd.textContent = score.player;
    tr.appendChild(playerTd);

    // moves
    const movesTd = document.createElement("td");
    movesTd.textContent = score.moves;
    tr.appendChild(movesTd);

    // time
    const timeTd = document.createElement("td");
    timeTd.textContent = score.time;
    tr.appendChild(timeTd);

    // date
    const dateTd = document.createElement("td");
    dateTd.textContent = score.date;
    tr.appendChild(dateTd);

    scoresBody.appendChild(tr); // add row to table body
  });
}

// event listener
document.addEventListener("DOMContentLoaded", () => {

  populateHighScores(); // populate table

  // navbar burger for mobile toggle
  const burger = document.querySelector(".navbar-burger");
  if (burger) {
    const menu = document.getElementById(burger.dataset.target);
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }
});
