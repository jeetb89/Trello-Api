const listId = "66307e57ee94e7290b22a317";

const getCards = require("../problem4.js");

getCards(listId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
