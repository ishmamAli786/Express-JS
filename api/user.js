var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var userModel=require('../modules/user');
const bcrypt=require('bcrypt');

router.post('/signup',function(req,res,next){
    var user_name=req.body.username;
    var email=req.body.email;
    var password=req.body.password;
    var confrimPassword = req.body.confrimPassword ;
    if (password !== confrimPassword){
        res.json({
            messege: "PASSWORD NOT MATCH",
        })
    }else{
        bcrypt.hash(password,10,function(err,hash){
            if(err){
                return res.json({
                    messege:"Something Wrong Try Later",
                    records: err
                })
            }else{
                console.log(hash)
                var userDetails = new userModel({ _id:mongoose.Types.ObjectId(), username: user_name, email: email, password: hash });
                userDetails.save()
                    .then(doc => {
                        res.status(201).json({
                            messege: "user register successfully",
                            result: doc
                        });
                    })
                    .catch(err => {
                        res.json(err);
                    }) 
            }
        })
    }
})
module.exports=router;