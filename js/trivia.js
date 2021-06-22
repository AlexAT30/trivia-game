// Elementos HTML zzz

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
let answer1 = document.querySelector ("#answer-1");
let answer2 = document.querySelector ("#answer-2");
let answer3 = document.querySelector ("#answer-3");
let answer4 = document.querySelector ("#answer-4");

let allAnswers = document.querySelectorAll (".questions-answers-item")

// variables //
let currentQuestion = 0

// Funciones //

// Obtiene datos de la API y empieza el juego
const getApiData = async event => {
  event.preventDefault ();
  const triviaDifficulty = difficulty (difficulty0, difficultyEasy, difficultyMedium, difficultyHard);
  const triviaType = type (type0, typeMultiple, typeBoolean);

  // Obtiene el arreglo desde la API
  const url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${triviaDifficulty}&type=${triviaType}`;
  const data = await fetchTriviaData (url);
  const questionsData = data.results;
  // Oculta el formulario y aparece el menú de preguntas
  trivia.classList.add ("hide-objects");
  questions.classList.remove ("hide-objects");

  startGame (questionsData, currentQuestion);

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

const startGame = (questionsData, index) => {
  const correctAnswerIndex = addQuestions (questionsData, index);
  userResponse (questionsData, allAnswers, correctAnswerIndex);
}
// Recorre los 4 botones para verificar una respuesta del usuario
const userResponse = (questionsData, allAnswers, Index) => {
  for (let i = 0; i < allAnswers.length; i++ ) {
    let currentAnswer = i + 1;
    allAnswers[i].addEventListener ("click", () => verifyAnswer (questionsData, currentAnswer, Index));
  }
}
// verifica si la respuesta del usuario es correcta o incorrecta
const verifyAnswer = (questionsData, currentAnswer, correctAnswerIndex) => {
  if (currentAnswer == correctAnswerIndex) {
    console.log ("respuesta correcta");
    currentQuestion += 1;
    console.log(currentQuestion);
    startGame (questionsData, currentQuestion);
  }
  else {
    console.log("respuesta incorrecta");
    currentQuestion += 1;
    console.log(currentQuestion);
    startGame (questionsData, currentQuestion);
  }
}
  // Funciones para saber que dificultad y que tipo se seleccionó:
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
// Recupera la informacion desde la API
const fetchTriviaData = async (url) => {
  const response = await fetch (url);
  const data = await response.json ();
  return data;
}
// Agrega las preguntas a la pagina desde un numero "index"
const addQuestions = (questionsData, index) => {
  categoryInfGame.innerHTML = `category: ${questionsData[index].category}`;
  difficultyInfGame.innerHTML = `difficulty: ${questionsData[index].difficulty}`;
  questionGame.innerHTML = questionsData[index].question;
  if (questionsData[index].type === "multiple") { // Opcion multiple
    // Agregamos los dos botones, en caso de que una opcion pasada haya sido boolean
    answer3.classList.remove ("hide-objects");
    answer4.classList.remove ("hide-objects");

    let correctAnswer = 0;

    // Crear un numero aleatorio entre 1 y 4 para meter la respuesta correcta entre uno de las 4 opciones
    correctAnswer = Math.floor (Math.random () * 4 + 1); 
    switch (correctAnswer) {
      case 1:
        answer1.innerHTML = questionsData[index].correct_answer;
        answer2.innerHTML = questionsData[index].incorrect_answers[0];
        answer3.innerHTML = questionsData[index].incorrect_answers[1];
        answer4.innerHTML = questionsData[index].incorrect_answers[2];
        break;
      case 2:
        answer1.innerHTML = questionsData[index].incorrect_answers[0];
        answer2.innerHTML = questionsData[index].correct_answer;
        answer3.innerHTML = questionsData[index].incorrect_answers[1];
        answer4.innerHTML = questionsData[index].incorrect_answers[2];
        break;
      case 3:
        answer1.innerHTML = questionsData[index].incorrect_answers[0];
        answer2.innerHTML = questionsData[index].incorrect_answers[1];
        answer3.innerHTML = questionsData[index].correct_answer;
        answer4.innerHTML = questionsData[index].incorrect_answers[2];
        break;
      case 4:
        answer1.innerHTML = questionsData[index].incorrect_answers[0];
        answer2.innerHTML = questionsData[index].incorrect_answers[1];
        answer3.innerHTML = questionsData[index].incorrect_answers[2];
        answer4.innerHTML = questionsData[index].correct_answer;
        break;
    }
    return correctAnswer;
  }
  if (questionsData[index].type === "boolean") { // Verdadero o falso
    // Nos deshacemos de 2 opciones que no seran necesarias
    answer3.classList.add ("hide-objects");
    answer4.classList.add ("hide-objects");
    // Generamos un numero entre 1 y 2 de forma aleatoria
    correctAnswer = Math.floor (Math.random () * 2 + 1); 
    switch (correctAnswer) {
      case 1:
        answer1.innerHTML = questionsData[index].correct_answer;
        answer2.innerHTML = questionsData[index].incorrect_answers[0];
        break;
      case 2:
        answer1.innerHTML = questionsData[index].incorrect_answers[0];
        answer2.innerHTML = questionsData[index].correct_answer;
        break;  
      }
    return correctAnswer;
  }
}
// Listeners
trivia.addEventListener ("submit", getApiData);
