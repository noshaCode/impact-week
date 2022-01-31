const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const {isEmail}= require ("validator")

const userSchema = new Schema({
    name:{
        type:String,
        required: [true,"Please enter your name"],
        minlength: [2, "Minimum name length is 2 characters"]
    },
    email:{
        type:String,
        required: [true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength: [2,"Minimum password length is 2 characters"]
    }


},{ timestamps: true });

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})



const User = mongoose.model("User",userSchema);
module.exports = User;