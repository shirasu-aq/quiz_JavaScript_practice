const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

class Quiz {
　constructor(quizData) {
　　this._quizzes = quizData.results;
    this._correctAnswersNum = 0;
　}

　getQuizCategory(index) {
　　return this._quizzes[index - 1].category;
　}

　getQuizDifficulty(index) {
　　return this._quizzes[index - 1].difficulty;
　}

　getQuizQuestion(index) {
　　return this._quizzes[index - 1].question;
　}

  // クイズの長さを取得
  getNumOfquiz() {
    return this._quizzes.length;
  }

  // クイズの正当数を取得
  getcorrectAnswer(index) {
    return this._quizzes[index - 1].correct_answer;
  }

  // クイズの正当数をカウント
  countCorrectAnswersNum(index, answer) {
    const correctAnswer = this._quizzes[index - 1].correct_answer;
    if (answer === correctAnswer) {
      return this._correctAnswersNum++;
    }
  }

  // カウントした正答数を取得
  getcorrectAnswerNum() {
    return this._correctAnswerNum++;
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

const setNextQuiz = (quizInstance, index) => {
  if (index <= quizInstance.getNumOfquiz()) {
    makeQuiz(quizInstance, index);
  }else {
    finishQuiz(quizInstance);
  }
}

const fetchQuizData = async (index) => {
　titleElement.textContent = '取得中';
　questionElement.textContent = '少々お待ち下さい';

　const response = await fetch(API_URL);
　const quizData = await response.json();
　const quizInstance = new Quiz(quizData);

　setNextQuiz(quizInstance, index);
};

/**
 * answerを定義
 * ボタンのテキストに答えを表示
 * 正答数をカウントするインスタンスメソッドを定義
 */
const makeQuiz = (quizInstance, index) => {
　titleElement.innerHTML = `問題 ${index}`;
　genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
　difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
　questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)})`;

const answer = quizInstance.getcorrectAnswer(index);

　const buttonElement = document.createElement('button');
　buttonElement.innerHTML = answer;
　answersContainer.appendChild(buttonElement);

　buttonElement.addEventListener('click', () => {
　　index++;
　　answersContainer.removeChild(answersContainer.firstChild);
　　setNextQuiz(quizInstance, index);
　});
};

const finishQuiz = (quizInstance) => {
  titleElement.textContent = `あなたの正答数は${quizInstance.getcorrectAnswersNum()}です`
  genreElement.textContent = '';
  difficultyElement.textContent = '';
  questionElement.textContent = '再チャレンジしたい場合は下をクリック';
}