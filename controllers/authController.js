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


module.exports = {signupForm, signupFormSubmit}