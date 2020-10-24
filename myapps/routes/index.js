var express = require('express');
var multer=require('multer');
var path=require('path');
var empModel = require('../modules/employee');
var uploadModel = require('../modules/upload');
var router = express.Router();
var employee = empModel.find({});
var imageData = uploadModel.find({});
router.use(express.static(__dirname+"./public/"));


var Storage=multer.diskStorage({
  destination:"./public/upload/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});
var upload=multer({
  storage:Storage,
}).single('file');


/* GET home page. */
router.post('/upload/', upload, function (req, res, next) {
  var imageFile=req.file.filename;
  var success=req.file.filename+"uploaded successfully";
  var imageDetails = new uploadModel({ imagename: imageFile});

imageDetails.save(function(err,doc){
  if(err) throw err;
  imageData .exec((err,data)=>{
    if(err) throw err;
    res.render('upload-file', { title: 'Upload File',records:data, success: success });
  });
});
router.get('/upload/', function (req, res, next) {
  imageData.exec((err, data) => {
    if (err) throw err;
    res.render('upload-file', { title: 'Upload Record', records: data, success: success });
  
});
});
router.get('/', function(req, res, next) {
  employee.exec((err,data)=>{
    if(err) throw err;
    else res.render('index', { title: 'Employee Records', records: data, success: 'Record inserted Successfully'});
  });

});

router.post("/",(req,res,next)=>{
  var empDetails = new empModel({ name: req.body.uname, email: req.body.email, etype: req.body.emptype, hourlyrate: req.body.hrlyrate, totalHour: req.body.ttlhr, total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr),})
  empDetails.save(function(err,res1){
    if(err) throw err;
    employee.exec((err, data) => {
      if (err) throw err;
      res.render('index', { title: 'Employee Records', records: data, success:'Record inserted Successfully' });
    }); 
  });
  
});



router.post('/search/',(req,res)=>{
  var flrtName = req.body.uname;
  var flrtEmail = req.body.email;
  var flrteType = req.body.emptype;
  if(flrtName!='' && flrtEmail!='' && flrteType!=''){
    var filterParamter={$and:[{
      name: flrtName},
      { $and: [{ email: flrtEmail }, {etype: flrteType}]}
      ]
    }
  } else if (flrtName != '' && flrtEmail == '' && flrteType != ''){
    var filterParamter = {
      $and: [{
        name: flrtName
      },
      { $or: [{ email: flrtEmail }, { etype: flrteType }] }
      ]
    }
  } else if (flrtName == '' && flrtEmail != '' && flrteType != ''){
    var filterParamter={ $and: [{
    email: flrtEmail}
    , { etype: flrteType } 
    ]
    } 
  }else{
    var filterParamter={}
  }
  var employeeFilter = empModel.find(filterParamter);
  employeeFilter.exec((err, data) => {
    if (err) throw err
    else res.render('index', { title: 'Employee Records', records: data });
  });
});


router.get('/delete/:id', function (req, res, next) {
  var id=req.params.id;
  var del=empModel.findByIdAndDelete(id)
  del.exec((err) => {
    if (err) throw err
    else res.redirect("/");
  });

});




router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var edit = empModel.findById(id)
  edit.exec((err, data) => {
    if (err) throw err
    else res.render('edit', { title: 'Edit Employee Records', records: data });
  });

});


router.post('/update/', function (req, res, next) {
  var update = empModel.findByIdAndUpdate(req.body.id, { name: req.body.uname, email: req.body.email, etype: req.body.emptype, hourlyrate: req.body.hrlyrate, totalHour: req.body.ttlhr, total: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)})
  update.exec((err, data) => {
    if (err) throw err
    else res.redirect('/')
  });

});


module.exports = router;
