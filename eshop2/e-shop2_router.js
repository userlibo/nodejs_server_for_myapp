const express=require("express");
const eshopRouter=express.Router();
const admin_model=require("./model/admin_model");
const user_model=require("./model/users_model");
const rolename_model=require("./model/rolename_model");
const role_model=require("./model/role_model");
const authname_model=require("./model/authname_model");
const category_model=require("./model/category_model");
const good_model=require("./model/goods_model");
const md5=require("md5");

//商品管理--获取商品列表
eshopRouter.get("/getgoodslist",(req,res)=>{
         good_model.find({},(err,docs)=>{
             if(err) return;
             res.json({
                 status:"200",
                 data:docs,
                 total:docs.length
             })
         })
})


//商品管理--添加商品
eshopRouter.post("/create_goods_info",(req,res)=>{
    console.log("999999999999999999999")
       console.log(req.body);
       let obj=req.body;
       let d=new Date();
       obj.id=d.getTime().toString();
       console.log("id:",obj.id);
       good_model.create(obj,(err,doc)=>{
           if(err) return;
           res.json({
               status:"200",
               data:doc
           })
       })
})


//商品管理--获取静态参数
eshopRouter.get("/get_j_argu/:str",(req,res)=>{
    // console.log("333:",req.params.str);
    let arr1=req.params.str.split(",");
    let allarr=[];
    // console.log("arr:",arr);
    category_model.findOne({id:arr1[0]},(err,doc)=>{
        // console.log("doc:",doc)
        doc.children.forEach(item2=>{
            if(item2.id===arr1[1]&&item2.children){
                item2.children.forEach(item3=>{
                    if(item3.id===arr1[2]&&item3.j_argu)
                    {
                        item3.j_argu.forEach(j_argu_item=>{
                            let obj={};
                            obj.category_name=doc.label+"/"+item2.label+"/"+item3.label
                            obj.name=j_argu_item.name;
                            obj.value=j_argu_item.value;
                            obj.selectedcategory=arr1;
                            allarr.push(obj);
                        })
                    }
                })
            }

        })
        res.json({
            status:"200",
            data:allarr
        })
    });
})

//商品管理-有条件的获取动态参数
eshopRouter.get("/get_d_argu/:str",(req,res)=>{
    // console.log("333:",req.params.str);
    let arr1=req.params.str.split(",");
    // console.log("arr:",arr);
    category_model.findOne({id:arr1[0]},(err,doc)=>{
        // console.log("doc:",doc)
        doc.children.forEach(item2=>{
            if(item2.id===arr1[1]&&item2.children){
                item2.children.forEach(item3=>{
                    if(item3.id===arr1[2]&&item3.d_argu)
                    {
                        let obj={};
                        obj.d_argu=item3.d_argu;
                        obj.selectedcategory=arr1;
                        obj.category_name=doc.label+"/"+item2.label+"/"+item3.label
                        res.json({
                            status:"200",
                            data:obj
                        })
                    }
                })
            }

        })
    });
})


//商品管理--添加静态参数
eshopRouter.put("/add_j_argu",(req,res)=>{
    console.log(req.body)
    let selectedarr=req.body.selectedarr;
    category_model.findOne({id:selectedarr[0]},(err,doc)=>{
        if(err) return;
        doc.children.forEach(item=>{
            if(item.id===selectedarr[1])
            {
                item.children.forEach(item2=>{
                    if(item2.id===selectedarr[2])
                    {
                        console.log("已运行")
                        if(item2.j_argu===undefined ||item2.j_argu.length===0)
                        {
                            item2.j_argu=[];
                            let obj3={};
                            obj3.name=req.body.name;
                            obj3.value=req.body.value
                            item2.j_argu.push(obj3)

                        }else
                        {
                            let obj3={};
                            obj3.name=req.body.name;
                            obj3.value=req.body.value
                            item2.j_argu.push(obj3)
                        }

                    }
                })
            }
        })
        console.log("已运行1")
        category_model.updateOne({id:selectedarr[0]},{$set:{children:doc.children}},(err,doc)=>{
            if(err) return;
            console.log("已运行2")
            res.json({
                status:"200",
                data:doc
            })
        })

    })
})



//商品管理--删除单个的tag标签
eshopRouter.put("/update_category_tag",async (req,res)=>{
      console.log("33333333333333333")
      let obj=req.body;
      let class1={};
      let class2={};
      let class3={};
      console.log("obj333:",obj);
      obj.info.forEach(item=>{
          if(item.class===1)
          {
              class1=item;
          }
          else if(item.class===2)
          {
              class2=item;
          }else
          {
              class3=item;
          }
      })
      let resres=await category_model.findOne({id:class1.id});
      console.log("resres:",resres);
      resres.children.forEach(item2=>{
          if(item2.id===class2.id)
          {
             item2.children.forEach(item3=>{
                 if(item3.id===class3.id)
                 {
                     item3.d_argu.forEach(d_argu_item=>{
                         if(d_argu_item.name===obj.name)
                         {
                             d_argu_item.item=obj.d_item;
                         }
                     })
                 }
             })
          }
      });
     category_model.updateOne({id:class1.id},{$set:{children:resres.children}},(err,doc)=>{
         if(err) return;
         res.json({
             status:"200",
             data:doc
         })
    })



})


//商品管理--获取动态参数列表所需要的数据
eshopRouter.get("/get_d_arguments",(req,res)=>{
       category_model.find({},(err,docs)=>{
               let allarr=[];
           docs.forEach(item1=>{
               if(item1.children)
               {
                   item1.children.forEach(item2=>{
                       if(item2.children)
                       {
                           item2.children.forEach(item3=>{
                               if(item3.d_argu)
                               {
                                   item3.d_argu.forEach(d_argu_item=>{
                                       let obj={};
                                       let arr=[];
                                       arr.push(item1);
                                       arr.push(item2);
                                       arr.push(item3);
                                       obj.category_name=item1.label+"/"+item2.label+"/"+item3.label
                                       obj.name=d_argu_item.name;
                                       obj.d_item=d_argu_item.item;
                                       obj.info=arr;
                                       allarr.push(obj);
                                   })
                               }
                           })
                       }
                   })
               }


           })
           res.json({
               status:"200",
               data:allarr
           })


       })


})




//商品管理--获取动态参数
eshopRouter.put("/add_d_argu",(req,res)=>{
    console.log(req.body)
    let selectedarr=req.body.selectedarr;
    category_model.findOne({id:selectedarr[0]},(err,doc)=>{
        if(err) return;
        doc.children.forEach(item=>{
            if(item.id===selectedarr[1])
            {
                item.children.forEach(item2=>{
                    if(item2.id===selectedarr[2])
                    {
                        console.log("已运行")
                      if(item2.d_argu===undefined ||item2.d_argu.length===0)
                      {
                          item2.d_argu=[];
                          let obj3={};
                           obj3.name=req.body.name;
                           obj3.item=req.body.item
                          item2.d_argu.push(obj3)

                      }else
                      {
                          let obj3={};
                          obj3.name=req.body.name;
                          obj3.item=req.body.item
                          item2.d_argu.push(obj3)
                      }

                    }
                })
            }
        })
        console.log("已运行1")
        category_model.updateOne({id:selectedarr[0]},{$set:{children:doc.children}},(err,doc)=>{
               if(err) return;
               console.log("已运行2")
               res.json({
                   status:"200",
                   data:doc
               })
        })

    })
})

//商品管理--根据[1,2,3]id数组获取类别文字
eshopRouter.get("/get_options_by_ids/:str",(req,res)=>{
       let str=req.params.str;
       let arr=str.split(",");
       console.log("arr:",arr);
       category_model.findOne({id:arr[0]},(err,doc)=>{
           if(err) return;
           let cate_str="";
           doc.children.forEach(item2=>{
               if(item2.id===arr[1])
               {
                   item2.children.forEach(item3=>{
                       if(item3.id===arr[2])
                       {
                           cate_str=doc.value+"/"+item2.value+"/"+item3.value;
                       }
                   })
               }
           })
           console.log("cate_str:",cate_str);
           res.json({
               status:"200",
               data:cate_str
           })
       })
})



//商品管理-获取类别数据
eshopRouter.get("/get_options",(req,res)=>{
     category_model.find({},(err,docs)=>{
          if(err) return;
          // console.log("category_docs:",docs)
          res.json({
              status:"200",
              data:docs
          })
     })

})



//商品管理--添加类别
eshopRouter.post("/add_category",(req,res)=>{
    console.log("category:",req.body)
    if(req.body.class===1)
    {
        console.log(req.body)
        category_model.create(req.body,(err,doc)=>{
            if(err) return;
            res.json({
                status:"200"
            })
        })
    }
    else if(req.body.class===2)
    {
        category_model.update({id:req.body.pid},{$addToSet:{children:req.body}},(err,doc)=>{
            if(err) return;
            res.json({
                status:"200",
                data:doc
            })
        })
    }else if(req.body.class===3)
    {
        category_model.findOne({id:req.body.pidpid},(err,doc)=>{
            if(err) return;
            console.log("pidpid:",doc)
            doc.children.forEach(item=>{
                if(item.id===req.body.pid)
                {
                    if(item.children)
                    {
                        item.children.push(req.body);
                    }else
                    {
                        item.children=[];
                        item.children.push(req.body);
                    }


                }
            })
           category_model.updateOne({id:req.body.pidpid},{$set:{children:doc.children}},(err,doc)=>{
               if(err) return;
               res.json({
                   status:"200"
               })
           })
        })





    }


})



//权限管理--角色列表
eshopRouter.get("/get_role_data",async (req,res)=>{
    let docs=[];
    try
    {
         docs=await role_model.find({});
    }catch (e) {
        console.log(e)
    }
    res.json({
        status:"200",
        data:docs
    })


})
//权限管理--添加角色
eshopRouter.post("/add_role",async (req,res)=>{
    let tree_data=req.body.tree_data;
    console.log("tree_data:",tree_data)
    let docs=[]
    alldoc=await authname_model.find({});
    //处理树形结构的数据思路
    //req.body先获取树形结构被选中的以及半选中的id值
    //查找说有的权限列表，alldocs
    //根据alldocs 查找请求的树形结构数据中 class=2的
    //再根据class=3并且插入到父的class2中
    //再把class2的数据，插入选的class=1的数据中
    for(const v of tree_data)
    {
        alldoc.forEach(item=>{
            if(item.id===v)
            {
                docs.push(item);
            }
        })
    }
    console.log("docs:",docs)
    let subarr=[];
    let arr=[];
    docs.forEach(item=>{
        if(item.class===2)
        {
            docs.forEach(item2=>{

                if(item2.class===3&&item2.pid===item.id)
                {
                    item.children.push(item2);
                }
            })
            subarr.push(item)
        }
    })
   console.log("subarr:",subarr);
    docs.forEach(item0=>{
        if(item0.class===1)
        {
            subarr.forEach(item=>{
                   if(item.pid===item0.id)
                   {
                       item0.children.push(item);
                   }
            })
            arr.push(item0);
        }

    })


    let maxid=0;
    let doc=await role_model.find({},{id:1},{limit:1,sort:{id:-1}})
    console.log("doc:",doc);
    if(doc.length===0)
        {
            maxid=1;
        }else
        {
            maxid=doc[0].id+1;
        }

    let obj1={
        id:maxid,
        rolename:req.body.rolename,
        roledesc:req.body.roledesc,
        children:arr
    };
    console.log("obj1:",obj1)
    role_model.create(obj1,(err)=>{
           if(err) console.log(err);return;
           res.json({
               status:"200",
               data:arr
           })
       })

})


//权限管理--获取树形结构
//要使响应的数据能是树形结构可以使用的数据类型
//{  id:1,
//   authname:"xxx",
//   children:[{
//              id:xxx
//              authname:xxx
//              children:[...]
//              },{},...]
//}
//遍历数据库中所有class=2
//再遍历数据库中所有pid为该class=2的所有对象，并插入到该class=2对象的children中
//再类似遍历数据库中所有class=1
//遍历刚才合成的class=2的对象数组，插入到对应的父节点的children中
//这次写的代码使用了async await ,不过可以把所有的数据都查找出来,
//然后用forEach for(v of arr)来处理，这样就不是异步的了。
eshopRouter.get("/get_tree_data",async (req,res)=>{
    let tree_data=[];
    let subarr=[];
    let docs2=await authname_model.find({class:2});
             for(const item of docs2)
             {
                 let pid=item.id;
                 let pid1=item.pid;
                 let docs3=await authname_model.find({class:3,pid:pid});
                 item.children=docs3;
                 subarr.push(item);
                 // let doc1=await authname_model.findOne({class:1,id:pid1});
                 //         doc1.children.push(item);
                 //         tree_data.push(doc1)
                 //         console.log("tree_data",tree_data)
             }

    let docs1=await authname_model.find({class:1});
               docs1.forEach(item0=>{
                   let id=item0.id;
                   subarr.forEach(item =>{
                       if(item.pid===id)
                       {
                           item0.children.push(item);
                       }
                   })
               })
      console.log("subarr:",subarr);
      console.log("docs1",docs1)
    res.json({
        status:"200",
        data:docs1
    })


       // authname_model.find({class:2},(err,docs)=>{
       //      if(err) return;
       //      docs.forEach(item=>{
       //          let pid=item.id;
       //          let pid1=item.pid;
       //          authname_model.find({class:3,pid:pid},(err,docs)=>{
       //              if(err) return;
       //              item.children=docs;
       //              authname_model.findOne({class:1,id:pid1},(err,doc)=>{
       //                  doc.children.push(item);
       //                  tree_data.push(doc)
       //                  console.log("tree_data",tree_data)
       //              })
       //
       //          })
       //      })
})


//权限管理--获取所有权限
eshopRouter.get("/get_authname2",(req,res)=>{
       authname_model.find({},(err,docs)=>{
           if(err) return;
           res.json({
               status:"200",
               data:docs
           })

       })
});

//权限管理--分配权限
eshopRouter.post("/assign_pid",(req,res)=>{
       let class1=req.body.class1;
       let class2=req.body.class2;
       let class3=req.body.class3;
       // console.log(req.body)
       authname_model.updateOne({id:class1},{$set:{pid:0}},(err)=>{
           if(err) console.log("出现错误class1"); return;
       });
       authname_model.updateOne({id:class2},{$set:{pid:class1}},(err)=>{
           if(err) console.log("出现错误class2"); return;
       });
       authname_model.updateOne({id:class3},{$set:{pid:class2}},(err)=>{
           if(err) console.log("出现错误class3"); return;
       });
       res.json({
           status:"200"
       })
})

//权限管理--获取全部权限
eshopRouter.get("/get_authname",(req,res)=>{
      authname_model.find({},(err,docs)=>{
          // console.log("docs:",docs);
            if(err) return;
            let obj1={
                classArr1:[],
                classArr2:[],
                classArr3:[]
            }
            docs.forEach(item=>{
                if(item.class===1)
                {
                    obj1.classArr1.push(item)
                }else if(item.class===2)
                {
                    obj1.classArr2.push(item)
                }else if(item.class===3)
                {
                    obj1.classArr3.push(item)
                }

            })
            res.json({
                msg:"200",
                data:obj1
            })

      })
})


//权限管理--添加权限
eshopRouter.post("/add_authname",(req,res)=>{
     let obj1=req.body;
     obj1.class=parseInt(req.body.class);

     let d=new Date();
     obj1.id=d.getTime().toString();
     authname_model.create(obj1,(err)=>{
         if(err) return ;
         res.json({
             msg:"200"
         })
     })
     // console.log("obj1:",obj1)
    })






//监听用户角色
eshopRouter.get("/rolenamelist",(req,res)=>{
       rolename_model.find({},(err,docs)=>{
           if(err) return;
           res.json({
               status:"200",
               data:docs
           });
       })
})

//改变用户角色的监听
eshopRouter.put("/save_role_name",(req,res)=>{
    console.log(req.body)
    let rolename=req.body.rolename;
    user_model.updateOne({userid:req.body.userid},
        {$set:{label:req.body.label,rolename:req.body.rolename}},(err)=>{
          if(err) return;
          res.json({
              status:"200"
          })


        })




})


eshopRouter.get("/show",(req,res)=>{
      res.send("this is eshopRouter /show")
})

eshopRouter.post("/login",(req,res)=>{
    console.log(req.body);
    let username=req.body.username;
    let password=md5(req.body.password);
    admin_model.findOne({username:username},(err,doc)=>{
        if(err) return ;
        // console.log("123doc")
        // console.log("doc:",doc);
        if(doc===null){
            res.send("1")//1代表用户名不存在
        }else
        {
             admin_model.findOne({username,password},(err,doc)=>{
                 if(err) return;
                 if(doc===null)
                    {   //代表密码错误
                        res.send("2")
                    }
                 else if(doc)
                 {
                     res.send("0") //0代表用户名密码正确
                 }
             })
        }


    })
})


eshopRouter.post("/adduser",(req,res)=>{
           // console.log(req.body)
    let userdata=req.body;
    let d=new Date();
    userdata.userid=d.getTime().toString();
    userdata.ctime=d.toLocaleString();
           // console.log(userdata)
    userdata.password=md5(userdata.password);
    // console.log(userdata)
    user_model.create(userdata,(err)=>{
        if(err) {
            res.json({
                status:"202",
                msg:"用户添加失败!"
            })
            return;
        }else {
            res.json({
                status: '201',
                msg: "用户添加成功!"
            })
        }
    })

})

// eshopRouter.post("/getsearch",(req,res)=>{
//            let s_str=req.body.search_str;
//            let total="";
//            let pagesize=parseInt(req.params.pageSize);
//            let currentpage=parseInt(req.params.currentPage);
//            user_model.find({name:/s_str/},{},{skip:skip,limit:pagesize,sort:{userid:1}},(err,docs)=>{
//                res.json({
//                    total,
//                    data:docs
//                })
//            })

// })


eshopRouter.post("/getallusers/:pageSize/:currentPage",(req,res)=> {
    let total = "";
    let pagesize = parseInt(req.params.pageSize);
    let currentpage = parseInt(req.params.currentPage);
    let s_str = req.body.search_str;
    console.log("s_str:", s_str)
    let skip = (currentpage - 1) * pagesize
    console.log("pagesize:", pagesize)
    console.log("currentpage:", currentpage)
    console.log("skip:", skip)
    let obj = {}
    if (s_str)
    {
        obj={name:{$regex:s_str, $options:'i'}}
    }

        user_model.find(obj,(err,docs)=>{
            total=docs.length;
            console.log("total:",total)
        })
        user_model.find(obj,{},{skip:skip,limit:pagesize,sort:{userid:1}},(err,docs)=>{
            res.json({
                total,
                data:docs
            })
        })


})

eshopRouter.put("/put_userstate",(req,res)=>{
       console.log("put_userstate:",req.body)
      user_model.updateOne({userid:req.body.userid},{$set:{userstate:req.body.userstate}},(err,doc)=>{
          if(err) return;
          console.log("doc:",doc)
          res.json({
              status:"200",msg:"用户状态更新成功!"
          })
      })
})


eshopRouter.put("/put_user",(req,res)=>{
       console.log("put_user:",req.body)
    let userid=req.body.userid;
    let email=req.body.email;
    let phone=req.body.phone;
    user_model.update({userid:userid},{$set:{email:email,phone:phone}},(err)=>{
        if(err) return;
        res.json({
            status:"200",
            msg:"用户信息修改成功!"
        })
    })
})

eshopRouter.delete("/del_user/:userid",(req,res)=>{
    console.log("2222222222222222")
      console.log("req.params.userid:",req.params.userid)
      user_model.deleteOne({userid:req.params.userid},(err)=>{
          if(err) return;
          res.json({
              status:"200"
          })
      })
})

module.exports=eshopRouter;






// const md5=require("md5")
// let pwd=md5("123").toString();
// admin_model.create({
//      id:1,
//      username:"admin",
//      password:pwd
// },(err)=>{
//     if(err) return;
//     console.log("数据添加成功...")
// })
