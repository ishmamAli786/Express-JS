var express = require('express');
var router = express.Router();
var passCatModel = require('../modules/password_category');
var getPassCat = passCatModel.find({}, {'passord_category':1,"_id":1});

router.get('/getCategory',function(req,res,next){
    getPassCat.exec(function(err,data){
        if(err){
            console.log(err)
        }else{
            console.log('hello api')
        }
    })
})

router.post('/add-category', function (req, res, next) {
    var passCategory=req.body.pass_cat;
    var passCatDetails = new passCatModel({ passord_category: passCategory});
    passCatDetails.save(function(err,doc){
        if(err){
            console.log(err)
        }else{
            res.send('Success....Node js Restful Api Post Method is Working....')
        }
        next();
    })
   
})

router.put('/add-update-category/:id', function (req, res, next) {
    var id=req.params.id;
    var passCategory = req.body.pass_cat;
    passCatModel.findById(id,function(err,data){
        data.passord_category = passCategory ? passCategory :data.passord_category;
        data.save(function(err){
            if(err) throw err;
            res.send('Data Updated SuccessFully in PUT METHOD....')
        })
        
    })
})

router.patch('/update-category', function (req, res, next) {
    res.send('Node js Restful Api PATCH Method is Working....')
})


router.delete('/delete-category/:id', function (req, res, next) {
    var cat_id=req.params.id;
    passCatModel.findByIdAndRemove(cat_id,function(err,data){
        if(err) throw err;
        res.send('Node js Restful Api DELETE Successfully....')
    })
    
})




module.exports=router;