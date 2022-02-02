const express = require("express");

const authRouter = express.Router();

const {showSignupForm,signupFormSubmit } = require('./controllers/authController')

authRouter.get('/signup', showSignupForm)
authRouter.post('/signup', signupFormSubmit)

// Log In / Log Out router

const LogIn = require("./controllers/authController");


authRouter.all('/login', LogIn.logInFunc);
authRouter.get('/logout',LogIn.logOutFunc);

module.exports = authRouter;

//router.get('/login', controller.userLoggedIn, controller.getLogIn);
//router.post('/login', controller.postLogIn);
