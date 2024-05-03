// Create a function createBoard which takes the boardName as argument and
//returns a promise which resolves with newly created board data

const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

function createfetch(path, tempMethod, body) {
  return fetch(path, {
    method: tempMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createBoard(boardName) {
  return createfetch(
    `https://api.trello.com/1/boards/?name=${boardName}&key=${keyValue}&token=${tokenValue}`,
    "POST"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Board Created");
      return response.json();
    })
    .catch((error) => {
        console.log('Error creating board:',error.message);
        throw error;
    });
}

module.exports= createBoard;