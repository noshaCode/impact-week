const express = require("express");

const authRouter = express.Router();

const {signupForm,signupFormSubmit } = require('./controllers/authController')

authRouter.get('/signup', signupForm)
authRouter.post('/signup', signupFormSubmit)



module.exports = authRouter;