const express =require('express');
const app=express();
const port=3002;
// app.get(route,callback)
app.get('/',(req,res)=>{
    res.send('Welcome to My Home Page')
});

app.get('/about',(req,res)=>{
    res.send('Welcome to My About Page')
});
app.listen(port,()=>{
    console.log(`listning to the port number no ${port}`)
})