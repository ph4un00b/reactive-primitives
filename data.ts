export let score = 0;

export function setScore(v) {
  console.log({ score });
  score = v;
}

export function incScore(v) {
  score++;
  console.log({ score });
}

export function decScore(v) {
  score--;
  console.log({ score });
}
