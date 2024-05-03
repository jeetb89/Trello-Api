// Create a function getAllCards which takes a boardId as argument and
//  which uses getCards function to fetch cards of all the lists.
// Do note that the cards should be fetched simultaneously from all the lists.


const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";


function getAllCards(boardId) {
  return fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.log('Error creating cards info',error.message);

        throw error;
      });
  }


module.exports=getAllCards;

