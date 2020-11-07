var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorials-website', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const conn = mongoose.connection;

var employeSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    total: Number
});



var employeeModel = mongoose.model('Employee', employeSchema);
module.exports=employeeModel;
