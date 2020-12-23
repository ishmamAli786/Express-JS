const mongoose = require('mongoose');
const uploadSchema = new mongoose.Schema({
    imagename: String,
})
const UploadModel = new mongoose.model('uploadimage', uploadSchema)
module.exports = UploadModel;