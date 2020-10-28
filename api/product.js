var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
var productModel = require('../modules/product');


router.get('/',function(req,res,next){
    res.json({
        messege:"success",
    })
})

// router.get("/getAllProducts",function(req,res,next){
//     productModel
//     .find()
//     .select("product_name price quantity")
//     .exec()
//     .then(data=>{
//         res.status(200).json({
//             messege:"ok",
//             result:data
//         })
//     })
//         .catch(err=>{
//             res.json(err)
//         })
// });


// //// Add New Category Route
// router.post("/add",function(req,res,next){
//     var product_name=req.body.name;
//     var price=req.body.price;
//     var quantity = req.body.quantity;
//     var productDetails = new productModel({
//         _id: mongoose.Schema.Types.ObjectId,
//         product_name: product_name,
//         price: price,
//         quantity: quantity

//     });
//     productDetails.save()
//     .then(doc=>{
//         res.status(201).json({
//             messege:"Product Inserted Successfully",
//             result:doc
//         })
//     })
//     .catch(err=>{
//         res.json(err);
//     })
// })

module.exports=router;
