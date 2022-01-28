const Question  = require("../models/question")

const  allQuestions =(req,res)=>{
    Question.find()
    .then((questions)=>{
   
       res.render("index", {questions : questions});
   })
   .catch((err)=>{
       console.log(err);
   }) 
    
}




module.exports = {allQuestions}