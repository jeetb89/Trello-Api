const boardId = "66307e57ee94e7290b22a30f";

const getBoard= require('../problem1.js')

  getBoard(boardId)
  .then((boardData) => {
    console.log(boardData);
  })
  .catch((error) => {
    console.error("Error occurred:", error.message);
  });