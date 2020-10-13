/////init code

const router=require('express').Router();
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const user=require('./../models/user');



/// midleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}));

///routes goes here
router.all(
    '/',(req,res)=>{
        return res.json({
            status:true,
            messege:'user controller cooking....'
        })
    }
)
/////create new user route
router.post('/createNew',[
    ////check not empty field
    check('username').not().isEmpty().trim().escape(),
check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
],
(req,res)=>{
    ////check validation errors
    const erros=validationResult(req);
    if(!erros.isEmpty()){
        return res.status(422).json({
            statuse:false,
            messege:'Form validatio error...',
            error:erros.array()
        });
    }


    ////hash password code
    const hashedPassword=bcrypt.hashSync(req.body.password,10);
    user.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    },(error,result)=>{
        ///check error
        if(error){
            return res.json({
                status:false,
                messege:'db connection failed',
                error:error
            })
        }
        /////if everythin ok
        return res.json({
            status:true,
            messege:'db insert successfully',
            result:result
        })
    }
    )



    ////output data to user
    return res.json({
        status:true,
        messege:'user data ok....',
        data:req.body,
        // hashedPassword:hashedPassword
    })
}


);

/// module export
module.exports=router;
