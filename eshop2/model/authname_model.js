const schema=require("../conn/conn")
const mongoose=require("mongoose");

let authname_schema=new schema({
    id:String,
    pid:String,
    authname:String,
    children:Array,
    class:Number,

})

authname_model=mongoose.model("authname",authname_schema);
module.exports=authname_model;