
const schema=require("../conn/conn")
const mongoose=require("mongoose");

let role_schema=new schema({
    id:Number,
    rolename:String,
    roledesc:String,
    children:Array
})

role_model=mongoose.model("role",role_schema);
module.exports=role_model;
// rolename_model.create([{id:1,rolename:"staff"},
//     {id:2,rolename:"superadmin"},
//     {id:3,rolename:"test_role"},
//     {id:4,rolename:"test_role2"},
//     {id:5,rolename:"test"},
// ],(err,docs)=>{
//     console.log(docs)
// })