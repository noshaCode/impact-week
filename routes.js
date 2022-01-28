const express = require("express");
const {allQuestions}= require("./controllers/controllers.js")

const router = express.Router();


router.get("/",allQuestions)




module.exports = router;