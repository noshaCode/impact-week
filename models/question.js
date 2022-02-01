const mongoose =require("mongoose");
const User = require("../models/user")
const Schema = mongoose.Schema;

const qSchema = new Schema({
    question:{
        type:String,
        required: true,
        minlength: 5
    },
  
    description:{
        type:String,
        required: true,
        minlength: 5
       
    },
    user:{
        type: Schema.Types.ObjectId,
        ref : User
    }
  

},{ timestamps: true });


const Question = mongoose.model("Question",qSchema);
module.exports = Question;