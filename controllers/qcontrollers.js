
const Question = require("../models/question");
const {handleQuestionsError}=require("./errorHandling")


const allQuestions = (req, res) => {
    Question.find()
        .then((questions) => {
            res.render("index", { questions: questions, pageTitle: "Home" });
        })
        .catch((err) => {
            console.log(err);
        })

}

const readQuestion = (req, res) => {
    const id = req.params.id;
    const user = res.locals.user //read

    const currentUserId = user ? user.id : "";

    Question.findById(id).populate('user')
        .then((result) => {
            if (result) {


            


                res.render("questions/readQuestion",{pageTitle:result.question, result,currentUserId });
            } else {
                res.redirect("/")
            }

        })
        .catch((err) => {
            console.log(err);

        })
}

const showFormQuestion = (req, res) => {
    res.render('questions/createQuestionForm', { pageTitle:"Add Questions",errorsList: '' })
}


const createQuestion = async (req, res) => {
    const body = req.body
    const user = res.locals.user //read

    try {
        await Question.create({
            question:body.question,
            description: body.description,
            user: user.id 
        })
        res.redirect("/")
    } catch (error) {
        console.error(error)
        const errorsList = handleQuestionsError(error)
        res.render("questions/createQuestionForm", { pageTitle:"Add Questions",errorsList })
    }


}

const updateQuestion = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Question.findById(id)
        res.render("questions/editQuestion", {result, pageTitle: "Edit Questions"})

    } catch (err) {
        res.render("questions/editQuestion", { pageTitle:"Edit Question",err: err })

    }

}

const questionWithEdit = (req,res) => {
   const id = req.params.id
   const body = req.body

   Question.findByIdAndUpdate(id, body)
   .then((result)=>{
        res.redirect(`/question/${id}`);
   })
   .catch((err)=>{
       res.render("questions/editQuestion",{err : err, pageTitle:"Edit Question" })
   })


}

const deleteQuestion = (req,res)=> {
    const id = req.params.id
   
    Question.findByIdAndDelete(id)
    .then((result)=>{
        res.redirect("/");
    })
    .catch((err)=>{
        res.redirect(`/question/${id}`);
    })
}

// const deleteQuestionValidate = (req,res)=> {
//     const id = req.params.id
//     const user = res.locals.user 
//     Question.findById(id)
//     .then((question)=>{
//         if (question.user == user.id) {
//             question.remove();
//             res.redirect("/");
//         } else {
//             res.redirect("/");
//         }
//     })
//     .catch((err)=>{
//         res.redirect(`/question/${id}`);
//     })
// }



module.exports = { allQuestions, readQuestion, createQuestion, showFormQuestion, updateQuestion, questionWithEdit,deleteQuestion }