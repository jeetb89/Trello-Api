const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue =
  "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

const createBoard= require('../problem2.js')

  createBoard("newboard")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log("Error Found :", error);
  });