var express = require('express');
var router = express.Router();
var passCatModel = require('../modules/password_category');
var passModel = require('../modules/add_password');
const { route } = require('../routes');
var getPassCat = passCatModel.find({}, {'passord_category':1,'_id':1});
/// get All Category Route
router.get('/getCategory',function(req,res,next){
   /* getPassCat.exec(function(err,data){
        if(err){
            console.log(err)
        }else{
            // res.send(data)
            res.status(200).json({
                messege:"success",
                result:data
            })
        }
    })*/
    getPassCat.exec()
    .then(data=>{
        res.status(200).json({
            messege: "Success",
            result: data
        });
    })
    .catch(err=>{
        res.json(err)
    })
});


////// basic
router.get('/',function(req,res,next){
    res.send("Node Js Restful APi Get Method Is Working....")
});
//// ADD New Category

router.post('/add-category', function (req, res, next) {
    var passCategory=req.body.pass_cat;
    var passCatDetails = new passCatModel({ passord_category: passCategory});


    /*
    passCatDetails.save(function(err,doc){
        if(err){console.log (err)}
        // res.send("Successfull Node Js Restful APi POST Method Is Working....")
        else{res.status(201).json({
            messege:"Category Inserted Successfully",
            result:doc
        // })
    }
    })           */

    passCatDetails.save()
    .then(doc=>{
        res.status(201).json({
            messege: "Category Inserted Successfully",
            result: doc
        });
    })
    .catch(err=>{
        res.json(err);
    })

});

/////// add or Update Category

router.put('/add-update-category/:id', function (req, res, next) {
    var id=req.params.id;
    var passCategroy = req.body.pass_cat;
    passCatModel.findById(id,function(err,data){
        data.passord_category = passCategroy ? passCategroy : data.passord_category;
        data.save()
        .then(doc=>{
            res.status(201).json({
                messege: "Category Updated Successfully",
                result: doc
        });
    })
        .catch(err=>{
            res.json(err)
        })
    })
});
////Update Category
router.patch('/update-category/', function (req, res, next) {
    var id = req.body._id;
    var passCategroy = req.body.pass_cat;
    passCatModel.findById(id, function (err, data) {
        data.passord_category = passCategroy ? passCategroy : data.passord_category;
        data.save()
            .then(doc => {
                res.status(201).json({
                    messege: "Category Updated Successfully",
                    result: doc
                });
            })
            .catch(err => {
                res.json(err)
            })
    })
});
/////Delete Category
router.delete('/delete-category/:id', function (req, res, next) {
    var cat_id=req.params.id;
    /*
    passCatModel.findByIdAndRemove(cat_id,function(err,data){
        if(err) throw err;
        res.send("SuccessFully Record Deleted....")
    })    */


    passCatModel.findByIdAndRemove(cat_id)
    .then(doc=>{
        res.status(201).json({
            messege: "Category Deleted Successfully",
            result: doc
        });
    })
    .catch(err=>{
        res.json(err)
    })


    //////Get All Password Details
    router.get('/getAllPasswords', function (req, res, next) {
        passModel.find().exec()
            .then(data => {
                res.status(200).json({
                    messege: "success",
                    result: data
                });
            })
            .catch(err => {
                res.json(err);
            })

    });


    //// Add New Password
    router.post('/add-new-password',function(req,res,next){
        var passCategory=req.body.pass_cat;
        var projectName=req.body.project_name;
        var passwordDetails=req.body.password_details;
        var passDetails=new passModel({
            password_category: passCategory,
            project_name: projectName,
            password_detail: passwordDetails 
        });
        passDetails.save()
        .then(doc=>{
            res.status(201).json({
                messege:"password inserted successfully",
                result:doc
            });
        })
        .catch(err=>{
            res.json(err)
        })
      
    })



    //// Delete Password Records Route
    router.delete('/delete-password/',function(req,res,next){
        var password_id=req.body.password_id;
        passModel.findByIdAndRemove(password_id)
        .then(doc=>{
            res.status(201).json({
                messege: "Passeord Deleted Successfully",
                result: doc
            });
        })
        .catch(err=>{
            res.json(err)
        })
    })
});
module.exports=router;