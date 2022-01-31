const express = require("express");

const authRouter = express.Router();

const {showSignupForm,signupFormSubmit } = require('./controllers/authController')

authRouter.get('/signup', showSignupForm)
authRouter.post('/signup', signupFormSubmit)



module.exports = authRouter;