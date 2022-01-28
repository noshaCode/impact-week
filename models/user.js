const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
        minlength: 15
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        minlength:2
    }


},{ timestamps: true });

userSchema.pre("save", async(next) => {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



const User = mongoose.model("User",userSchema);
module.exports = User;