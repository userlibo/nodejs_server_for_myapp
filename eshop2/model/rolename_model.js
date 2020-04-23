
const schema=require("../conn/conn")
const mongoose=require("mongoose");

let rolename_schema=new schema({
    id:Number,
    label:String,
    rolename:String
})

rolename_model=mongoose.model("rolename",rolename_schema);
module.exports=rolename_model;
// rolename_model.create([{id:1,rolename:"staff"},
//     {id:2,rolename:"superadmin"},
//     {id:3,rolename:"test_role"},
//     {id:4,rolename:"test_role2"},
//     {id:5,rolename:"test"},
// ],(err,docs)=>{
//     console.log(docs)
// })