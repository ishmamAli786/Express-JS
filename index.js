const express=require('express');
const app=express();
const courses=require('./courses');
app.use('/courses',courses);



app.get('/',(req,res)=>{
    res.send('welcome to express tutorial')
});
app.listen(80);
