//// init code
const mongoose=require('mongoose');
const assert=require('assert');
const db_url = process.env.DB_URL;


/// connection code
mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,  
    useFindAndModify:false 
},
function(err,link){
    ///// check err
    assert.equal(err,null,'DB Connect Failed');
    console.log('DB Connect Successfully..');
    // console.log(link);
}

)