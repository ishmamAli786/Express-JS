var express = require('express');
var router = express.Router();
var userModel=require('../modules/user');
var bcyrpt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var passCatModel=require('../modules/password-catagory');
var getPassCat = passCatModel.find({});

const { check, validationResult } = require('express-validator');

function checkLoginUser(req,res,next){
  var userToken = localStorage.getItem('userToken');
  try{
    var decoded=jwt.verify(userToken,'loginToken')
  }catch(err){
    res.redirect('/');
  }
  next();
}




if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
/* GET home page. */
function checkEmail(req,res,next){
  var email = req.body.email;
 var checkExistEmail= userModel.findOne({email:email});
  checkExistEmail.exec((err,data)=>{
    if(err){
      console.log(err)
    }else{
      if(data){
       return res.render('signup', { title: 'Password Managment System', msg: "Email Already Exist" });
      }
      next();
    }
  })
}
function checkUserName(req, res, next) {
  var uname = req.body.uname;
  var checkExistEmail = userModel.findOne({ username: uname });
  checkExistEmail.exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data) {
        return res.render('signup', { title: 'Password Managment System', msg: "UserName Already Exist" });
      }
      next();
    }
  })
}
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Managment System',msg:'' });
});
router.get('/dashboard/', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser')
  res.render('dashboard', { title: 'Password Managment System', loginUser: loginUser, msg: '' });
});

router.post('/',  function (req, res, next) {
  var username=req.body.uname;
  var password = req.body.password;
  var checkUser = userModel.findOne({ username: username });
  checkUser.exec((err,data)=>{
    if(err){
      console.log(err)
    }else{
      var getUserID = data._id;
      var getPassword=data.password;
      if (bcyrpt.compareSync(password, getPassword)){
        var token = jwt.sign({ userID: getUserID },'loginToken');
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUser', username);
        res.redirect('/dashboard/')
      }else{
        res.render('index', { title: 'Password Managment System', msg: 'Invalid UserName And Password.' });
      }
    }
  })
});

router.get('/signup/', checkLoginUser, function(req, res, next) {
  res.render('signup', { title: 'Password Managment System', msg:'' });
});
router.post('/signup/',   checkEmail, function(req, res, next) {
  var username=req.body.uname;
  var email = req.body.email;
  var password = req.body.password;
  var confpassword = req.body.confpassword;
  if (password != confpassword){
    res.render('signup', { title: 'Password Managment System', msg: 'Password Not Matched' });
  }else{
    password = bcyrpt.hashSync(password,10);
  var userDetails = new userModel({username:username,email:email,password:password});
  userDetails.save(function(err,doc){
    if(err) { console.log(err)}
    else{ 
      res.render('signup', { title: 'Password Managment System', msg: "user Register Successfully" });
  }})
  }
});


  router.get('/passwordCategory/delete/:id', checkLoginUser, function (req, res, next) {
    var loginUser = localStorage.getItem('loginUser');
    var passcat_id=req.params.id;
    var passdelete = passCatModel.findByIdAndDelete(passcat_id);
    passdelete.exec(function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/passwordCategory');
      }
      // res.render('password_category', { title: 'Password Managment System', loginUser: loginUser});
  });
});


router.get('/passwordCategory/edit/:id', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.params.id;
  var getpassCategory = passCatModel.findById(passcat_id);
  getpassCategory.exec(function (err,data) {
    if (err) {
      console.log(err)
    } else {
      res.render('edit_pass_category', { title: 'Password Managment System', loginUser: loginUser, errors: '', success: '', records: data, id: passcat_id });
    }
    // res.render('password_category', { title: 'Password Managment System', loginUser: loginUser});
  });
});


router.post('/passwordCategory/edit/', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.body.id;
  var passwordCategory = req.body.passwordCategory;
  var update_passcat = passCatModel.findByIdAndUpdate(passcat_id, { password_category: passwordCategory})
  update_passcat.exec(function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/passwordCategory');
    }
    // res.render('password_category', { title: 'Password Managment System', loginUser: loginUser});
  });
});





router.get('/passwordCategory', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  getPassCat.exec(function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.render('password_category', { title: 'Password Managment System', loginUser: loginUser, records: data });
    }
    // res.render('password_category', { title: 'Password Managment System', loginUser: loginUser});
  });

router.get('/add-new-category/', checkLoginUser,   function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
   
      res.render('addNewCategory', { title: 'Password Managment System', loginUser: loginUser, errors: '', success: '' });
    
  })
});
router.post('/add-new-category/', checkLoginUser, [check('passwordCategory','Enter Password Category Name').isLength({min:1})] ,function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('addNewCategory', { title: 'Password Managment System', loginUser: loginUser, errors: errors.mapped(), success: '' });
  }else{
    var passCatName = req.body.passwordCategory;
    var passcatDetails = new passCatModel({ password_category: passCatName});
    passcatDetails.save(function(err,doc){
      if(err){
        console.log(err)
      }else{
        res.render('addNewCategory', { title: 'Password Managment System', loginUser: loginUser, errors: '',success:'Password Category inserted Successfully' });
      }
    })
  }
 
  
});

router.get('/add-new-password/', checkLoginUser,   function (req, res, next) {
  res.render('add-new-password',  { title: 'Password Managment System' });
});

router.get('/view-all-password/', checkLoginUser,  function (req, res, next) {
  res.render('view-all-password', { title: 'Password Managment System' });
});

router.get('/logout/', function (req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/')
});
module.exports = router;
