const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  fetchQuizdata();
});

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const titleElement = document.getElementById("title");
const questionElement = document.getElementById("question");

const fetchQuizdata = async () => {
  titleElement.textContent = "データ取得中";
  questionElement.textContent = "しばらくお待ちください";
  const response = await fetch(API_URL);
  const quizData = await response.json();
};

function arrayQuizData() {
  return quizData.results;
}
console.log(arrayQuizData);

const genreElement = document.getElementById("genre");
const difficultyElement = document.getElementById("difficulty");

const eachQuiz = arrayQuizData[0];
let questionCount = 1;
titleElement.textContent = `問題${questionCount}`;
genreElement.textContent = `カテゴリ：${eachQuiz.category}`;
difficultyElement.textContent = `難易度：${eachQuiz.difficulty}`;
questionElement.textContent = `問題：${eachQuiz.question}`;

// スタートボタンを消す
startButton.remove();
const answerContainer = document.getElementById("answers");
const answerElement = document.createElement("li");
answerContainer.appendChild(answerElement);

const buttonElement = document.createElement("button");
const correctAnswer = eachQuiz.correct_answer;
buttonElement.textContent = correctAnswer;
answerElement.appendChild(buttonElement);
