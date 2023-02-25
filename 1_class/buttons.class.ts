import { score } from "./data.class";

const b1 = document.querySelector("button.score-increase");
b1.addEventListener("click", () => score.value++);

const b2 = document.querySelector("button.score-decrease");
b2.addEventListener("click", () => score.value--);
