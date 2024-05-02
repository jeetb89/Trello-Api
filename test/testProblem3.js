const boardId = "66307e57ee94e7290b22a30f";

const getLists=require('../problem3.js') 


getLists(boardId)
  .then((boardData) => {
    console.log(boardData);
  })
  .catch((error) => {
    console.error("Error fetching board data:", error);
  });
