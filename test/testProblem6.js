const boardName = "tempboard";
const createBoardAndLists=require('../problem6.js')

createBoardAndLists(boardName)
.catch((error)=>{
    console.log("Error Found :",error.message)
})