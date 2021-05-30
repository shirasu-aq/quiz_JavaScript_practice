'use strict';

// fetchリクエストの設定
const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
fetch(API_URL) 
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data.results);
  })