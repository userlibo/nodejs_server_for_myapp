
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open",function () {
    console.log("mongodb数据库user连接成功...")
})
let schema=mongoose.Schema;
// let users=new schema({
//     id:Number,
//     name:String,
//     age:Number
// })

// let user_model=mongoose.model("users",users);

// module.exports=user_model;









