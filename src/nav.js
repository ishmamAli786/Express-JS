const express=require('express');
const app=express();
const path = require('path');
const hbs=require('hbs');

// const staticPath = path.join(__dirname, '../public');   
const templatePath=path.join(__dirname,"../template/views");
const partialPath = path.join(__dirname, "../template/partial");

// app.use(express.static(staticPath));
/// initilize template engine
app.set('view engine','hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath)







app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/', (req, res) => {
    res.send('Hello from express server')
});

app.get('/about', (req, res) => {
    res.send("Welcome to My About Page")
});
app.get('/contact', (req, res) => {
    res.send("Welcome to Contact Page")
});
// app.get('/temp', (req, res) => {
//     res.send({
//         id:2,
//         name:"ishmam"
//     })
// });


app.get('/temp', (req, res) => {
    res.json([{
        id: 2,
        name: "ishmam"
    },
        {
            id: 3,
            name: "ali"
        },
        {
            id: 4,
            name: "khan"
        },



])
});


app.listen(3000,()=>{
    console.log("Server is Running on port 3000.....")
})