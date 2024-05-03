const deleteList=require('../problem7.js')
const boardName='tempboard'

deleteList(boardName)
.catch((error)=>{
    console.log(error)
})