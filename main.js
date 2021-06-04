const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  fetchQuizdata();
});

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const titleElement = document.getElementById("title");
const questionElement = document.getElementById("question");

const fetchQuizdata = async () => {
  titleElement.innerHTML = "データ取得中";
  questionElement.innerHTML = "しばらくお待ちください";
  const response = await fetch(API_URL);
  const quizData = await response.json();
  const arrayQuizData = quizData.results;

  const genreElement = document.getElementById("genre");
  const difficultyElement = document.getElementById("difficulty");

  const eachQuiz = arrayQuizData[0];
  let questionCount = 1;
  titleElement.innerHTML = `問題${questionCount}`;
  genreElement.innerHTML = `カテゴリ：${eachQuiz.category}`;
  difficultyElement.innerHTML = `難易度：${eachQuiz.difficulty}`;
  questionElement.innerHTML = `問題：${eachQuiz.question}`;
};

/**
 * ①情報を表示するためのHTML要素を作る
 * ②情報とHTML要素を結びつける
 
自動的に最初の問題ページに移行、問題番号、カテゴリー名、難易度、問題文が表示される。
　- 問題、【ジャンル】、【難易度】、【クイズ】という見出しも合わせて表示される。
 */
