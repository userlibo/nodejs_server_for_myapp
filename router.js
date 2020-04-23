
const express =require("express");
const onerouter=express.Router();

onerouter.get("/abc",function (req,res) {
       res.send("this is router /abc")
})

onerouter.post("/cd",function(req,res)
{
    res.send("this is router /cd");
})

module.exports=onerouter;
