// HTML's elements
let trivia = document.querySelector ("#trivia");

let amount = document.querySelector ("#amount");
let category = document.querySelector ("#category");

let difficulty0 = document.querySelector ("#diffculty-0");
let difficultyEasy = document.querySelector ("#diffculty-easy");
let difficultyMedium = document.querySelector ("#diffculty-medium");
let difficultyHard = document.querySelector ("#diffculty-hard");

let type0 = document.querySelector ("#type-0");
let typeMultiple = document.querySelector ("#type-multiple");
let typeBoolean = document.querySelector ("#type-boolean");

// Variables
let questions;

// Functions
const getApiData = async event => {
  event.preventDefault ();

  const triviaDifficulty = difficulty (difficulty0, difficultyEasy, difficultyMedium, difficultyHard);
  const triviaType = type (type0, typeMultiple, typeBoolean);

  const url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${triviaDifficulty}&type=${triviaType}`;
  const data = await fetchTriviaData (url);
  const questions = data.results;
  console.log (questions);

  // Forma de los objetos //
  /* 
  {category: "Entertainment: Video Games"
  correct_answer: "Fallout: New Vegas"
  difficulty: "medium"
  incorrect_answers: Array(3)
  0: "Fallout 3"
  1: "The Elder Scrolls V: Skyrim"
  2: "Fallout 4"
  length: 3
  __proto__: Array(0)
  question: "Which of the following was not developed by Bethesda?"
  type: "multiple"} 
  */

}

const difficulty = (difficulty0, difficultyEasy, difficultyMedium, difficultyHard) => {
  if (difficulty0.checked === true) { return difficulty0.value;}
  if (difficultyEasy.checked === true) { return difficultyEasy.value;}
  if (difficultyMedium.checked === true) { return difficultyMedium.value;}
  if (difficultyHard.checked === true) { return difficultyHard.value;}
}

const type = (type0, typeMultiple, typeBoolean) => {
  if (type0.checked === true) { return type0.value;}
  if (typeMultiple.checked === true) { return typeMultiple.value;}
  if (typeBoolean.checked === true) { return typeBoolean.value;}
}

const fetchTriviaData = async (url) => {
  const response = await fetch (url);
  const data = await response.json ();
  return data;
}
// Listeners

trivia.addEventListener("submit", getApiData);
console.log (questions);

