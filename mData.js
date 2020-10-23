const express =require('express');
const app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });
var conn =mongoose.connection;
var employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    etype:String,
    hourlyrate:Number,
    totalHour:Number,
    total:Number
})
employeeSchema.methods.totalSalary =()=>{
    return employees.hourlyrate * employees.totalHour;
}

var employeeModel=mongoose.model('employee',employeeSchema);
var employees = new employeeModel({name:'ishmam',email:'ishmamalikhan@gmail.com',etype:'hourly',hourlyrate:10,totalHour:16});
// console.log(employees);


// app.get('/',(req,res)=>{
//     res.send("Total income of employee is:"+ parseInt(employees.hourlyrate) * parseInt(employees.totalHour))
// }).listen(3000)



employees.total=employees.totalSalary();


conn.on("connected",()=>{
    console.log('connection created successfully');
});
conn.on("disconnected", () => {
    console.log('connection failed to create');
});


conn.on('error',console.error.bind(console,'connection error:'));

conn.once('open',()=>{
    // employees.save((err,resp)=>{
    //     if(err) throw err
    //     else console.log(resp)
    //     conn.close();
    // })
    employeeModel.findOneAndDelete({totalHour:80},function(err,data){
        if(err) throw err
        else console.log(data)
        conn.close();
    });
})