const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

function fetchAPI(path, method, body) {
  const url = `https://api.trello.com/1${path}?key=${keyValue}&token=${tokenValue}`;
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options);
}

function deleteListsSequentially(listIds, index) {
  if (index >= listIds.length) {
    console.log("All lists deleted");
    return;
  }
  const listId = listIds[index];
  fetchAPI(`/lists/${listId}/closed`, "PUT", {
    value: true,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete list");
      }
      console.log(`List ${index + 1} deleted`);
      return response.json();
    })
    .then(() => deleteListsSequentially(listIds, index + 1))
    .catch((error) => {
      console.log('Error deleting lists sequentially:',error.message);
        throw error
    });
}

function deleteAllLists(boardName) {
   return fetchAPI("/members/me/boards", "GET")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch boards");
      }
      return response.json();
    })
    .then((boards) => {
      const board = boards.find((rep) => rep.name === boardName);
      if (!board) {
        throw new Error("Board not found");
      }
      const boardId = board.id;
      console.log(board);
      return fetchAPI(`/boards/${boardId}/lists`, "GET");
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }
      return response.json();
    })
    .then((lists) => {
      const listIds = lists.map((list) => list.id);
      deleteListsSequentially(listIds, 0);
    })
    .catch((error) => {
      console.log('Error deleting all lists',error.message);
      throw error
    });
}

module.exports= deleteAllLists;
