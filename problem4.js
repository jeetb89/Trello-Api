// Create a function getCards which
// takes a listId as argument and returns a promise which resolves with cards data


const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

function getCards(listId) {
  
 return  fetch(
      `https://api.trello.com/1/lists/${listId}/cards?key=${keyValue}&token=${tokenValue}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })      
      .catch((error) => {
        console.log('Error getting card info:',error.message);

        
      });
}



module.exports = getCards;
