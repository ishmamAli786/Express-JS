const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParse:true});
var connection=mongoose.connection;

var employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    etype:String,
    hourlyrate:Number,
    totalHour:Number,
    total:Number,
});
var employeeModel=mongoose.model('users',employeeSchema);
module.exports=employeeModel;