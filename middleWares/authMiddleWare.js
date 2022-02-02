
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const access = async (req, res, next) =>{
    const token =req.cookies.jwtToken
        if (token){
            try {
                const authUser = await jwt.verify(token, "my password");
                next();
            }catch(err){
                res.redirect("/login")
            }
        } else{
            res.redirect("/login")
        }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    
    if(token){
        try {
            const authUser = await jwt.verify(token, "my password");
        
            User.findById(authUser.id)
                .then( user => {
                    const { id, name, email, createdAt, updatedAt } = user;
                    res.locals.user = {id, name, email, createdAt, updatedAt };
                    next();
                })
                .catch(err => {
                    res.locals.user = null;
                    next();
                })
        }
        catch (error) {
            res.locals.user = null;
            next();
        }
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    checkUser,
    access
}