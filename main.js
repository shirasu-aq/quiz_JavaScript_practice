{
  // スタートボタンを押してデータ取得
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    startButton.hidden = true;
    fetchQuizData(1);
  });

  const titleElement = document.getElementById("title");
  const questionElement = document.getElementById("question");
  const genreElement = document.getElementById("genre");
  const difficultyElement = document.getElementById("difficulty");
  const answersContainer = document.getElementById("answers");

  // fetchAPIを用いてデータを取り出す
  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
  const fetchQuizData = async (index) => {
    titleElement.textContent = "取得中";
    questionElement.textContent = "少々お待ち下さい";

    const response = await fetch(API_URL);
    const quizData = await response.json();
    const arrayquizData = quizData.results;

    const showQuestions = () => {
      // 最初の子要素以外を消す
      while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
      }

      const eachQuiz = arrayquizData[index];
      titleElement.innerHTML = `【問題】${index}`;
      genreElement.innerHTML = `【カテゴリー】${eachQuiz.category}`;
      difficultyElement.innerHTML = `【難易度】 ${eachQuiz.difficulty}`;
      questionElement.innerHTML = `【問題】${eachQuiz.question}`;

      // 解答選択肢を定義（スプレット構文）
      const answers = [eachQuiz.correct_answer, ...eachQuiz.incorrect_answers];

      // 答えの表示
      answers.forEach((answer) => {
        const answerElement = document.createElement("li");
        answersContainer.appendChild(answerElement);

        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = answer;
        answerElement.appendChild(buttonElement);

        // 回答した際のクリックイベント
        buttonElement.addEventListener("click", () => {
          let correctAnswersNum = 0;
          if (answer === eachQuiz.correct_answer) {
            correctAnswersNum++;
          }

          index++;
          setNextQuiz();
        });
        // return shuffleArray(answers);
      });

      const shuffleArray = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        return shuffleArray(answers);
      };
    };

    // 10問全てのクイズ解答が終わった後の画面（正答数表示画面)
    const finishQuiz = () => {
      titleElement.textContent = `あなたの正答数は${correctAnswersNum}です`;
      genreElement.textContent = "";
      difficultyElement.textContent = "";
      questionElement.textContent = "再チャレンジしたい場合は下をクリック";

      const restartButton = document.createElement("button");
      restartButton.textContent = "ホームに戻る";
      answersContainer.appendChild(restartButton);
      restartButton.addEventListener("click", () => {
        location.reload();
      });
    };
    console.log(finishQuiz);

    // 回答数によって処理を切り分ける
    const setNextQuiz = () => {
      while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
      }
      if (index < arrayquizData.length) {
        console.log(index);
        console.log(arrayquizData.length);
        showQuestions();
      } else {
        finishQuiz();
      }
    };
    setNextQuiz();
  };

  //   // クイズの問題数によって処理を切り分けていく
  //   const answersContainer = document.getElementById("answers");
  //   const setNextQuiz = (quizInstance, index) => {
  //     while (answersContainer.firstChild) {
  //       answersContainer.removeChild(answersContainer.firstChild);
  //     }

  //     if (index <= quizInstance.getNumOfQuiz()) {
  //       makeQuiz(quizInstance, index);
  //     } else {
  //       finishQuiz(quizInstance);
  //     }
  //   };

  //   // 次の問題
  //   const genreElement = document.getElementById("genre");
  //   const difficultyElement = document.getElementById("difficulty");

  //   const makeQuiz = (quizInstance, index) => {
  //     titleElement.innerHTML = `問題 ${index}`;
  //     genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(
  //       index
  //     )}`;
  //     difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(
  //       index
  //     )}`;
  //     questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(
  //       index
  //     )}`;

  //     const answers = buildAnswers(quizInstance, index);

  //     answers.forEach((answer) => {
  //       const answerElement = document.createElement("li");
  //       answersContainer.appendChild(answerElement);

  //       const buttonElement = document.createElement("button");
  //       buttonElement.innerHTML = answer;
  //       answerElement.appendChild(buttonElement);

  //       buttonElement.addEventListener("click", () => {
  //         quizInstance.countCorrectAnswersNum(index, answer);
  //         index++;
  //         setNextQuiz(quizInstance, index);
  //       });
  //     });
  //   };

  //   // 解答選択肢（ボタン）を表示
  //   const buildAnswers = (quizInstance, index) => {
  //     const answers = [
  //       quizInstance.getCorrectAnswer(index),
  //       // 疑問
  //       ...quizInstance.getIncorrectAnswers(index),
  //     ];
  //     return shuffleArray(answers);
  //   };

  //   const shuffleArray = ([...array]) => {
  //     for (let i = array.length - 1; i >= 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //     return array;
  //   };

  //   // 10問全てのクイズ解答が終わった後の画面（正答数表示画面)
  //   const finishQuiz = (quizInstance) => {
  //     titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です`;
  //     genreElement.textContent = "";
  //     difficultyElement.textContent = "";
  //     questionElement.textContent = "再チャレンジしたい場合は下をクリック";

  //     const restartButton = document.createElement("button");
  //     restartButton.textContent = "ホームに戻る";
  //     answersContainer.appendChild(restartButton);
  //     restartButton.addEventListener("click", () => {
  //       location.reload();
  //     });
  //   };
}
