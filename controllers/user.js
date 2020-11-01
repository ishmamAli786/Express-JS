///// init code

const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');


const User=require('../model/user');


/// middleware setup


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes goes here




//default route
router.all('/',(req,res)=>{
    return res.json({
        status:true,
        messege:"User Controller is Working....."
    })
})


//// create new user route
router.post('/createNew',[
    
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
]
,(req,res)=>{
    /// check validation err
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            status:false,
            messege:"Form Validation err",
            error:error.array()
        })
    }


    ////hash password code
    var hashPassword = bcrypt.hashSync(req.body.password,9)




    //// output data to user
    // return res.json({
    //     status:true,
    //     messege:"User Data OK....",
    //     data:req.body,
    //     hashPassword: hashPassword
    // })

////// insert data into database with create method

    // User.create({ username: req.body.username, email: req.body.email, password: hashPassword},
    //     (err,result)=>{
    //         ///check error
    //         if(err){
    //             return res.status(500).json({
    //                 status:"false",
    //                 messege:"DB Insert Failed....",
    //                 err:err
    //             })
    //         }else{
    //             return res.status(200).json({
    //                 status:'true',
    //                 messege:'DB Insert Successfully',
    //                 result:result
    //             })
    //         }
    //     }
    //     );


    ///// insert data into database with save method
    var temp = new User({ username: req.body.username, email: req.body.email, password: hashPassword });
    temp.save((err,result)=>{
        if (err) {
                return res.status(500).json({
                    status:"false",
                    messege:"DB Insert Failed....",
                    err:err
                })
            }else{
                return res.status(200).json({
                    status:'true',
                    messege:'DB Insert Successfully',
                    result:result
                })
            }
        })
   
})

/// Router of Find

router.get('/find/:email?',(req,res)=>{
    User.findById({ _id:"5f9ec3dabb28d80df4ebbc62"},(err,result)=>{
        if(err){
            return res.json({
                status:"failed",
                messege:"DB Find Fail",
                err:err
            })
        } else {
            return res.json({
                status:"true",
                messge:"DB Find Successfully",
                result:result
            })
        }
    });
})
//// Router for update
router.put(
    '/update/:email',(req,res)=>{
        User.update({
            email:req.params.email},{username:'khan'},(err,result)=>{
                if(err){
                    return res.json({
                        status:failed,
                        messege:'DB Updation Failed',
                        err:err
                    })
                }else{
                    return res.json({
                        status:true,
                        messege:"DB Update Successfully",
                        result:result
                    })
                }

            })
    }
)

////// Router for Delete or Remove
router.delete('/delete',(req,res)=>{
    User.findByIdAndDelete({ _id:"5f9ec3dabb28d80df4ebbc62"},(err,result)=>{
        if(err){
            return res.json({
                status:"false",
                messege:"DB Delete Failed",
                err:err
            })
        }else{
            return res.json({
                status:true,
                messege:"DB Delete Successfully",
                result:result
            })
        }
    })
})


/////////  Router for login User
router.post('/login', [check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),],(req,res)=>{
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                status: false,
                messege: "Form Validation err",
                error: error.array()
            })
        }
        //////// Check Email Exist OR Not
        User.findOne({
            email:req.body.email,
        },(err,result)=>{
            if(err){
                return res.json({
                    status:"false",
                    messege:"user login Failed",
                    err:err
                })
            }
            if(result){
                /// when result variable containe document
                //// match password
                var isMatch=bcrypt.compareSync(req.body.password,result.password);
                /// check password is matched
                if(isMatch){
                    ///// password matched
                    return res.json({
                        status:"true",
                        messege:"user Exist Login Success",
                        result:result
                    })
                }else{
                    return res.json({
                        status: "false",
                        messege: "Password Not Matched",
                    })
                }
            }else{
                ///// user document don't exist
                return res.json({
                    status:"false",
                    messege:"User Dont Exist"
                })
            }
        })
})

/// module export

module.exports=router;