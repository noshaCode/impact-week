const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { handleSignupError } = require('./errorHandling.js')
const bcrypt = require('bcrypt')

const maxAge = 8 * 24 * 60 * 60; // 8 days in seconds
const createJwtToken = (id) => jwt.sign({ id }, "my password", { expiresIn: maxAge })


// GET Request to show signup form
const showSignupForm = (req, res) => {

    res.render('auth/signup',{err: "", pageTitle:"Signup"})

}

//POST Request for signup Form Submit
const signupFormSubmit = async (req, res) => {
    const body = req.body
    const password = body.password;
    const repeatPassword = body.repeatPassword;
    try {
        if (repeatPassword !== password) {
            throw new Error("repeatPasswordError")
        }
        const user = await User.create({
            name: body.name,
            email: body.email,
            password: body.password
        });
        // console.log(token)


        const token = createJwtToken(user.id)

        res.cookie("jwtToken", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/')

    } catch(err) {
       console.error("oops an error",err)
       const errorsList = handleSignupError(err)
       res.render('auth/signup',{err: errorsList, pageTitle:"Signup"})

    }
}

///////////////////////////////////////
//start LogIn / LogOut Functions
///////////////////////////////////////
const logInFunc = async (req, res) => {
    if (req.method === 'GET') {

        res.render('auth/login', { pageTitle: 'Log In', err: "" });
    };

    if (req.method === 'POST') {

        const { email, password } = req.body;

        if (email == '' || password == '') {
            res.render('auth/login', { pageTitle: 'Log In', err: " Please Fill all Fields" })

        } else {
            const user = await User.findOne({ email: email });

            if (!user) {
                res.render('auth/login', { pageTitle: 'Log In',err: "User doesn't exist yet. Register first please!" })
            } else {
                const matchedPassword = await bcrypt.compare(password, user.password)

                if (!matchedPassword) {
                    res.render('auth/login', {  pageTitle: 'Log In',err: "Password is not correct" })
                } else {
                    /// now you can log in
                    User.logIn(email, password)
                        .then(user => {
                            const token = createJwtToken(user.id);
                            res.cookie('jwtToken', token, { httpOnly: true, maxAge: maxAge * 1000 });
                            res.redirect('/');
                        })
                        .catch(err => console.log(err))

                }

            }




        };
    }
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
