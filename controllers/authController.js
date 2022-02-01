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

        res.cookie("jwtToken",token,{httpOnly: true, maxAge: maxAge * 1000})
        res.redirect('/')
    } catch(err) {
       console.error("oops an error",err)
       const errorsList = handleSignupError(err)
       res.render('auth/signup',{err: errorsList})
    }
}



//start LogIn / LogOut Functions

const logInFunc = (req, res) =>{
    if(req.method === 'GET'){
        
        res.render('auth/login', {pageTitle: 'Log In'});
    };

    if(req.method === 'POST'){
        const { email, password } = req.body;
        User.logIn(email, password)
            .then(user => {
                const token = createJwtToken(user.id);
                res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
                res.redirect('/');
            })
            .catch(err => console.log(err))
    };
}

const logOutFunc = (req, res) => {
    // res.cookie('jwtToken', '', {maxAge: 1});
    res.clearCookie('jwtToken');
    res.redirect('/');
}

module.exports = {
    showSignupForm,
     logInFunc,
    logOutFunc,
 signupFormSubmit
}
