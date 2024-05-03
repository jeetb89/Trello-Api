const deleteAllLists=require('../problem8.js')
const boardName='tempboard'

deleteAllLists(boardName)
.catch((error)=>{
    console.log("Error Found :",error.message);
})