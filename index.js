const express=require('express');
const app=express();
const courses=require('./courses');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');

app.use('/courses',courses);

/// json parsing
app.use(bodyParser.json());

/// url encoded data parsing
app.use(bodyParser.urlencoded({extended:true}));

///// cookie parser setup
app.use(cookieParser());
//// session setup
app.use(session({ secret:"a7wCKC~9[!n%SQcX"}));
app.set('view engine','pug');
app.set('views','./views');
// function logInfo(req,res,next){
//     console.log('Hello from loginfo() MiddleWare.....');
//     next()
// }

// function addData(req,res,next){
//     var person={
//         name:"Ishmam ali Khan",
//         city:"Kamalia",
//     }
//     req.person = person;
//     next();
// };


// app.use('/profile/:id([0-3]{1})',function(req,res,next){
//     var names=['ishmam','ali','khan'];
//     req.name=names[req.params.id];
//     next();
// })

// app.get('/',logInfo,(req,res)=>{
//     res.send('Welcome to Indexed Page')
// });

// app.get('/person', addData,(req, res) => {
//     res.send('Name: '+req.person.name+' City '+req.person.city);
// });


// app.get('/profile/:id([0-3]{1})',(req, res) => {
//     res.send('Names :'+req.name)
// });
app.get('/registeration',(req,res)=>{
    res.render('registeration')
});


app.get('/handleForm',(req,res)=>{
    var temp = JSON.parse(JSON.stringify(req.query));
    console.log(temp.username)
    res.render('handleForm',{
        "data":{
            "name":req.query.username,
            "email": req.query.email,
            "password": req.query.password,
            "gender": req.query.gender,
            "city": req.query.city,
        }
    })
})



/// handleForm Page Post Method Routing
app.post('/handleForm',function(req,res){
    res.render('handleForm', {
        "data": {
            "name": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "gender": req.body.gender,
            "city": req.body.city,
        }
        });
})


app.get('/cookie_test',function(req,res){
    res.cookie('username','ishmam ali khan ');
    res.send('Cookie Set...')
});


app.get('/cookie_check', function (req, res) {

    // res.send('Value: ' + JSON.stringify(req.cookies));
    res.send('Value: ' + req.cookies.username);
});


app.get('/session_test',function(req,res){
    if(req.session.count){
        req.session.count++
        res.send("Count" + req.session.count);
    }else{
        req.session.count=2;
        res.send("Welcome First Time .count:" + req.session.count)
    }
})


app.listen(3000,()=>[
    console.log('Server is Running on Port 3000')
])