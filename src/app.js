require("../src/db/conn");
const express=require('express');
const Student = require("../src/models/students");
const app=express();
const port=process.env.PORT || 3000;
const studentModel=require('../src/models/students');


app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is main Route");
})

app.post('/students',(req,res)=>{
    const user = new studentModel(req.body);
    user.save((err,data)=>{
        if(err){
            res.json({
                status:"false",
                messege:"Data Failed to insert into Database",
                err:err
            })
        }else{
            res.json({
                status: "true",
                messege: "Data Inserted Successfully into Database",
                data: data
            })
        }
    })
});

app.listen(port,()=>{
    console.log(`Server Is Running on Port ${port}`)
})