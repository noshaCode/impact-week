const res = require("express/lib/response");
const Question = require("../models/question")
const Answer = require("../models/answer")
const {handleAnswersError}=require("./errorHandling")


const AnswerForm = async (req, res) => {
    console.log(req.params);
    if (req.method === 'GET') {
        const body = req.body
        const user = res.locals.user
        const id = req.params.id; 
        const question=await Question.findById(id).populate('user'); 

        console.log(req.params,question);
 
    res.render('answers/CreatAnswerForm', { errorsList2: '', pageTitle: "add answer",question:question}) 
    };

    if (req.method === 'POST') {
       // console.log("-------------------------44444444----------");          

        const body = req.body
        const user = res.locals.user
        const id = req.params.id; 

        const question=await Question.findById(id).populate('user'); 

        console.log(req.params,question);
        try {
            await Answer.create({
                answer:body.answer,
                user: user.id ,
                 question: question       
            })
            
            res.redirect("/")
        } catch (error) {
            console.error(error)
            let errorsList2 = handleAnswersError(error)
            res.render("answers/CreatAnswerForm", { errorsList2 })
        }        
       
}
}


const UpdateAnswer = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Answer.findById(id)
        console.log(result);
        res.render("answers/EditAnswer", {result , errorsList2 :''})

    } catch (err) {
        let errorsList2 = handleAnswersError(err)
    res.render("answers/EditAnswer", { errorsList2  })

    }

}


const AnswerWithEdit = (req,res) => {
    const id = req.params.id
     const body = req.body
      
 Answer.findByIdAndUpdate(id, body)
 .then((result) => {
         console.log("-------------------------------------------")
       const questionId = result.question.toString()
     res.redirect(`/question/${questionId}`);

 })
 .catch((err) => {

    let errorsList2 = handleAnswersError(err)
    res.render("answers/EditAnswer", { errorsList2  })
 })

 }
 

 
const DeleteAnswer = (req,res)=> {
    const id = req.params.id
    Answer.findByIdAndDelete(id)
    .then((result)=>{
        res.redirect("/");
    })
    .catch((err)=>{
        res.redirect(`/answer/${id}`);
    })
}


module.exports = {
 
    UpdateAnswer,
    AnswerWithEdit,
    DeleteAnswer,
    AnswerForm,
}