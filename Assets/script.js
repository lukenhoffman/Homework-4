 // Quiz questions and answers
 const quizQuestions = [
    {
      question: "1. Javascript is an _______ language?",
      options: ["Object-Based", "Procedural", "Object-Oriented", "None of the Above"],
      answer: "Object-Oriented"
    },
    {
      question: "2. Which programming language is used to build web pages?",
      options: ["JavaScript", "Python", "Java", "C++"],
      answer: "JavaScript"
    },
    {
        question: "3. Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["Throws an error", "Gives a warning", "Ignores the Statement", "All of the above"],
        answer: "Ignores the statement"
    },
    {
        question: "4. How can a datatype be declared to be a constant?",
        options: ["var", "const", "let", "constant"],
        answer: "const"
      },
      {
        question: "5. What does the javascript debugger statement do?",
        options: ["It acts as a breakpoint in the program", "It will debug error in the current statement if any", "It will debug all of the errors in the program at runtime", "All of the above"],
        answer: "It acts as a breakpoint in the program"
      },
      {
        question: "6. Which of the following are closures in Javascript?",
        options: ["Funtions", "Objects", "Variables", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "7. Which of the following are not server-side Javascript objects?",
        options: ["FileUpload", "Date", "Funtion", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
        options: ["Undefined", "Boolean", "Object", "Integer"],
        answer: "Object"
      },    
      {
        question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
        options: ["Only the value of the expression is compared.", "Only the datatyple is compared.", "Both the datatype and the result of the expression are compared.", "None of the above"],
        answer: "Both the datatype and the result of the expression are compared."
      },
      {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        options: ["getElementByClassname()", "getElementById()", "Both A and B", "None of the above"],
        answer: "Both A and B"
      },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  const timeLimit = 60; // seconds

  // Function to start the quiz
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timer = timeLimit;
    displayQuestion();
    startTimer();
  }

  // Function to display a question
  function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    if (currentQuestionIndex < quizQuestions.length) {
      const question = quizQuestions[currentQuestionIndex];
      const questionElement = document.createElement("h2");
      questionElement.textContent = question.question;
      questionContainer.appendChild(questionElement);

      const options = question.options;
      options.forEach(function (option) {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", function () {
          checkAnswer(option);
        });
        questionContainer.appendChild(button);
      });
    } else {
      endQuiz();
    }
  }

  // Function to check the selected answer
  function checkAnswer(selectedOption) {
    const question = quizQuestions[currentQuestionIndex];
    if (selectedOption === question.answer) {
      score++;
      timer += 10; // Add 10 seconds for correct answer
    } else {
      timer -= 10; // Subtract 10 seconds for incorrect answer
      if (timer < 0) {
        timer = 0;
      }
    }
    currentQuestionIndex++;
    displayQuestion();
  }

  // Function to start the timer
  function startTimer() {
    const timeElement = document.getElementById("time");
    timeElement.textContent = timer;

    const countdown = setInterval(function () {
      timer--;
      timeElement.textContent = timer;

      if (timer <= 0) {
        clearInterval(countdown);
        endQuiz();
      }
    }, 1000);
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timer);
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `<h2>Quiz Finished!</h2><p>Your Score: ${score}</p>`;
    const initialsInput = document.getElementById("initials");
    initialsInput.value = "";
    const saveScoreButton = document.getElementById("save-score");
    saveScoreButton.addEventListener("click", saveScore);
    const highScoresContainer = document.getElementById("high-scores-container");
    highScoresContainer.style.display = "block";
    showHighScores();  
  }

  // Function to save the score
  function saveScore() {
    const initials = document.getElementById("initials").value;
    const highScoresList = document.getElementById("high-scores");
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${initials}: ${score}`;
    highScoresList.appendChild(scoreItem);
    const highScoresContainer = document.getElementById("high-scores-container");
    highScoresContainer.style.display = "none";
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "block";
  }

  // Function to show the high scores
  function showHighScores() {
    const highScoresContainer = document.getElementById("high-scores-container");
    const highScoresList = document.getElementById("high-scores");
  
    // Clear the existing high scores list
    highScoresList.innerHTML = "";
  
    // Retrieve high scores from local storage or use an empty array if not found
    const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Display each high score as a list item
    savedScores.forEach(function (scoreObj) {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
      highScoresList.appendChild(scoreItem);
    });
  
    highScoresContainer.style.display = "block";  
  }

  // Event listener for the start button
  const startButton = document.createElement("button");
  startButton.textContent = "Start Quiz";
  startButton.addEventListener("click", startQuiz);
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.appendChild(startButton);

  // Event listener for the view high scores button
  const viewScoresButton = document.getElementById("view-quiz");
  viewScoresButton.addEventListener("click", showHighScores);

  function showHighScores() {
    const highScoresContainer = document.getElementById("high-scores-container");
    const highScoresList = document.getElementById("high-scores");
  
    // Clear the existing high scores list
    highScoresList.innerHTML = "";
  
    // Retrieve high scores from local storage or use an empty array if not found
    const savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Display each high score as a list item
    savedScores.forEach(function (scoreObj) {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
      highScoresList.appendChild(scoreItem);
    });
  
    highScoresContainer.style.display = "block";
  
    // Add event listener to the "Back to Quiz" button
    const viewQuizButton = document.getElementById("view-quiz");
    viewQuizButton.addEventListener("click", function () {
      highScoresContainer.style.display = "none";
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.style.display = "block";
    });
  }
  