const express=require('express');
const app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true, useUnifiedTopology: true});
var conn=mongoose.connection;
var employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    etype:String,
    hourrate: Number,
    totalHour: Number

});
var employeeModel = mongoose.model('Employee', employeeSchema);
var employee=new employeeModel({name:'ishmam',email:'ishmamalikhan@gmail.com',etype:'hourly',hourrate:10,totalHour:16});
app.get('/mongo',(req,res)=>{
    res.send(employee)
});
app.listen(3000)



// conn.on("connected",function(){
//     console.log('connection created successfully');
// })
// conn.on("disconnected",function(){
//     console.log('connection failed to Created');
// })
// conn.on('error',console.error.bind(console,'connection error'));



// conn.once('open',function(){
//     employee.save((error,response)=>{
//         if(error) throw error
//         else{
//             console.log(response)
//         }
//         conn.close()
//     })
// })


employeeModel.findById({_id:"5f8c70b8ae19ba2a90e4a455"},(error,data)=>{
    if(error) throw error
    else console.log(data);
    conn.close()
});