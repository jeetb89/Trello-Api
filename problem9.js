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

function updateCheckItems(cardId) {
  return createfetch(
    `https://api.trello.com/1/cards/${cardId}/checkLists?key=${keyValue}&token=${tokenValue}`,
    "GET"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Datafetched");
      return response.json();
    })
    .then((response) => {
      console.log(response);
      const checklistId = response[0].checkItems;
      console.log(checklistId);
      return checklistId;
    })
    .then((checkItems) => {
      const checkidPromise = [];
      checkItems.forEach((checkItem) => {
        const checkItemId = checkItem.id;
        const checkid = createfetch(
          `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${keyValue}&token=${tokenValue}`,
          "PUT",
          {
            state: "complete",
          }
        ).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update check item");
          }
          return response.json();
        });
        checkidPromise.push(checkid);
      });
      return Promise.all(checkidPromise);
    })
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.log('Error updating check items :',error.message);
      
    });
}

module.exports=updateCheckItems;
