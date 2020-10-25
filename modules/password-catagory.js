const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', { useNewUrlParser: true, useCreateIndex: true, });
var conn = mongoose.connection;
var Passcatchema = new mongoose.Schema({
    password_category: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


var passCatModel = mongoose.model('password_categories', Passcatchema);
module.exports = passCatModel;