const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const User = require('../models/user')
//const Question = require('../models/question')


const answerSchema = new Schema({
     answer: {
          type: String,
          required: true,

     },
    // user: {
//
    //      type: Schema.Type.ObjectId,
    //      ref: User
//
//
    // },
    // question: {
    //      type: Schema.Type.ObjectId,
    //      ref: Question
    // }


}, { timestamps: true });

module.exports = mongoose.model('answer', answerSchema)