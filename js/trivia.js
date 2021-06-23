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

// Elementos HTML //

// Elementos de la pagina
const trivia = document.getElementById ("trivia");
const questions = document.getElementById ("questions");
const questionsAnswers = document.getElementById ("questions-answers");
// Elementos de la seccion de preguntas
const categoryInfGame = document.getElementById ("category-inf-game");
const difficultyInfGame = document.getElementById ("difficulty-inf-game");
const questionGame = document.getElementById ("question-game");
// Preguntas
const allAnswers = document.querySelectorAll (".questions-answers-item");
const answer1 = document.getElementById ("1");
const answer2 = document.getElementById ("2");
const answer3 = document.getElementById ("3");
const answer4 = document.getElementById ("4");
// Valores para generar los datos de la API
const amount = document.getElementById ("amount");
const category = document.getElementById ("category");
const difficulty0 = document.getElementById ("diffculty-0");
const difficultyEasy = document.getElementById ("diffculty-easy");
const difficultyMedium = document.getElementById ("diffculty-medium");
const difficultyHard = document.getElementById ("diffculty-hard");
const type0 = document.getElementById ("type-0");
const typeMultiple = document.getElementById ("type-multiple");
const typeBoolean = document.getElementById ("type-boolean");

// variables //

let currentQuestion = 0
let correctAnswer = 0;
let score = 0;

// Funciones //

// Dificultad
const difficulty = () => {
  if (difficulty0.checked === true) { return difficulty0.value;}
  if (difficultyEasy.checked === true) { return difficultyEasy.value;}
  if (difficultyMedium.checked === true) { return difficultyMedium.value;}
  if (difficultyHard.checked === true) { return difficultyHard.value;}
}
// Tipo
const type = () => {
  if (type0.checked === true) { return type0.value;}
  if (typeMultiple.checked === true) { return typeMultiple.value;}
  if (typeBoolean.checked === true) { return typeBoolean.value;}
}
// Juego
const startGame = () => {
  // Agrega las preguntas e informacion a la pagina
  categoryInfGame.innerHTML = `category: ${questionsData[currentQuestion].category}`;
  difficultyInfGame.innerHTML = `difficulty: ${questionsData[currentQuestion].difficulty}`;
  questionGame.innerHTML = questionsData[currentQuestion].question;
  // comprobrar tipo de pregunta
  if (questionsData[currentQuestion].type === "multiple") {
    // Agregamos los dos botones, en caso de que una opcion pasada haya sido boolean
    answer3.classList.remove ("hide-objects");
    answer4.classList.remove ("hide-objects");
    // Crear un numero aleatorio entre 1 y 4 para meter la respuesta correcta entre uno de las 4 opciones
    correctAnswer = Math.floor (Math.random () * 4 + 1);
    let i = 0, j = 0;
    while (i < allAnswers.length) {
      if (allAnswers[i].id == correctAnswer ) {
        allAnswers[i].innerHTML = questionsData[currentQuestion].correct_answer;
      }
      else {
        allAnswers[i].innerHTML = questionsData[currentQuestion].incorrect_answers[j];
        j++;
      }
      i++;
    }
  }
  if (questionsData[currentQuestion].type === "boolean") { 
    // Nos deshacemos de 2 opciones que no seran necesarias
    answer3.classList.add ("hide-objects");
    answer4.classList.add ("hide-objects");
    // Colocamos verdadero al principio y falso sin importar cual es la correcta
    if (questionsData[currentQuestion].correct_answer === "True") {
      answer1.innerHTML = questionsData[currentQuestion].correct_answer;
      answer2.innerHTML = questionsData[currentQuestion].incorrect_answers[0];
      correctAnswer = 1;
    }
    else {
      answer1.innerHTML = questionsData[currentQuestion].incorrect_answers[0];
      answer2.innerHTML = questionsData[currentQuestion].correct_answer;
      correctAnswer = 2;
    }
  }
  // Escucha el boton que presione el usuario
  for (let i = 0; i < allAnswers.length; i++ ) {
    let currentAnswer = i + 1;
    allAnswers[i].addEventListener ("click", () => verifyAnswer (allAnswers[i].id));
  }
}
// Verificar la respuesta del usuario
const verifyAnswer = (userAnswer) => {
  if (userAnswer == correctAnswer) {
    console.log ("respuesta correcta");
  }
  else {
    console.log("respuesta incorrecta");
  }
  currentQuestion++;
  console.log(currentQuestion);///////////////////////////////////
  startGame();
} 

// Listener //

trivia.addEventListener ("submit", event => {
  event.preventDefault ();
  // Tipo y dificultad
  const triviaDifficulty = difficulty ();
  const triviaType = type ();
  // Oculta el formulario y aparece el menu de preguntas
  trivia.classList.add ("hide-objects");
  questions.classList.remove ("hide-objects");
  // Obtiene el arreglo desde la API
  const url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${triviaDifficulty}&type=${triviaType}`;
  fetch (url)
    .then (response => response.json())
    .then (data => {
      questionsData = data.results
      startGame (); // <- Empieza el juego
    });
});
