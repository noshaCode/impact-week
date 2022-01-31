const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {handleSignupError} = require('./errorHandling.js')

const maxAge = 8 * 24 * 60 * 60; // 8 days in seconds
const createJwtToken =(id)=>jwt.sign({id}, "my password",{expiresIn: maxAge})


// GET Request to show signup form
const showSignupForm = (req, res) => {
    res.render('auth/signup',{err: ""})
}

//POST Request for signup Form Submit
const signupFormSubmit = async (req, res) => {
  const body =req.body 
  const password = body.password;
  const repeatPassword = body.repeatPassword;
    try {
        if (repeatPassword !== password) {
            throw new Error("repeatPasswordError")
        } 
        const user = await User.create({
            name:body.name,
            email:body.email,
            password:body.password
        });
        // console.log(token)

        
        const token = createJwtToken(user.id)

        res.cookie("jwt",token,{httpOnly: true, maxAge: maxAge * 1000})
        res.redirect('/')
    } catch(err) {
       console.error("oops an error",err)
       const errorsList = handleSignupError(err)
       res.render('auth/signup',{err: errorsList})
    }
}


module.exports = {showSignupForm, signupFormSubmit}