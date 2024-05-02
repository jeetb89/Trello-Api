// Create a function getAllCards which takes a boardId as argument and
//  which uses getCards function to fetch cards of all the lists.
// Do note that the cards should be fetched simultaneously from all the lists.

const boardId = "66307e57ee94e7290b22a30f";
const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";
const getCards = require("./problem4.js");

function getAllCards(boardId) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const cardinfo = getAllCards(boardId)
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

