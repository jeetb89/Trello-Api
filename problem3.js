// Create a function getLists which takes a boardId as argument
//  and returns a promise which resolved with lists data

const boardId = "66307e57ee94e7290b22a30f";
const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

function getLists(boardId) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`,
      "GET"
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

getLists(boardId)
  .then((boardData) => {
    console.log(boardData);
  })
  .catch((error) => {
    console.error("Error fetching board data:", error);
  });
