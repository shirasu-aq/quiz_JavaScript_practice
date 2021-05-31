const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

class Quiz {
　constructor(quizData) {
　　this._quizzes = quizData.results;
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
　questionElement.textContent = '少々お待ち下さい';

　const response = await fetch(API_URL);
　const quizData = await response.json();
　const quizInstance = new Quiz(quizData);

　setNextQuiz(quizInstance, index);
};

const makeQuiz = (quizInstance, index) => {
　titleElement.innerHTML = `問題 ${index}`;
　genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
　difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
　questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)})`;

　const buttonElement = document.createElement('button');
　buttonElement.innerHTML = '次へ';
　answersContainer.appendChild(buttonElement);
　buttonElement.addEventListener('click', () => {
　　index++;
　　answersContainer.removeChild(answersContainer.firstChild);
　　setNextQuiz(quizInstance, index);
　});
};