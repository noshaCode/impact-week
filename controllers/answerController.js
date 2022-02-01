const res = require("express/lib/response");
const Answer = require("../models/answer")


const AllAnswer = (req, res) => {
    
    Answer.find()
        .then((answer) => {

              res.render("index", { answers: answer});
    //        console.log(answer);
        })
        .catch((err) => {
            console.log(err);
        })

}


const ReadAnswer = (req, res) => {
    const id = req.params.id;

    Answer.findById(id)
        .then((result) => {
            if (result) {
                res.render("answers/ReadAnswer", { result });
            } else {
                res.redirect("/")
            }

        })
        .catch((err) => {
            console.log(err);

        })
}

const ShowAnswerForm = (req, res) => {
    res.render('answers/CreatAnswerForm', { errorMessage: '' })
}



const CreatAnswer = async (req, res) => {
    const body = req.body

    try {
        await Answer.create({
            answer:body.answer,
            
        })
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.render("answers/CreatAnswerForm", { errorMessage: error })
    }

}


const UpdateAnswer = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Answer.findById(id)
        res.render("answers/EditAnswer", {result})

    } catch (err) {
        res.render("answers/EditAnswer", { err: err })

    }

}


const AnswerWithEdit = (req,res) => {
    const id = req.params.id
    const body = req.body
 
    Answer.findByIdAndUpdate(id, body)
    .then((result)=>{
         res.redirect(`/answer/${id}`);
    })
    .catch((err)=>{
        res.render("answer/EditAnswer",{err : err})
    })
 
 
 }

 
const DeleteQuestion = (req,res)=> {
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
    AllAnswer,
    CreatAnswer,
    ReadAnswer,
    ShowAnswerForm,
    UpdateAnswer,
    AnswerWithEdit,
    DeleteQuestion,
}