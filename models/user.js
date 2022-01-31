const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
        minlength: 2
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

userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})



//// login db

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


const User = mongoose.model("User",userSchema);
module.exports = User;