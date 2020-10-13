const express=require('express');
const router=express.Router();



router.get('/',(req,res)=>{
    var out=`<h2>Welcome To Our Courses Section.</h2>`;
    out +=`<a href="courses"></a><br/>>`;
    out +=`<a href="courses/andorid_tutorial"></a><br/>>`;
    out +=`<a href="courses/express_tutorial"></a><br/>>`;
    out +=`<a href="courses/mongodb_tutorial"></a><br/>>`;
    res.send(out);
   
});
router.get('/android_tutorial',(req,res)=>{
    var out=`<h2>Welcome To Our Android Section.</h2>`;
    out +=`<a href="courses"></a><br/>>`;
    out +=`<a href="courses/andorid_tutorial"></a><br/>>`;
    out +=`<a href="courses/express_tutorial"></a><br/>>`;
    out +=`<a href="courses/mongodb_tutorial"></a><br/>>`;
    res.send(out);
   
});
router.get('/express_tutorial',(req,res)=>{
    var out=`<h2>Welcome To Our Express Section.</h2>`;
    out +=`<a href="courses">Courses Indexed Page</a><br/>>`;
    out +=`<a href="courses/andorid_tutorial"></a><br/>>`;
    out +=`<a href="courses/express_tutorial"></a><br/>>`;
    out +=`<a href="courses/mongodb_tutorial"></a><br/>>`;
    res.send(out);
   
});
router.get('/mongodb_tutorial',(req,res)=>{
    var out=`<h2>Welcome To Our Mongodb Section.</h2>`;
    out +=`<a href="courses"></a><br/>>`;
    out +=`<a href="courses/andorid_tutorial"></a><br/>>`;
    out +=`<a href="courses/express_tutorial"></a><br/>>`;
    out +=`<a href="courses/mongodb_tutorial"></a><br/>>`;
    res.send(out);
   
});
module.exports=router;