const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

class Quiz {
    constructor(quizData) {
      // クイズの情報
      this._quizees = quizData.results;
    }

    getQuizCategory(index) {
      return this._quizees[index - 1].category;
    }

    getQuizDifficulty(index) {
      return this._quizees[index - 1].difficulty;
    }

    getQuizQuestion(index) {
      return this._quizees[index - 1].question;
    }
};

const titleElement = document.getElementById('title');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const startButton = document.getElementById('start-button');
const genreElement = document.getElementById('genre');
const difficultyElement = document.getElementById('difficulty');

startButton.addEventListener('click', () => {
　startButton.hidden = true;
　　fetchQuizData(1);
});

const fetchQuizData = async (index) => {
    titleElement.textContent = '取得中';
    questionElement.textContent = '少々お待ちください';

    const response = await fetch(API_URL);
    const quizData = await response.json();
    // fetchで受け取ったクイズのデータをインスタンスの引数に設置する
    const quizInstance = new Quiz(quizData);

    setNextQuiz(quizInstance, index);
};

const makeQuiz = (quizInstance, index) => {

  titleElement.innerHTML = `問題${index}`;
  // クラスで定義したメソッドを利用
  genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
  difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
  questionElement.innerHTML = `【クイズ】 ${quizInstance.getQuizQuestion(index)}`;

  const buttonElement = document.createElement('button');
  buttonElement.innnerHTML = '次へ';
  answerContainer.appendChild(buttonElement);

  buttonElement.addEventListener('click', () => {
    index++;
    answersContainer.removeChild(answersContainer.firstChild);
    // 引数として渡ってきているquizinstanceを用いて、ジャンルや難易度の値を取得
    setNextQuiz(quizInstance, index);
  });

};




