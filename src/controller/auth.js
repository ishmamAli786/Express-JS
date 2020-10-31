const User = require('../../models/user');
const jwt=require('jsonwebtoken');
exports.signup=(req,res)=>{
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (user) return res.status(400).json({
                messege: "User Allready Registered"
            });
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            _user.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        messege: 'Something Went Wrong'
                    })
                }
                if (data) {
                    return res.status(201).json({
                        messege: 'User Created SuccessFully.....'
                    })
                }
            });
        });
}


exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((err,user)=>{
        if(err) return res.status(400).json({
            err
        });
        if(user){
            if (user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:'2h'});
                const {_id,fisrtName,lastName,email,role,fullName}=user;
                res.status(200).json({
                    token,
                    user:{
                        _id,fisrtName, lastName, email, role, fullName
                    }
                })
            }else{
                return res.status(400).json({
                    messege:"invalid password"
                })
            }
        }else{
            return res.status(400).json({
                messege:'Something Went Wrong'
            })
        }
    })
}


exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}