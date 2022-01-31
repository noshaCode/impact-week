const express = require("express");
const {allQuestions,readQuestion,creatQuestion,showFormQuestion,updateOuestion,questionWithEdit}= require("./controllers/qcontrollers.js")

const router = express.Router();


router.get("/",allQuestions)
router.get("/question/:id",readQuestion)

router.get("/new/question",showFormQuestion)
router.post("/new/question",creatQuestion)

router.get("/edit/question/:id",updateOuestion)
router.post("/edit/question/:id",questionWithEdit)

// router.get('/delete/article/:id', deleteQuestion)




module.exports = router;