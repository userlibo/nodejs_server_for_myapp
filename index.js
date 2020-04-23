const bodyParser=require("body-parser");
const express=require("express");
const app=express();
const path=require("path");
const cors=require("cors");
const onerouter=require("./router");
const uploadRouter=require("./upload_router");
const userRouter=require("./user_router");
const eshopRouter=require("./eshop2/e-shop2_router");


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/eshop",eshopRouter);

app.use(userRouter);


app.use("/eshop",uploadRouter);
app.use("/eshop/upload",express.static(path.join(__dirname,"./upload")))

//解决跨域问题
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.get("/test123",(req,res)=>{
    console.log("this is test123:",req.query);
    res.send("加油libo!")
})


app.use("/test",onerouter);

let cb1=function(req,res,next)
{
    console.log("this is cb1!");
    next();
}

let cb2=function(req,res,next)
{
    console.log("this is cb2!")
    next();
}

app.get("/show",[cb1,cb2]
);
app.get("/show123",function (req,res) {
    let b=req.body.age;
    let a=req.query.q;
    let c=b+"  "+a;
res.send(c)
})

// console.log("456")
app.post(/show/,(req,res)=>{
    // console.log(" 123")
    // console.log(req.body.age)
    res.send(req.param())
    // res.send("this is post show:c1:%s c2:%s",req.body.name,req.body.age)
})

app.put("/show",(req,res)=>{
    // console.log("123")
    console.log(req.body)
    res.send(req.body)
   // res.send("this is put show")
})

app.delete("/show/:name",(req,res)=>{
           console.log("id:",req.query.id)
           console.log("name:",req.params.name);
           res.send("delete_show!!!")
})

app.listen(3000,"192.168.0.102",()=>{
    console.log("server is running...")
})

