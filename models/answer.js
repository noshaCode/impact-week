const mongoose =require("mongoose");
const Schema = mongoose.Schema;


const answerSchema = new Schema({
    answer:{
        // type:String,
     
    },
    userId:{
        // type:String,
       
    },
   questionId:{
        // type:String,

    }


},{ timestamps: true });