const User = require("../models/user")
const jwt = require("jsonwebtoken")

const maxAge = 8 * 24 * 60 * 60; // 8 days in seconds
const createJwtToken =(id)=>jwt.sign({id}, "my password",{expiresIn: maxAge})


const signupForm = (req, res) => {
    res.render('auth/signup')
}

const signupFormSubmit = async (req, res) => {
  const body =req.body 

    try {
        const user = await User.create({
            name:body.name,
            email:body.email,
            password:body.password
        });
        // console.log(token)

        
        const token = createJwtToken(user.id)

        res.cookie("jwt",token,{httpOnly: true, maxAge: maxAge * 1000})
        res.redirect('/')
    } catch(error) {
       console.error(error)
       res.redirect('/')
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
    signupForm,
     logInFunc,
    logOutFunc,
 signupFormSubmit
}