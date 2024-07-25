const OPERATIONS = {
  addition: {
    calculate: (a, b) => a + b,
    format: (a, b) => `What is ${a} + ${b}?`,
  },
  subtraction: {
    calculate: (a, b) => a - b,
    format: (a, b) => `What is ${a} - ${b}?`,
  },
  multiplication: {
    calculate: (a, b) => a * b,
    format: (a, b) => `What is ${a} × ${b}?`,
  },
  division: {
    calculate: (a, b) => (b === 0 ? a / 1 : a / b),
    format: (a, b) => `What is ${a} ÷ ${b}?`,
  },
};

let num1,
  num2,
  correctAnswer,
  score = 0,
  operation = "addition",
  isSubmitting = true;

function init() {
  score = parseInt(localStorage.getItem("score")) || 0;
  document.getElementById("score").textContent = `Score: ${score}`;

  operation = localStorage.getItem("operation") || "addition";

  document.getElementById("operation").value = operation;

  generateQuestion();
}

function generateQuestion() {
  num1 = Math.floor(Math.random() * 100) + 1;
  num2 = Math.floor(Math.random() * 100) + 1;

  const operationData = OPERATIONS[operation] || OPERATIONS["add"];
  correctAnswer = operationData.calculate(num1, num2);
  document.getElementById("question").textContent = operationData.format(
    num1,
    num2
  );

  document.getElementById("userAnswer").value = "";
  document.getElementById("feedback").textContent = "";

  document.getElementById("actionButton").textContent = "Submit";
  isSubmitting = true;
}

function handleButtonClick() {
  if (isSubmitting) {
    checkAnswer();
  } else {
    generateQuestion();
  }
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("userAnswer").value);
  if (isNaN(userAnswer)) {
    return;
  }

  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").textContent = "Correct! Well done!";
    score++;
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
  }
  document.getElementById("score").textContent = `Score: ${score}`;

  localStorage.setItem("score", score);

  document.getElementById("actionButton").textContent = "Next Question";
  isSubmitting = false;
}

function updateSettings() {
  operation = document.getElementById("operation").value;

  localStorage.setItem("operation", operation);

  generateQuestion();
}

document.getElementById("operation").addEventListener("change", updateSettings);

window.onload = init;
