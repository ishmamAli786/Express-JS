const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");

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
    tokens:[{
        token:{
              type: String,
        required: true
        }
    }]
})

/// generating tokens
employeeSchema.methods.generateAuthToken=async function(){
    try{
        const token= jwt.sign({_id:this._id.toString()},"mynameisishmamalikhanandiamfullstackdeveloper");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token
    }
    catch(error){
        res.send("The Error Part"+error);
        console.log("The Error Part"+error);
    }
}



///converitng password into hash
employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        this.confpassword=await bcrypt.hash(this.password,10);
    }
    next();
})

const Register = new mongoose.model("employee", employeeSchema);
module.exports=Register;