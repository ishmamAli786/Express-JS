const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/students-api",{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then((result)=>{
    console.log(`Connection Is Successfull`)
}).catch((err)=>{
    console.log(`Coonection failed`);
})
