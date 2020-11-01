/// init code
const mongoose=require('mongoose');

/// userSchema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }

})
//// user model
mongoose.model('user', userSchema);

module.exports=mongoose.model('user');