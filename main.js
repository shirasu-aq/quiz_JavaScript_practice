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

}

const fetchQuizData = async (index) => {
    titleElement.textContent = '取得中';
    questionElement.textContent = '少々お待ちください';

    const response = await fetch(API_URL);
    const quizData = await response.json();
    // fetchで受け取ったクイズのデータをインスタンスの引数に設置する
    const quizInstance = new Quiz(quizData);

    setNextQuiz(quizInstance, index);
};




// }