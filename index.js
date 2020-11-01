require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const port=process.env.PORT;
const database=require('./database');
const userController=require('./controllers/user');

//// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', userController)

//// deafult routes
app.all('/',(req,res)=>{
    return res.json({
        status:true,
        messege:'Index Page Is Working......'
    })
})




///// start server
app.listen(port,()=>{
    console.log("Server is Running on Port 3000....")
})