const express=require('express');
const app=express();
const bodyParser=require('body-parser');
// const courses=require('./courses');
// app.use('/courses',courses);



// app.get('/',(req,res)=>{
//     res.send('welcome to express tutorial')
// });
// app.get('/profile/:id',(req,res)=>{
//     res.send('Profile ID: '+req.params.id);
// });






// app.get('/:course_name/courses/:id',(req,res)=>{
//     res.send("Course Name:" +req.params.course_name+" ,ID:"+req.params.id);
// });



// app.get('/messege/:phone_number([0-9]{10})',(req,res)=>{
//     res.send("phone number is"+req.params.phone_number);
// });

// app.get('*',(req,res)=>{
//     res.send("Page Not Found");
// });




// app.listen(80);



// function logInfo(req,res,next){
//     console.log('Hello from logInfo() MiddleWare.....');
//     next();
// };
// function addData(req,res,next){
//     var person={
//         name:"ishmam ali khan",
//         city:"Kamalia",
//     }
//     req.person=person;
//     next();
// }

// app.use(logInfo);
// app.use(addData);
// app.use(('/profile/:id([0-3]{1})'),(req,res,next)=>{
//     var name=['ishmam','ali','khan'];
//     req.name=name[req.params.id];
//     next()
// });

// app.get('/',(req,res)=>{
//     res.send('Welcome to Indexed Page')
// });
// app.get('/person',(req,res)=>{
//     res.send('Name :'+req.person.name+' City: '+req.person.city);
// });

// app.get('/profile/:id([0-3]{1})',(req,res)=>{
//     res.send('Name :'+req.name);
// });
// app.listen(80)

///json parsing
app.use(bodyParser.json());

////urlEncoded Data Parsing
app.use(bodyParser.urlencoded({extended:ture}));


// app.use(express.static('./views/asset/file'))

app.set('view engine','pug');
app.set('views','./views');
// app.get('/',(req,res)=>{
//     var person={
//         name:'khan',
//         city:'fsd',
//         tutorial:'Express JS'
//     }
//     res.render('example',{
//         name:'Ishmam Ali',
//         url:'www.google.com',
//         skills:['node js','express js'],
//         data:person
//     });
// app.get('/static_file',(req,res)=>{
//     res.render('staticFile')
// }
// );



///Registeration page routing
app.get('/registeration',(req,res)=>{
    res.render('registeration')
});
///HandleForm routing
app.get('/registeration',(req,res)=>{
    res.send('Hanlde Form Page.....');
});

app.listen(80);