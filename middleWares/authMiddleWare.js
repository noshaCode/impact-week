
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    
    if(token){
        try {
            const authUser = await jwt.verify(token, "my password");
        
            User.findById(authUser.id)
                .then( user => {
                    const { name, email, createdAt, updatedAt } = user;
                    res.locals.user = { id: user.id, name, email, createdAt, updatedAt };
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
    checkUser
}