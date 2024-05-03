
const createBoard= require('../problem2.js')

  createBoard("newboard")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log("Error Found :", error.message);
  });