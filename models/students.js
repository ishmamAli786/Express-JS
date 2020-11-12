const mongoose=require('mongoose');
const validator=require('validator');


const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email Already Present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
    },address:{
        type:String,
        required:true,
    }
})

const Student=new mongoose.model('Student', studentSchema);
module.exports=Student;