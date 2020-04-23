const schema=require("../conn/conn")
const mongoose=require("mongoose");
let goods=new schema({
    id:String,
    goods_name:String,
    goods_cat:Array,
    goods_cat_name:String,
    goods_price:String,
    goods_number:String,
    goods_introduce:String,
    goods_pics:Array,
    attrs_argu:Array,
    j_argu:Array

})

let good_model=mongoose.model("goods",goods)
module.exports=good_model;



