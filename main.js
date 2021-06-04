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

  console.log(arrayQuizData);
};

/**
 * ①スタートボタンにイベントをつける
 * ②APIのデータを取得する
 * ③①と②をつなぐ
 
 * 
 * スタートボタンを押してゲームがスタートする。

読み込んでいる間、title部分に「取得中」、question部分に「少々お待ちください」と表示される。
 */
