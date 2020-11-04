const express=require('express');
const app=express();
const path=require('path');


// console.log(path.join(__dirname,'../public'))
// const staticPath = path.join(__dirname, '../public');

// app.use(express.static(staticPath));

app.get('/',(req,res)=>{
    res.send('Hello From Express js')
});


app.get('/about', (req, res) => {
    res.send('Hello From About Express js')
});





app.listen(3000,()=>{
    console.log("Sever is Running on Port 3000...")
})