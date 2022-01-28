const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const qSchema = new Schema({
    question:{
        type:String,
        required: true,
        minlength: 15
    },
  
    description:{
        type:String,
        required: true,
        minlength: 40
    },
  

},{ timestamps: true });


const Question = mongoose.model("Question",qSchema);
module.exports = Question;