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

/////// Read The Data of Registered Student
app.get('/students',async (req,res)=>{
    try{
        const studentsData=await studentModel.find({});
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const _id =req.params.id;
        const studentData=await studentModel.findById({_id:_id});
        res.send(studentData);
    } catch (e) {
        res.send(e);
    }
});

app.get('/studentss/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const studenData = await studentModel.findOne({ name: name });
        res.send(studenData);
    } catch (e) {
        res.send(e);
    }
});


///Update Students by id
app.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = await studentModel.findByIdAndUpdate( _id,req.body,{new:true} );
        res.send(updateData);
    } catch (e) {
        res.status(401).send(e);
    }
});


app.delete('/students/:id',async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateData = await studentModel.findByIdAndRemove({_id});
        res.send(updateData);
    } catch (e) {
        res.status(401).send(e);
    }
})

app.listen(port,()=>{
    console.log(`Server Is Running on Port ${port}`)
})