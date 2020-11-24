const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const employeeSchema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confpassword: {
        type: String,
        required: true
    },
})

employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        console.log(`The Current Password is ${this.password}`);
        this.confpassword=undefined
    }
    next();
})

const Register = new mongoose.model("employee", employeeSchema);
module.exports=Register;