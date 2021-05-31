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

  // 間違いの選択肢
  getIncorrectAnswers(index) {
    return this._quizzes[index - 1].incorrect_answers;
  }

  // クイズの正当数をカウント
  countCorrectAnswersNum(index, answer) {
    const correctAnswer = this._quizzes[index - 1].correct_answer;
    if (answer === correctAnswer) {
      return this._correctAnswersNum++;
    }
  }

  // カウントした正答数を取得
  getcorrectAnswersNum() {
    return this._correctAnswersNum++;
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
  // ボタン消す
  while(answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
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
 * 配列でanswerを定義
 * ボタン要素リストを表示
 */
const makeQuiz = (quizInstance, index) => {
　titleElement.innerHTML = `問題 ${index}`;
　genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
　difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
　questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)})`;

const answers = [
  quizInstance.getcorrectAnswer(index),
  // ...を入れて回答ごとにボタンを生成する
  ...quizInstance.getIncorrectAnswers(index)
];

  answers.forEach((answer) => {
    const answerElement = document.createElement('li');
    answersContainer.appendChild(answerElement);

    　const buttonElement = document.createElement('button');
    　buttonElement.innerHTML = answer;
    　answerElement.appendChild(buttonElement);
    
    　buttonElement.addEventListener('click', () => {
      quizInstance.countCorrectAnswersNum(index, answer);
      index++;
    　　setNextQuiz(quizInstance, index);
  });
　});
};

// シャッフルするコード
const shuffleArray = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const finishQuiz = (quizInstance) => {
  titleElement.textContent = `あなたの正答数は${quizInstance.getcorrectAnswersNum()}です`
  genreElement.textContent = '';
  difficultyElement.textContent = '';
  questionElement.textContent = '再チャレンジしたい場合は下をクリック';
}