const express=require('express');
const router=new express.Router();




//// 2. WE Need to Define the Router
router.get('/ishmam', (req, res) => {
    res.send("Hello Whatsapup")
})
module.exports=router;