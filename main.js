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
  const arrayQuizData = quizData.results;

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
};

/**
 * ①解答を表示するためのHTML要素を作る
 * ②correct_answerの情報を取り出す
 * ③incorrect_answerの情報を取り出す
 * ④HTML要素となげる
 * ⑤④をHTML要素とつなげる
 
回答選択肢が表示される。（正解、不正解合わせて4つ）
 */
