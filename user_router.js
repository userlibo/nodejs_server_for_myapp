const express=require("express");
const app=express();
const userRouter=express.Router();
const user_model=require("./connect_user");

userRouter.get("/getlist",(req,res)=>{
    console.log("456...")
        user_model.find({},(err,docs)=>{
            res.json(docs);
        })
})

userRouter.get("/getid",(req,res)=>{
    user_model.find({},(err,docs)=>{
        if(err) return;
        let len=docs.length+1;
        let obj={id:len}
        res.json(obj);

    })
})
userRouter.get("/getuserinfo",(req,res)=>{
    // console.log(req.body)
    let id=req.query.id;
    console.log("id:",id);
    user_model.findOne({id:id},(err,doc)=>{
        if(err) return;
        res.json(doc);
    })
})

userRouter.put("/updateuser",(req,res)=>{
       console.log(req.query)
       user_model.updateOne({id:req.query.id},{$set:req.query},(err)=>{
           if (err) return;
           res.send("数据修改成功...")
       })
})

userRouter.delete("/deluser",(req,res)=>{
      let id=req.body.id;
      console.log("id:",id);
      user_model.deleteOne({id:id},(err)=>{
          if(err) return;
          res.send("数据删除成功...")
      })
})


userRouter.post("/adduser",(req,res)=>{
    console.log(req.query)
    // user_model.create({
    //     id:parseInt(req.body.id),
    //     name:req.body.name,
    //     age:parseInt(req.body.age)
    // },(err)=>{
    //     if(!err) console.log("adduser数据添加成功...")
    //     res.send("数据添加成功...")
    // })
});

module.exports=userRouter;

// user_model.create([{
//     id:1,
//     name:"libo",
//     age:26
//     },{
//     id:2,
//     name:"liyuan",
//     age:23
//     }],(err)=>{
//      if(!err) console.log("数据添加成功...")
//     }
// )



