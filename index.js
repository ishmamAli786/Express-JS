const express=require('express');
const app=express();
const mongoose=require('mongoose');
const userModel=require('./models/user');
const jwtModel = require('./model/users');
const bodyParser=require('body-parser');
var jsonParser = bodyParser.json();
// var crypto=require('crypto');
// var key="password";
// var algo='aes256';
const bycrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
jwtkey="jwt";

// const { urlencoded } = require('body-parser');

mongoose.connect('mongodb://localhost:27017/step-by-step', { useNewUrlParser: true, useUnifiedTopology: true });


// const data=new userModel({name:"ishmam ali",email:"alikhan@gmail.com",address:"kamalia"});
// data.save().then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })

// userModel.create({ name: "ishmam ali", email: "alikhan@gmail.com", address: "kamalia" }
// .then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })
// )





// app.use('/assets',express.static('assets'))
// // app.get('/',(req,res)=>{
// //     res.sendFile(__dirname+'/home.html');
// // });


// // app.get('/about', (req, res) => {
// //     res.sendFile(__dirname+'/about.html');
// // }); 

// // app.get('/login', (req, res) => {
// //     res.sendFile(__dirname+'/login.html');
// // }); 
// app.set('view engine','ejs');
// app.set('views','views');

// // app.get('/',(req,res)=>{
// //     res.sendFile(__dirname+'/home.html')
// // });

// app.get('/profile/:name?', (req, res) => {
//     data={email:'test@gmail.com',address:'pakistan',skills:['Node js','php','java','react','react-redux']}
//     res.render('profile',{title:req.params.name,data:data})
// });
// app.get('/', (req, res) => {
//     res.render('home')
// });
// app.get('/login', (req, res) => {
//     console.log(req.query);
//     res.render('login')
// });
// app.get('/',(req,res)=>{
//     res.send('Home');
// })
// app.get('/users',(req,res)=>{
//     userModel.find() .then((result)=>{
//       return   res.status(200).json({
//           status:"True",
//           messge:"Data Fetched Successfully",
//           result:result
//       })
//     }).catch((err)=>{
//        return  res.json(err)
//     })
// })



// app.post('/user', jsonParser,(req,res)=>{
//     const data = new userModel({
//         name:req.body.name,
//         email:req.body.email,
//         address:req.body.address
//     })
//     data.save().then((result)=>{
//         res.json(result)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// })


// app.delete('/delete',(req,res)=>{
//     userModel.findByIdAndDelete({_id:"5fa0477428e4743d50a3c3ee"}).then(()=>{
//         res.json({
//             messege:"Db Deleted Successfully"
//         })
//     })
// });



// app.put('/update',(req,res)=>{
//     userModel.findByIdAndUpdate({ _id: '5fa00a5a46036f00dcc7696f'},{$set:{name:"khan"}}).then((result)=>{
//         res.json({
//             messege:"DB Updated Successfully",
//             result:result
//         })
//     .catch((err)=>{
//            res.json({
//                messege:"DB Failed to updated",
//                err:err
//            })
//         })
    
//     })
// })



// app.get('/search/:name',(req,res)=>{
//     var regex=new RegExp(req.params.name,'i');
//     userModel.find({name:regex}).then((result)=>{
//         res.json({
//             status:"True",
//            result:result
//         })
//     })
// })



app.get('/',(req,res)=>{
    res.end('Hello')
});

app.post('/register', jsonParser,(req,res)=>{
    // const password = bycrypt.hash(req.body.password,9)
    // // var cipher=crypto.createCipher(algo,key);
    // // var encrypted=cipher.update(req.body.password,'utf8','hex')+cipher.final('hex');
    // // console.log(req.body.name, req.body.encrypted);
    // console.log(req.body.name,req.body.password)


    const data=new jwtModel({name:req.body.name,email:req.body.email,address:req.body.address,password:req.body.password});
    data.save().then((result)=>{
        jwt.sign({ result }, jwtkey,{expiresIn:'300s'},(err,token)=>{
            res.status(200).json({token})
        })
        }).catch((err)=>{
            res.json({
                err:err
            })
        })
    })

app.post('/login', jsonParser,(req,res)=>{
    jwtModel.findOne({email:req.body.email}).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({
            status:'failed',
            messege:"user not login",
            err:err
        })
    })
    })




app.listen(2000,()=>{
    console.log("Sever is runninng on port 2000")
})