const boardId = "66307e57ee94e7290b22a30f";

const getCards = require("../problem4.js");

const getAllCards=require('../problem5.js')


getAllCards(boardId)
.then((lists) => {
  const cardPromise = [];
  lists.forEach((list) => {
    cardPromise.push(getCards(list.id));
  });
  return Promise.all(cardPromise);
})
.then((res) => {
  console.log(res);
  return res;
})
.catch((error) => {
  console.log(error);
});