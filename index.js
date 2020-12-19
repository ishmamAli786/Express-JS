const express=require('express');
const app=express();
const ejs=require('ejs');
const multer=require('multer');
const path=require('path');



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
    res.render('upload-file',{ success: ''})
});
app.post('/', upload, (req, res) => {
    var success=req.file.filename+"Uploaded Successfully";
    res.render('upload-file',{success:success})
});


app.listen(300,()=>{
    console.log("Server Is Running On Port 300.....")
})