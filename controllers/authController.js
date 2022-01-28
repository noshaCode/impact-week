const User = require("../models/user")

const signupForm = (req, res) => {
    res.render('auth/signup')
}

const signupFormSubmit = async (req, res) => {
  const body =req.body 
  console.log(body)
    try {
        const newUser = await User.create({
            name:body.name,
            email:body.email,
            password:body.password
        });
  
        res.redirect('/')
    } catch(error) {
       console.error(error)
       res.redirect('/')
    }
}

module.exports = {signupForm, signupFormSubmit}