const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    name:String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour:Number,
    total:Number,
    image:String,
})
const employeModel = new mongoose.model('employee', employeeSchema)
module.exports = employeModel;