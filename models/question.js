const mongoose =require("mongoose");
const User = require("../models/user")
const Schema = mongoose.Schema;

const qSchema = new Schema({
    question:{
        type:String,
        required: [true,"Please enter a question"],
        minlength: [5,"Minimum question length is 5 characters"]
    },
  
    description:{
        type:String,
        required: [true,"Please enter a description"],
        minlength: [5,"Minimum description is 5 characters"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref : User
    }
  

},{ timestamps: true });


const Question = mongoose.model("Question",qSchema);
module.exports = Question;