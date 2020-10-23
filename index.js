const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const { check, validationResult } = require('express-validator/check');
app.set('view engine','twig');
app.set('views','./views');


// app.get('/',(req,res)=>{
//     res.render('index',{title:"twig",messege:"Twig File"})
// });
var urlencodedParserr = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index', { title: "Login Form", messege: "Enter UserName And Password" })
});



app.post('/', urlencodedParserr,[check('username','username is inavlid').isEmail(),
check('password','password is invalid').isLength({min:5})




],(req, res) => {
    const errors=validationResult(req)
    console.log(errors.mapped())
    res.render('login', { title: "Users Details", error:errors.mapped()})
});


app.get('/about/:a-:b', (req, res) => {
    res.render('about', { title: "about", sum: parseInt(req.params.a) + parseInt(req.params.b), sub: parseInt(req.params.a) - parseInt(req.params.b) })
});







app.listen(3000,()=>{
    console.log("server running on port 3000")
})