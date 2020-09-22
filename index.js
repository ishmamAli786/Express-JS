
const express = require("express");
const app =express();
app.get("/",(req,res)=>{
    res.send("hello world");
});
app.get("/users",(req,res)=>{
    res.send("users data access");
});
app.listen(3001,()=>{
    console.log('server is running on 3000 port');
})