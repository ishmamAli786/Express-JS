require('./db/conn');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const Register = require('./models/register');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");

// const createToken=async ()=>{
//     const token=await jwt.sign({ _id:"5fb801915fc0ef0e4430e756"},"mynameisishmamalikhanandiamfullstackdeveloperinmern");
//     expiresIn:"2 seconds"
//     console.log(token)
//     const userVer = await jwt.verify(token,"mynameisishmamalikhanandiamfullstackdeveloperinmern");
//     console.log(userVer)
// }
// createToken();

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render("index")
});

app.get('/', (req, res) => {
    res.send("Hello This is Home Page")
});
app.get('/login', (req, res) => {
    res.render("login")
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({ email: email });
        const isMatch = bcrypt.compareSync(password, userEmail.password)
        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.status(400).send("Invalid login Details")
        }
    }
    catch (error) {
        res.status(400).send("Invalid login Details")
    }
});

app.get('/register', (req, res) => {
    res.render("register")
});


app.post('/register', async (req, res) => {
    try {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const confpassword = req.body.confpassword;
        const age = req.body.age;
        const gender = req.body.gender;
        if (password === confpassword) {
            const registerEmployee = new Register({ Firstname: fname, lastname: lname, email: email, gender: gender, phone: phone, age: age, password: password, confpassword: confpassword });

            const token = await registerEmployee.generateAuthToken();
            const registered = await registerEmployee.save();
            res.status(201).render('index');
        } else {
            res.send("Password are Not Matching...")
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
app.listen(3000, () => {
    console.log("Server is Running on Port 3000.....")
})