////init code
const mongoose=require('mongoose');
const assert=require('assert');
const db_url=process.env.DB_URL;


//// connection code
mongoose.connect(
    db_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    },
    (error,link)=>{
        ////check error
        assert.equal(error,null,'DB Connect Failed');
        ///ok
        console.log('DB CONNECT SUCCESSFULLY');
        // console.log(link);
    }
);