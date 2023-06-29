const express = require('express');
const mongoose = require('mongoose');
const app = express();

//routes
app.get('/',(req,res)=>{
    res.send("Hello node API- this is Piyush - your developer");
})
app.get('/blog',(req,res)=>{
    res.send('Hello blog');
})
app.listen(3001, () => {    //connecting express
    console.log("server is running successfully!");
});