const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', { useNewUrlParser: true, useCreateIndex: true, });
var conn = mongoose.connection;
var PassSchema = new mongoose.Schema({
    password_category: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    project_name: {
        type: String,
        required: true,
    },
    password_detail: {
        type: String,
        required: true,
    },
    
    date: {
        type: Date,
        default: Date.now,
    },
});


var passModel = mongoose.model('password_details', PassSchema);
module.exports = passModel;