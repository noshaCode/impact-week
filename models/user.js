const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const { isEmail } = require("validator");
const res = require("express/lib/response");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [2, "Minimum name length is 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [2, "Minimum password length is 2 characters"]
    }


}, { timestamps: true });

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})



//// login db baraah fix it

userSchema.statics.logIn = async function(email, password) {
    if(email == '') throw new Error('Email is empty!');
    if(password == '') throw new Error('Password is empty!');

    try {
        const user = await this.findOne({ email });
        // compare password with user.password
        const auth = await bcrypt.compare(password, user.password);
        if(auth) return user;
        throw new Error('Incorrect Password!');
    } catch (error) {
        throw new Error('Incorrect Email!');
       
    }
}
const User = mongoose.model("User", userSchema);
module.exports = User;