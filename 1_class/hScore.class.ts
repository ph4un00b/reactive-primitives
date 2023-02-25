import { Reactor } from "./reactive.class";

const scores = new Reactor([]);
export const highScore = new Reactor(0);

// finds highest reactive score and changes highScore to it
function setHighScore(val) {
  // we use this for scores as well, so check if it's a number
  let highestNum = typeof val === "number" ? val : 0;

  for (const score of scores.value) {
    if (score.value <= highestNum) continue;
    highestNum = score.value;
  }

  highScore.value = highestNum;
}

// adds new score and makes it reactive when changed
export function addScore(num = 0) {
  const score = new Reactor(num);
  score.subscribe(setHighScore);
  // we cannot use .push() - we need to use = for it to react
  scores.value = [...scores.value, score];
}
