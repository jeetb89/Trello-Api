const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

function deletefetch(path, tempMethod, body) {
  return fetch(path, {
    method: tempMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function deleteList(boardName) {
  return  deletefetch(
    `https://api.trello.com/1/members/me/boards?key=${keyValue}&token=${tokenValue}`,
    "GET"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Board Information");
      return response.json();
    })
    .then((response) => {
      const board = response.find((rep) => rep.name === boardName);
      if (!board) {
        throw new Error("Board not found");
      }
      const boardId = board.id;
      console.log(board);
      return deletefetch(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`,
        "GET"
      );
    })
    .then((lists) => {
      if (!lists.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("List Information");
      return lists.json();
    })
    .then((lists) => {
      console.log(lists);
      const listPromise = [];
      lists.forEach((list) => {
        const listidPromise = deletefetch(
          `https://api.trello.com/1/lists/${list.id}/closed?key=${keyValue}&token=${tokenValue}`,
          "PUT",
          {
            value: true,
          }
        );
        listPromise.push(listidPromise);
      });

      return Promise.all(listPromise);
    })
    .then((results) => {
      console.log("Lists closed:", results);
    })
    .catch((error) => {
      console.log('Error deleting list:',error.message);
 
      throw error;
    });
}


module.exports=deleteList
