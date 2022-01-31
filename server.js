const express = require('express');
const mongoose =require("mongoose");
const cookieParser = require('cookie-parser');
require('dotenv').config()

const router = require("./routes")
const authRouter = require("./auth-routes")

const app = express();
const databaseUrlLocal = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/${process.env.DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
const databaseUrMongo = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pwc4b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(databaseUrMongo)
.then((result)=>{
    app.listen(4000, () => {
        console.log('Listening to port4000 ...');
    })
})
.catch((err)=>console.log(err));



app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(authRouter);
app.use(router);
