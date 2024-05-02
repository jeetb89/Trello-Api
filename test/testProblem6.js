const boardName = "tempboard";
const createBoardAndLists=require('../problem6.js')

createBoardAndLists(boardName)
.catch((error)=>{
    console.log(error)
})