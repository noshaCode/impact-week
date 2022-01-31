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

    Question.findById(id)
        .then((result) => {
            if (result) {
                res.render("readQuestion", { result });
            } else {
                res.redirect("/")
            }

        })
        .catch((err) => {
            console.log(err);

        })
}

const showFormQuestion = (req, res) => {
    res.render('createQuestionForm', { errorMessage: '' })
}


const creatQuestion = async (req, res) => {
    const body = req.body

    try {
        await Question.create({
            question:body.question,
            description: body.description
        })
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.render("createQuestionForm", { errorMessage: error })
    }


}

const updateOuestion = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Question.findById(id)
        res.render("editQuestion", {result})

    } catch (err) {
        res.render("editQuestion", { err: err })

    }

}

const questionWithEdit = (req,res) => {
   const id = req.params.id
   const body = req.body

   Question.findByIdAndUpdate(id, body)
   .then((result)=>{
       res.redirect("/")
   })
   .catch((err)=>{
       res.render("editQuestion",{err : err})
   })


}





module.exports = { allQuestions, readQuestion, creatQuestion, showFormQuestion, updateOuestion, questionWithEdit }