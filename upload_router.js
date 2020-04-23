const express=require("express");
const router = express.Router();
const UUID=require("uuid");
const multer = require('multer');
const path=require("path");

var storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: path.resolve(__dirname, './upload'),

    //filename：设置文件保存的文件名
    filename: function(req, file, cb) {
        let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
        let fileName = UUID.v1()
        cb(null, fileName + extName)
    }
})

//设置过滤规则（可选）
var imageFilter = function(req, file, cb){
    var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    //微信公众号只接收上述四种类型的图片
    if(acceptableMime.indexOf(file.mimetype) !== -1){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

//设置限制（可选）
var imageLimit = {
    fieldSize: '2MB'
}

//创建 multer 实例
var imageUploader = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).single('file')    //定义表单字段、数量限制

//创建 multer 实例2
var imageUploader2 = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).array('file',5)    //定义表单字段、数量限制



router.get("/show123",(req,res)=>{
    res.send("123加油libo")
})

router.post("/savegoodsimgs",imageUploader2,function (req,res,next) {
    let url = 'http://libo2020.oicp.io/eshop'+"/upload/"+req.files[0].filename
    res.json({"url":url})
});





router.post('/saveimg', imageUploader, function(req, res, next) {
    //req.files中保存文件信息，如下
    // [ { fieldname: 'photos',
    //    originalname: 'p8U85lWN0XyYcel_avatar_uploaded1439700817.69.jpg',
    //    encoding: '7bit',
    //    mimetype: 'image/jpeg',
    //    destination: 'E:\\mine\\wechat\\upload',
    //    filename: 'b585c040-0a6f-11e9-bbb6-fdcabd365420.jpg',
    //    path:
    //     'E:\\mine\\wechat\\upload\\b585c040-0a6f-11e9-bbb6-fdcabd365420.jpg',
    //    size: 16536 } ]
    // res.send("123")
    // res.send(req);
    let url = 'http://libo2020.oicp.io/eshop'+"/upload/"+req.file.filename
    res.json({"url":url})

})

module.exports=router;