const schema=require("../conn/conn")
const mongoose=require("mongoose");
let users=new schema({
    userid:String,
    name:String,
    password:String,
    email:String,
    phone:String,
    userstate:false,
    ctime:String,
    label:String,
    rolename:String
})

let user_model=mongoose.model("users",users)
module.exports=user_model;



