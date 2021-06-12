// const express = require('express')
import express from 'express'
import fs from 'fs'
import cors from 'cors'
const morgan = require('morgan')
const mongoose = require("mongoose");
const { MONGO_URI } = require('./config/keys')
require('dotenv').config();
// InstagramClone@123
// mongodb+srv://prakhar:<password>@cluster0.i8uah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// app variable mein pura server aa chuka he
// database connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true },)
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
const app = express();
// for cors error
app.use(cors())

app.use(morgan("dev"))
// this is the body parser for json data
app.use(express.json())
// route middleware
fs.readdirSync('./routes').map((r)=>
    app.use('/api', require(`./routes/${r}`))
);

// app.use('/api',router)


if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    const path = require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
const port = process.env.port || 8000
app.listen(port,()=>console.log(`Server is running on ${port}`))
