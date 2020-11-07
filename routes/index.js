var express = require('express');
var multer=require('multer');
var uploadModel=require('../modules/upload')
var path=require('path');
var jwt=require('jsonwebtoken');
const { findById, findByIdAndRemove } = require('../modules/employee');
var router = express.Router();
var empModel=require('../modules/employee');
var employee = empModel.find({});
var imgData = uploadModel.find({});

router.use(express.static(__dirname+"./public"));

// require localStorage
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



var Storage=multer.diskStorage({
  destination:"./public/uploads",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})
var upload=multer({
  storage:Storage,
}).single('file')



//// MiddleWare for Checking User is login or not
function checkLogin(req,res,next){
  var myToken=localStorage.getItem('myToken')
  try{
    jwt.verify(myToken,'loginToken');
  }catch(err){
    res.send("You Need  Login To Access this Data");
  }
  next();
}
router.get('/upload', function (req, res, next) {
  imgData.exec(function(err,doc){
    if(err) throw err;
    res.render('upload-file', { title: 'Upload File', records:doc,success: '' });
  })
});

router.post('/upload', upload,function (req, res, next) {
  var imageFile=req.file.filename;
  var success = req.file.filename + " uploaded Successfully ";
  var imgDetail = new uploadModel({ imagename: imageFile});
  imgDetail.save((err,data)=>{
    if(err) throw err;
    imgData.exec(function(err,doc){
      if(err) throw err;
      res.render('upload-file', { title: 'Upload File', records:doc ,success: success });
    });
  })
  
});





/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
  employee.exec(function(err,data){
    if(err) throw err;
    if(data){
      res.render('index', { title: 'Employee Records', records: data, success: '' });
    }
  });
});

router.get('/login', function (req, res, next) {
  var token=jwt.sign({foo:'bar'},'loginToken');
  localStorage.setItem('myToken',token);
  res.send("Login Successfully");
});

router.get('/logout', function (req, res, next) {
  localStorage.removeItem('myToken');
  res.send("logout Successfully");
});


router.post('/',function(req,res){
  var empDetail = new empModel({ name: req.body.uname, email: req.body.email, etype: req.body.etype, hourlyrate: req.body.hour, totalHour: req.body.total, total: parseInt(req.body.hour) * parseInt(req.body.total)});
  empDetail.save(function(err,res2){
    if(err) throw err;
     else{ employee.exec(function (err, data) {
        if (err) throw err;
        if (data) {
          res.render('index', { title: 'Employee Records', records: data,success:'Record Inserted Successfully' });
        }
     })
    };
  })
})
router.post('/search', function (req, res, next) {
  var fltrName = req.body.byname;
  var fltrEmail = req.body.email;
  if (fltrName != '' && fltrEmail !=''){
    var filterParameter={
      $and: [{ name: fltrName }, { email: fltrEmail}]
    }
  } else if(fltrName != '' && fltrEmail == ''){
    var filterParameter = {
      $or: [{ name: fltrName }, { email: fltrEmail }]
    }
  } else if (fltrName == '' && fltrEmail != ''){
    var filterParameter = {
      $or: [{ name: fltrName }, { email: fltrEmail }]
    }
  }else{
    var filterParameter={}
  }
  var employeeFilter = empModel.find(filterParameter);
  employeeFilter.exec(function (err, data) {
    if (err) throw err;
    if (data) {
      res.render('index', { title: 'Employee Records', records: data });
    }
  });
});

router.get('/delete/:id', function (req, res, next) {
  var id=req.params.id;
  var del = empModel.findByIdAndDelete(id)

  del.exec(function (err) {
    if (err) throw err;
      res.redirect("/");
  });
});


router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var edit = empModel.findById(id)

  edit.exec(function (err,data) {
    if (err) throw err;
    res.render("edit", { title: "Edit Employee Records", records:data});
  });
});


router.post('/update', function (req, res, next) {
  var update = empModel.findByIdAndUpdate(req.body.id, { name: req.body.uname, email: req.body.email, etype: req.body.etype, hourlyrate: req.body.hour, totalHour: req.body.total, total: parseInt(req.body.hour) * parseInt(req.body.total)})

  update.exec(function (err, data) {
    if (err) throw err;
    res.redirect('/')
  });
});



module.exports = router;
