const express = require("express");

const authRouter = express.Router();

const {signupForm,signupFormSubmit } = require('./controllers/authController')

authRouter.get('/signup', signupForm)
authRouter.post('/signup', signupFormSubmit)

// Log In / Log Out router

const LogIn = require("./controllers/authController");


authRouter.all('/login', LogIn.logInFunc);
authRouter.get('/logout',LogIn.logOutFunc);

module.exports = authRouter;