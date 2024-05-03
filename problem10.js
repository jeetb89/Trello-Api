// Update all checkitems in a checklist to incomplete status sequentially i.e.
//  Item 1 should be updated -> then wait for 1 second -> then Item 2 should be updated etc.

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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateCheckItemsSequentially(cardId) {
  return createfetch(
    `https://api.trello.com/1/cards/${cardId}/checkLists?key=${keyValue}&token=${tokenValue}`,
    "GET"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Data fetched");
      return response.json();
    })
    .then((response) => {
      console.log(response);
      const checklistId = response[0].checkItems;
      console.log(checklistId);
      return checklistId;
    })
    .then((checkItems) => {
      return checkItems.reduce((promiseChain, checkItem) => {
        return promiseChain.then(() => {
          const checkItemId = checkItem.id;
          return updateCheckItem(cardId, checkItemId)
            .then(() => delay(1000)) // Wait for 1 second
            .then(() => {
              console.log("Updated check item:", checkItemId);
            });
        });
      }, Promise.resolve());
    })
    .catch((error) => {
      console.log('Error updating checkitems sequentially',error.message);

      throw error;
    });
}

function updateCheckItem(cardId, checkItemId) {
  return createfetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${keyValue}&token=${tokenValue}`,
    "PUT",
    {
      state: "incomplete",
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update check item");
    }
    return response.json();
  }).catch((error) => {
    console.log('Error updating checkitems:',error.message);
    throw error;
 });
}

module.exports=updateCheckItemsSequentially;
