//// init code
require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors =require('cors');
const app=express();
const port=process.env.PORT;
const database=require('./database');
const userController=require('./controlars/user');
///middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', userController);

///default route
app.all(
    '/',(req,res)=>{
        return res.json({
            status:true,
            message:'index page is working.....'
        });
    }
);
////start server
app.listen(port,()=>{
    console.log('server running is on:'+port);
})