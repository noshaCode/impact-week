const express = require("express");

const {allQuestions,readQuestion,creatQuestion,showFormQuestion,updateOuestion,questionWithEdit,deleteQuestion}= require("./controllers/qcontrollers.js")
 

const {checkUser} = require('./middleWares/authMiddleWare');

const router = express.Router();

router.get("/",checkUser,allQuestions)
router.get("/question/:id",checkUser, readQuestion)

router.get("/new/question",showFormQuestion)
router.post("/new/question",checkUser, creatQuestion)

router.get("/edit/question/:id",updateOuestion)
router.post("/edit/question/:id",questionWithEdit)

router.get('/delete/question/:id', deleteQuestion)


//Answer router
const Answer = require("./controllers/answerController")


// router.get("/", checkUser,Answer.AllAnswer)

router.get("/answer/:id",Answer.ReadAnswer)

router.get("/new/answer",Answer.ShowAnswerForm)
router.post("/new/answer",Answer.CreatAnswer)

router.get("/edit/answer/:id",Answer.UpdateAnswer)
router.post("/edit/answer/:id",Answer.AnswerWithEdit)

router.get('/delete/answer/:id', Answer.DeleteQuestion)



module.exports = router;