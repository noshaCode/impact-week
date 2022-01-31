const express = require("express");
const {allQuestions}= require("./controllers/controllers.js");

const {checkUser} = require('./middleWares/authMiddleWare');

const router = express.Router();


router.get("/",checkUser,allQuestions)



module.exports = router;