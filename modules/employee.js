const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });
const conn=mongoose.connection;


var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    total: Number
})
var employeeModel = mongoose.model('employee', employeeSchema);
module.exports=employeeModel;