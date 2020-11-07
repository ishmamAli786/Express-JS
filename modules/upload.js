var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorials-website', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const conn = mongoose.connection;

var uploadSchema = new mongoose.Schema({
    imagename:String,
});



var uploadModel = mongoose.model('UploadImg', uploadSchema);
module.exports = uploadModel;