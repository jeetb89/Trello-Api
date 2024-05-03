// Create a function getLists which takes a boardId as argument
//  and returns a promise which resolved with lists data
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


function getLists(boardId) {
  return  createfetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`,
      "GET"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log('Error getting list:',error.message);
        throw error;
      });
}


module.exports=getLists;

