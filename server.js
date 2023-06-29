const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/',(req,res)=>{
    res.send("Hello node API- this is Piyush - your developer");
})
app.get('/blog',(req,res)=>{
    res.send('Hello blog');
})

app.get('/product',async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        //if product is not found
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }

        //returning the updated product
        const updatedproduct = await Product.findById(id);
        res.status(200).json(updatedproduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//deleting a product

app.delete('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        //if product is not found
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }
        //returning the deleted product
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.post('/product',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(
    "mongodb://0.0.0.0:27017/CRUD",
    {
        usenewUrlParser:"true",
        UseUnifiedTopology:"true"
    })
.then(() => {
    console.log("MongoDB connection is successful");
    app.listen(3001, () => {    //connecting express
        console.log("Node API is running successfully at port 3001");
    });
})
.catch(error => {
    console.error("Error connecting to MongoDB: "+error.message);
});
