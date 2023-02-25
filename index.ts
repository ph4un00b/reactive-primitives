/**
 * @see https://levelup.gitconnected.com/finding-fine-grained-reactive-programming-89741994ddee
 */
/****************************
 * 1 module based reactivity
 ***************************/
// import "./buttons";
// import { score } from "./data";

// const h1 = document.querySelector("h1.score");
// h1.textContent = `score: ${score}`;

/****************************
 * 1 basic subscription based reactivity
 ***************************/
// import { score } from "./1_class/data.class";
// import "./1_class/buttons.class";
// import { addScore, highScore } from "./1_class/hScore.class";

// const h1 = document.querySelector("h1.score");
// const h2 = document.querySelector("h2.hScore");

// score.subscribe((val) => {
//   h1.textContent = `score: ${val}`;
// });

// highScore.subscribe((val) => {
//   h2.textContent = `high-score: ${val}`;
// });

// const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// /**
//  * @todo top await on parcel config
//  */
// sleep(1000)
//   .then(() => addScore(1))
//   .then(() => sleep(2000))
//   .then(() => addScore(45))
//   .then(() => sleep(2000))
//   .then(() => addScore(26));

/****************************
 * 2 computed subscription based reactivity
 * @test
 ***************************/
// import {
//   computed,
//   dynamicComputed,
//   Reactor
// } from "./2_computed/reactive.computed";

// const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// const num1 = new Reactor(45);
// const num2 = new Reactor(92);
// const unusedVal = new Reactor(34);

// const num4 = computed(() => {
//   return num1.value + num2.value;
// });

// num4.subscribe((num) => {
//   console.log("num4: " + num);
// });

// // num4: 137
// sleep(1000)
//   .then(() => (num1.value = 8))
//   // num4: 100
//   .then(() => sleep(2000))
//   .then(() => (num2.value = 2))
//   //  num4: 10
//   .then(() => sleep(2000))
//   .then(() => (unusedVal.value = 17));

/****************************
 * 2 computed subscription based reactivity
 * @abstract
 ***************************/
import { computed, Reactor } from "./2_computed/reactive.with-set";
// const num1 = new Reactor(0);

// // ERROR: Circular computation detected?
// const num2 = computed(() => {
//   num1.value++;
//   return num1.value + 1;
// });

// num2.subscribe((num) => {
//   console.log("num2: " + num);
// });

// num1.subscribe((num) => {
//   console.log("num2: " + num);
// });

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const num1 = new Reactor(45);
const num2 = new Reactor(92);
const unusedVal = new Reactor(34);

const num4 = computed(() => {
  return num1.value + num2.value;
});

num4.subscribe((num) => {
  console.log("num4: " + num);
});

// num4: 137
sleep(1000)
  .then(() => (num1.value = 8))
  // num4: 100
  .then(() => sleep(2000))
  .then(() => (num2.value = 2))
  //  num4: 10
  .then(() => sleep(2000))
  .then(() => (unusedVal.value = 17));
