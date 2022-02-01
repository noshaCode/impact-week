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




module.exports = router;