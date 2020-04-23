const mongoose=require("mongoose")
const schema=require("../conn/conn")
let admin=new schema({
    id:Number,
    username:String,
    password:String
})


let admin_model=mongoose.model("admin",admin);
module.exports=admin_model










