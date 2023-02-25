import { decScore, incScore, score, setScore } from "./data";

const b1 = document.querySelector("button.score-increase");
b1.addEventListener("click", () => incScore());

const b2 = document.querySelector("button.score-decrease");
b2.addEventListener("click", () => decScore());
