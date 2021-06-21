// Elementos HTML

let trivia = document.querySelector ("#trivia");
let questions = document.querySelector ("#questions");
let questionsAnswers = document.querySelector ("#questions-answers");

let amount = document.querySelector ("#amount");
let category = document.querySelector ("#category");

let difficulty0 = document.querySelector ("#diffculty-0");
let difficultyEasy = document.querySelector ("#diffculty-easy");
let difficultyMedium = document.querySelector ("#diffculty-medium");
let difficultyHard = document.querySelector ("#diffculty-hard");

let type0 = document.querySelector ("#type-0");
let typeMultiple = document.querySelector ("#type-multiple");
let typeBoolean = document.querySelector ("#type-boolean");

let categoryInfGame = document.querySelector ("#category-inf-game");
let difficultyInfGame = document.querySelector ("#difficulty-inf-game");
let questionGame = document.querySelector ("#question-game");
let Answer1 = document.querySelector ("#answer-1");
let Answer2 = document.querySelector ("#answer-2");
let Answer3 = document.querySelector ("#answer-3");
let Answer4 = document.querySelector ("#answer-4");

// Funciones

// Obtiene datos de la API y empieza el juego
const getApiData = async event => {
  event.preventDefault ();
  // Funciones para saber que dificultad y que tipo se seleccionó
  const triviaDifficulty = difficulty (difficulty0, difficultyEasy, difficultyMedium, difficultyHard);
  const triviaType = type (type0, typeMultiple, typeBoolean);
  // Obtiene el arreglo desde la API
  const url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${triviaDifficulty}&type=${triviaType}`;
  const data = await fetchTriviaData (url);
  const questionsData = data.results;

  startGame (questionsData);

  // Forma de los objetos //
  /* 
  {category: "Entertainment: Video Games" --
  correct_answer: "Fallout: New Vegas"
  difficulty: "medium" --
  incorrect_answers: Array(3)
  0: "Fallout 3"
  1: "The Elder Scrolls V: Skyrim"
  2: "Fallout 4"
  length: 3
  __proto__: Array(0)
  question: "Which of the following was not developed by Bethesda?" --
  type: "multiple"} --
  */

}

const startGame = (questionsData) => {
  trivia.classList.add ("hide-objects");
  questions.classList.remove ("hide-objects");
  addQuestions (questionsData);

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

const addQuestions = (questionsData) => {
  categoryInfGame.innerHTML = `category: ${questionsData[0].category}`;
  difficultyInfGame.innerHTML = `difficulty: ${questionsData[0].difficulty}`;
  questionGame.innerHTML = questionsData[0].question;
  if (questionsData[0].type === "multiple") { // Opcion multiple
    // Crear un numero aleatorio entre 1 y 4 para meter la respuesta correcta entre uno de las 4 opciones, para preguntas de opcion multiple
    const correctAnswer = Math.floor (Math.random () * 4 + 0.9); 
    switch (correctAnswer) {
      case 1:
        Answer1.innerHTML = questionsData[0].correct_answer;
        Answer2.innerHTML = questionsData[0].incorrect_answers[0];
        Answer3.innerHTML = questionsData[0].incorrect_answers[1];
        Answer4.innerHTML = questionsData[0].incorrect_answers[2];
        break;
      case 2:
        Answer1.innerHTML = questionsData[0].incorrect_answers[0];
        Answer2.innerHTML = questionsData[0].correct_answer;
        Answer3.innerHTML = questionsData[0].incorrect_answers[1];
        Answer4.innerHTML = questionsData[0].incorrect_answers[2];
        break;
      case 3:
        Answer1.innerHTML = questionsData[0].incorrect_answers[0];
        Answer2.innerHTML = questionsData[0].incorrect_answers[1];
        Answer3.innerHTML = questionsData[0].correct_answer;
        Answer4.innerHTML = questionsData[0].incorrect_answers[2];
        break;
      case 4:
        Answer1.innerHTML = questionsData[0].incorrect_answers[0];
        Answer2.innerHTML = questionsData[0].incorrect_answers[1];
        Answer3.innerHTML = questionsData[0].incorrect_answers[2];
        Answer4.innerHTML = questionsData[0].correct_answer;
        break;
    }
  }
  else { // Verdadero o falso
    // Nos deshacemos de 2 opciones que no seran necesarias
    Answer3.classList.add ("hide-objects");
    Answer4.classList.add ("hide-objects");
    // Asignamos verdadero a la primera opcion sin importar si es correcto o incorrecto
    if (questionsData[0].correct_answer === "True") {
      Answer1.innerHTML = questionsData[0].correct_answer
      Answer2.innerHTML = questionsData[0].incorrect_answers
    }
    else {
      Answer1.innerHTML = questionsData[0].incorrect_answers
      Answer2.innerHTML = questionsData[0].correct_answer
    }
    console.log(questionsData[0].correct_answer);
  }

 
}
// Listeners

trivia.addEventListener("submit", getApiData);
