'use strict';

// fetchリクエストの設定
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
fetch(API_URL) 
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const quizData = data.results;
    const quizListContainer = document.getElementById('quiz-list');

    quizData.forEach((quiz, index) => {
      const numberTitleItem = document.createElement('li');
      numberTitleItem.textContent = `${index + 1}件目のクイズデータ`;
      quizListContainer.appendChild(numberTitleItem);

    const quizDataList = buildQuizList(quiz);
    numberTitleItem.appendChild(quizDataList);  
    })
  })

  const buildQuizList = (quiz) => {
    const quizContainer = document.createElement('ul');
    for(const prop in quiz) {
      const item = document.createElement('li');
      item.innerHTML = `<storong>${prop}</storong>: ${quiz[prop]}`;
      quizContainer.appendChild(item);
    }
    return quizContainer;
  };

  