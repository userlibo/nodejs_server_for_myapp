const schema=require("../conn/conn")
const mongoose=require("mongoose");

let category_schema=new schema({
    id:String,
    pid:String,
    pidpid:String,
    class:Number,
    label:String,
    value:String,
    children:{
        type:Array,
        default:undefined
    }
})

category_model=mongoose.model("goods_category",category_schema);
module.exports=category_model;