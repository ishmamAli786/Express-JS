require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');
const multer=require('multer');
const path=require('path');
const mongoose=require('mongoose');
const Upload=require('./models/file');
const port=process.env.PORT || 3000

//// connection with database
mongoose.connect('mongodb://localhost:27017/uploadFile', { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true })
.then((data)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Database Failed To Connect")
})

app.set('view engine','ejs');
app.set('views','views')

app.use(express.static(__dirname + "./public/"));

var Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage
}).single('file');


app.get('/',(req,res)=>{
    const upload = Upload.find()
    upload.exec((err, data) => {
        if (err) throw err;
        if (data) {
            res.render('upload-file', { success: '', records: data})
        }
    })
});
app.post('/', upload, (req, res) => {
    var imageFile= req.file.filename;
    var success=req.file.filename+"Uploaded Successfully";
    var imageDetails = new Upload({ imagename: imageFile})
    imageDetails.save((err,data)=>{
        if(err) throw err;
        if(data){
            const upload = Upload.find({})
            upload.exec((err,data)=>{
                if(err) throw err;
                if(data){
                    res.render('upload-file', { success: success,records:data })
                }
            })
        }
    })
});


app.listen(port,()=>{
    console.log(`Server Is Running On Port ${port}.....`)
})