

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eshop2', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open",function () {
    console.log("mongodb数据库e-shop2连接成功...")
});

module.exports=mongoose.Schema;
