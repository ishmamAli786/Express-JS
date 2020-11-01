const mongoose=require('mongoose');


/// Connection Cretaed or else new Database Created


mongoose.connect("mongodb://localhost:27017/ttchanel", { useNewUrlParser: true, useUnifiedTopology: true, ensureIndex:true,useCreateIndex:true})
.then(()=>{
    console.log("Connection Created Successfully")
})
.catch((err)=>{
    console.log(err)
});



const playListSchema=new mongoose.Schema({
    name:{
       type: String,
       required:true,
       unique:true
    },
    ctype:{
       type: String,
        unique: true
    },
    videos:{
        type:Number,
        unique: true
    },
    author:{
        type:String,
        unique: true
    },
    active: {
        type:Boolean,
        unique: true
    },
    data:{
        type:Date,
        default:Date.now
    }
})

/// create collection
const PlayList = new mongoose.model("PlayList", playListSchema);


/// create document or insert
const createDocument= async ()=>{
    try{
        const jsPlayList = new PlayList({
            name: "JavaScript",
            ctype: "Front End",
            videos: 200,
            author: "ishmam ali khan",
            active: true
        });
        const mongoPlayList = new PlayList({
            name: "Node Js",
            ctype: "DataBase",
            videos:50,
            author: "ishmam ali khan",
            active: true
        });

        const mongoosePlayList = new PlayList({
            name: "Mongoose DB",
            ctype: "Database",
            videos: 50,
            author: "ishmam ali khan",
            active: true
        });
        const expressPlayList = new PlayList({
            name: "Express Js",
            ctype: "Beckend",
            videos: 50,
            author: "ishmam ali khan",
            active: true
        });


        const result = await PlayList.insertMany([jsPlayList, mongoPlayList, mongoosePlayList, expressPlayList]);
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
}





// createDocument()
const readDocument=async ()=>{
    const result = await PlayList.find({ ctype: "Beckend" }).limit(1);
    console.log(result)
}
readDocument();



