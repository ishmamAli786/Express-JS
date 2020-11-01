const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    var out=`<h2>Welcome to Courses Section</h2>`;
    out += `<a href="/courses>Courses Index Page</a> </br>`;
    out += `<a href="/courses/android_tutorials">Android Tutorials</a> </br>`;
    out += `<a href="/courses/expressJS_tutorials">expressJS Tutorials</a> </br>`;
    out += `<a href="/courses/mongoDB_tutorials">mongoDB Tutorials</a> </br>`;
    res.send(out);
})


router.get('/android_tutorials', (req, res) => {
    var out = `<h2>Welcome to Android Section</h2>`;
    out += `<a href="/courses>Courses Index Page</a> </br>`;
    out += `<a href="/courses/android_tutorials">Android Tutorials</a> </br>`;
    out += `<a href="/courses/expressJS_tutorials">expressJS Tutorials</a> </br>`;
    out += `<a href="/courses/mongoDB_tutorials">mongoDB Tutorials</a> </br>`;
    res.send(out);
})


router.get('/expressJS_tutorials', (req, res) => {
    var out = `<h2>Welcome to expressJS Section</h2>`;
    out += `<a href="/courses>Courses Index Page</a> </br>`;
    out += `<a href="/courses/android_tutorials">Android Tutorials</a> </br>`;
    out += `<a href="/courses/expressJS_tutorials">expressJS Tutorials</a> </br>`;
    out += `<a href="/courses/mongoDB_tutorials">mongoDB Tutorials</a> </br>`;
    res.send(out);
})




router.get('/mongoDB_tutorials', (req, res) => {
    var out = `<h2>Welcome to mongoDB Section</h2>`;
    out += `<a href="/courses>Courses Index Page</a> </br>`;
    out += `<a href="/courses/android_tutorials">Android Tutorials</a> </br>`;
    out += `<a href="/courses/expressJS_tutorials">expressJS Tutorials</a> </br>`;
    out += `<a href="/courses/mongoDB_tutorials">mongoDB Tutorials</a> </br>`;
    res.send(out);
})




// router.get('/', (req, res) => {
//     var out = `<h2>Welcome to Courses Section</h2>`;
//     out += `<a href="/courses>Courses Index Page</a> </br>`;
//     out += `<a href="/courses/android_tutorials">Android Tutorials</a> </br>`;
//     out += `<a href="/courses/expressJS_tutorials">expressJS Tutorials</a> </br>`;
//     out += `<a href="/courses/mongoDB_tutorials">mongoDB Tutorials</a> </br>`;
//     res.send(out);
// })




module.exports = router;