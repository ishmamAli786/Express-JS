var express = require('express');
var router = express.Router();
const EmpModel = require('../models/employee');
const uploadModel = require('../models/upload');
const multer=require('multer');
const path=require('path');

router.use(express.static(__dirname+"./public"));
var Storage=multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload=multer({
  storage: Storage
}).single('file');

/* GET home page. */
router.get('/', function(req, res, next) {
  const employee = EmpModel.find({});
  employee.exec((err,data)=>{
    if(err) throw err
    if(data){
      res.render('index', { title: 'Employee Records', data: data, success:'' });
    }
  })
});


router.post('/', function (req, res, next) {
  // const { uname, email, etype, hrlyrate, ttlhr } = req.body;
  var employee = new EmpModel({
    name: req.body.name, email: req.body.email, etype: req.body.emptype, hourlyrate: req.body.hourlyRate, totalHour: req.body.tthlr, total: parseInt(req.body.hourlyRate) * parseInt(req.body.tthlr)
  });
  employee.save((err,data)=>{
    if(err) throw err;
    if(data){
      const employees = EmpModel.find({});
      employees.exec((err, data) => {
        if (err) throw err
        if (data) {
          res.render('index', { title: 'Employee Records', data: data,success:"Record Inserted Successfully" });
        }
      })
    }
  })

});



router.post('/search', function (req, res, next) {
  const name = req.body.filtername;
  const email = req.body.filteremail;
  const etype = req.body.emptype;
  if(name !='' && email !='' && etype !=''){
    // var flterParameter = { $and: [{ name: name},{$and:[{email:email},{etype:etype}]}]}
    var flterParameter={name,email,etype}
  } else if (name != '' && email == '' && etype != ''){
    // var flterParameter = { $and: [{ name: name },  { etype: etype }]}
    var flterParameter = { name,  etype }
  } else if (name == '' && email != '' && etype != ''){
    var flterParameter = { email, etype }
    // var flterParameter = { $and: [{ email:email }, { etype: etype }] }
  } else if (name == '' && email == '' && etype != '') {
    var flterParameter = {etype }
    // var flterParameter = { $and: [{ email:email }, { etype: etype }] }
  }
  else{
    var flterParameter={}
  }
  const employees = EmpModel.find(flterParameter);
      employees.exec((err, data) => {
        if (err) throw err
        if (data) {
          res.render('index', { title: 'Employee Records', data: data });
        }
      })

});

router.get('/delete/:id',(req,res,next)=>{
  var _id=req.params.id;
  var delet=EmpModel.findByIdAndDelete(_id);
  delet.exec((err,result)=>{
    if(err) throw err;
    if(result){
      const employees = EmpModel.find({});
      employees.exec((err, data) => {
        if (err) throw err
        if (data) {
          res.render('index', { title: 'Employee Records', data: data, success: "Record Deleted Successfully" });
        }
      })
    }
  })
 
});


// router.get('/edit/:id',(req,res,next)=>{
//   const id=req.params.id;
//   const edit=
// })

router.get('/edit/:id',(req,res,next)=>{
  const ids=req.params.id;
  const edit=EmpModel.findById(ids);
  edit.exec((err,data)=>{
    if(err) throw err;
    if(data){
      res.render('edit',{title:"Edit Employee Records",result:data})
    }
  })
})

router.post('/update',(req,res,next)=>{
  const update = EmpModel.findByIdAndUpdate(req.body.id,{
    name: req.body.name, email: req.body.email, etype: req.body.emptype, hourlyrate: req.body.hourlyRate, totalHour: req.body.tthlr, total: parseInt(req.body.hourlyRate) * parseInt(req.body.tthlr)
  })

  update.exec((err, data) => {
    if (err) throw err;
    if (data) {
      const employees = EmpModel.find({});
      employees.exec((err, data) => {
        if (err) throw err
        if (data) {
          res.render('index', { title: 'Employee Records', data: data, success: "Record Updated Successfully" });
        }
      })
    }
  })

})


router.get('/upload', (req, res, next) => {
  res.render('upload-file', { title: "Upload File", success: '', result: result })
});


router.post('/upload', upload ,(req, res, next) => {
  var imageFile=req.file.filename;
  var success =req.file.filename+"uploaded Successfully";
  var imageDetail = new uploadModel({ imagename: imageFile });
  imageDetail.save((err,data)=>{
    if(err) throw err;
    if(data){
      var imageData= uploadModel.find({});
      imageData.exec((err,result)=>{
        if(err) throw err;
        if(result){
          res.render('upload-file', { title: " Upload File", success: success,result:result })
        }
      })
    }
  })
});

module.exports = router;
