// Quiz questions and answers
const questions = [
  {
    topic: "Geography",
    question: "What is the capital city of Morocco",
    possibleAnswers: ["Rabat", "Marrakech", "Casablanca"],
    correctAnswer: "Rabat",
  },
  {
    topic: "Geography",
    question: "What is the capital city of Canada?",
    possibleAnswers: ["Toranto", "Vancouver", "Ottawa"],
    correctAnswer: "Ottawa",
  },
  {
    topic: "Geography",
    question: "What is the capital city of Turkey?",
    possibleAnswers: ["Istanbul", "Ankara", "Antalya"],
    correctAnswer: "Ankara",
  },
  {
    topic: "Geography",
    question: "What is the capital city of Switzerland?",
    possibleAnswers: ["Zurich", "Bern", "Geneva"],
    correctAnswer: "Bern",
  },
  {
    topic: "Geography",
    question: "What is the capital city of Australia?",
    possibleAnswers: ["Melbourne", "Canberra", "Sydney"],
    correctAnswer: "Canberra",
  },
  {
    topic: "Geography",
    question: "What is the capital city of Brazil?",
    possibleAnswers: ["Brasilia", "Rio de Janeiro", "Sao Paolo"],
    correctAnswer: "Brasilia",
  },
  {
    topic: "Geography",
    question: "What is the capital city of SouthAfrica?",
    possibleAnswers: ["Johannesburg", "Durban", "Cape Town"],
    correctAnswer: "Brasilia",
  },
  {
    topic: "Geography",
    question: "What is the capital city of New Zealand?",
    possibleAnswers: ["Auckland", "Wellington", "Hamilton"],
    correctAnswer: "Wellington",
  },
];

// References to HTML elements
const quizProgress = document.getElementById("quizProgress"); // Progress bar for the quiz
const questionContainer = document.getElementById("questionContainer"); // Container for the current question
const answerContainer = document.getElementById("answerContainer"); // Container for the answer buttons
const startScreen = document.getElementById("startScreen"); // Initial start screen
const quizScreen = document.getElementById("quizScreen"); // Quiz screen with questions
const endScreen = document.getElementById("endScreen"); // Final screen after the quiz ends
const startButton = document.getElementById("startButton"); // Button to start the quiz
const restartButton = document.getElementById("restartButton"); // Button to restart the quiz
const resultMessage = document.getElementById("resultMessage"); // Message showing pass or fail
const finalScore = document.getElementById("finalScore"); // Element showing the final score
const totalQuestions = document.getElementById("totalQuestions"); // Element showing total questions

// Variables for quiz state
let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score

// Event listener for starting the quiz
startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden"); // Hide the start screen
  quizScreen.classList.remove("hidden"); // Show the quiz screen
  handleQuestion(currentQuestionIndex); // Display the first question
});

// Event listener for restarting the quiz
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0; // Reset question index
  score = 0; // Reset score
  endScreen.classList.add("hidden"); // Hide the end screen
  quizScreen.classList.remove("hidden"); // Show the quiz screen
  handleQuestion(currentQuestionIndex); // Start with the first question again
});

// Function to handle displaying a question and its answers
function handleQuestion(index) {
  // Update quiz progress indicator
  quizProgress.innerHTML = ""; // Clear previous progress
  questions.forEach((_, i) => {
    // Add a span for each question, marking those already seen
    quizProgress.innerHTML += `<span class="${i <= index ? "seen" : ""}"></span>`;
  });

  // Display the topic and question
  questionContainer.innerHTML = `
    <p>${questions[index].topic}</p>
    <p>${questions[index].question}</p>
  `;

  // Display the possible answers
  answerContainer.innerHTML = ""; // Clear previous answers
  questions[index].possibleAnswers.forEach((answer) => {
    const button = document.createElement("button"); // Create a button for each answer
    button.textContent = answer; // Set button text to the answer
    button.addEventListener("click", () => handleAnswer(answer, index)); // Add event listener for answer selection
    answerContainer.appendChild(button); // Add the button to the answer container
  });
}

// Function to handle answer selection
function handleAnswer(answer, index) {
  // Check if the selected answer is correct
  if (answer === questions[index].correctAnswer) {
    score++; // Increment score for a correct answer
  }
  // Move to the next question or end the quiz if this is the last question
  if (index === questions.length - 1) {
    endQuiz(); // End the quiz
  } else {
    currentQuestionIndex++; // Move to the next question
    handleQuestion(currentQuestionIndex); // Display the next question
  }
}

// Function to handle the end of the quiz
function endQuiz() {
  quizScreen.classList.add("hidden"); // Hide the quiz screen
  endScreen.classList.remove("hidden"); // Show the end screen
  finalScore.textContent = score; // Display the final score
  totalQuestions.textContent = questions.length; // Display the total number of questions
  // Display a pass or fail message based on the score
  resultMessage.textContent = score >= questions.length / 2 ? "Hurray! You passed!" : "Oops! You failed!";
}
