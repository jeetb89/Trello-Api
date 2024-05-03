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

function createBoardAndLists(boardName) {
  
  return   createfetch(
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
    .then((board) => {
      const boardId = board.id;
      console.log(board);
      // Create 3 lists simultaneously
      const listPromises = [];
      for (let ind = 0; ind < 3; ind++) {
        const listName = `boardList${ind}`;
        const listPromise = createfetch(
          `https://api.trello.com/1/lists?key=${keyValue}&token=${tokenValue}`,
          "POST",
          { name: listName, idBoard: boardId }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            console.log("List Created");
            return response.json();
          })
          .then((lists) => {
            console.log(lists);
            return lists;
          })
          .catch((error) => {
            console.log('Error creating board and lists',error.message);

            throw error;
          });

        listPromises.push(listPromise);
      }
      return Promise.all(listPromises);
    })
    .then((lists) => {
      console.log("Lists Created:", lists);

      const listIds = lists.map((list) => list.id);

      const cardPromises = listIds.map((listId) => {
        const cardName = `Card in ${listId}`;
        return createfetch(
          `https://api.trello.com/1/cards?key=${keyValue}&token=${tokenValue}`,
          "POST",
          { name: cardName, idList: listId }
        );
      });

      return Promise.all(cardPromises);
    })
    .then(() => {
      console.log("Cards Created");
    })
    .catch((error) => {
      console.log(error.message);
      
    });
}

module.exports=createBoardAndLists;
