const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
  mongoose.set('strictQuery',true);
//db connect

mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err)
    {
        console.log("connected to db")
    }else{
        console.log("error")

    }

})


//schema
const sch={
    name:String,
    email:String,
    id:Number
}
const monmodel=mongoose.model("NEWDESCRIPTION",sch);

app.post("/post",async(req,res)=>{
    console.log("inside post function")

    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id

    });

    const val=await data.save();
    //resjson("posted");
    res.json(val);



})

//run port

app.listen(6000,()=>{
    console.log("on port 6000")
})