const res = require("express/lib/response");
const Question = require("../models/question")

const allQuestions = (req, res) => {
    Question.find()
        .then((questions) => {
            res.render("index", { questions: questions });
        })
        .catch((err) => {
            console.log(err);
        })

}

const readQuestion = (req, res) => {
    const id = req.params.id;
    const user = res.locals.user 

    const currentUserId = user ? user.id : "";

    Question.findById(id).populate('user')
        .then((result) => {
            if (result) {
                res.render("questions/readQuestion", { result, currentUserId });
            } else {
                res.redirect("/")
            }

        })
        .catch((err) => {
            console.log(err);

        })
}

const showFormQuestion = (req, res) => {
    res.render('questions/createQuestionForm', { errorMessage: '' })
}


const creatQuestion = async (req, res) => {
    const body = req.body
    const user = res.locals.user 

    try {
        await Question.create({
            question:body.question,
            description: body.description,
            user: user.id 
        })
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.render("questions/createQuestionForm", { errorMessage: error })
    }


}

const updateOuestion = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Question.findById(id)
        res.render("questions/editQuestion", {result})

    } catch (err) {
        res.render("questions/editQuestion", { err: err })

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
       res.render("questions/editQuestion",{err : err})
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



module.exports = { allQuestions, readQuestion, creatQuestion, showFormQuestion, updateOuestion, questionWithEdit,deleteQuestion }