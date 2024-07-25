let num1,
  num2,
  correctAnswer,
  score = 0;

function init() {
  score = parseInt(localStorage.getItem("score")) || 0;
  document.getElementById("score").textContent = `Score: ${score}`;

  generateQuestion();
}

function generateQuestion() {
  num1 = Math.floor(Math.random() * 20) + 1;
  num2 = Math.floor(Math.random() * 20) + 1;
  correctAnswer = num1 + num2;
  document.getElementById(
    "question"
  ).textContent = `What is ${num1} + ${num2}?`;
  document.getElementById("userAnswer").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("nextButton").style.display = "none";
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("userAnswer").value);
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

  document.getElementById("nextButton").style.display = "inline";
}

window.onload = init;
