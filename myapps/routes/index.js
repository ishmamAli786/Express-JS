var express = require('express');
var emplModel=require('../module/employee');
var router = express.Router();
var employee=emplModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec((error,data)=>{
    if(error) throw error
    else res.render('index', { title: 'Employee Records', records: data });
  })

});
router.post("/",function(req,res,next){
  var emplDetails=new emplModel({
    name:req.body.uname,
    email:req.body.email,
    type:req.body.type,
    rate:req.body.rate,
    hour: req.body.hour,
    total:parseInt(req.body.rate)*parseInt(req.body.hour)
  })
  emplDetails.save(function(erros,res1){
    if(erros) throw erros
    employee.exec((error, data) => {
      if (error) throw error
      else res.render('index', { title: 'Employee Records', records: data });
    });
  });


 
})
module.exports = router;
