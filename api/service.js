/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:57:37
 * @version $Id$
 */

const db = require('./db.js');
const path = require('path');
const crypto = require('crypto');



//注册功能
exports.register = function(req,res){
   var info = req.body

   var user = {}
    for(var key in info){
        user = key;
    }
   var userdata = JSON.parse(user);
   var md5 = crypto.createHash("md5");
   var newPassword = md5.update(userdata.password).digest("hex");  //密码加密

   var sql = "select * from user where username='"+userdata.username+"'";

   db.base(sql,null,function(result){

         if(result.length==0){
            var sql = 'insert user set?';
            var data = {
             username:userdata.username,
             password:newPassword
           }
           db.base(sql,data,function(){
             var obj = {
               result:0,
               message:"注册成功"
             }
             res.json(obj)
           })

         }else{
          var obj = {
               result:-1,
               message:"用户名已存在"
             }
             res.json(obj)
         }
   })
}

//登录接口

exports.login = function(req,res){

   var info = req.body

   var user = {}
    for(var key in info){
        user = key;
    }
   var userdata = JSON.parse(user)

   var md5 = crypto.createHash("md5");
   var newPassword = md5.update(userdata.password).digest("hex");
   console.log(newPassword)
   

   var sql = "select * from user where username='"+userdata.username+"'";
   db.base(sql,null,function(result){
   console.log(result)
   if(result.length==0){
         var obj = {};
         obj.result=-1;
         obj.message="用户名不存在";
         res.json(obj)
   }else{
      if(result[0].password==newPassword){
         var obj = {};
         obj.result=0;
         obj.message="登录成功";
         res.json(obj)
      }else{
        var obj = {};
         obj.result=-1;
         obj.message="密码错误";
         res.json(obj)
      }
   }
     
})

}

// 列表接口
exports.booklist = function(req,res){
  var sql = 'select * from bookAll';
  db.base(sql,null,function(result){
    console.log(result)
  	var obj = {}
  	obj.data = result;
  	obj.result = 0;
  	obj.message = "获取成功"
  	res.json(obj)
  })
}

//新增图书接口
exports.addbook = function(req,res){
	var info = req.body;

	var book = {}
    for(var key in info){
        book = key;
    }
   var bookdata = JSON.parse(book);

   var sql = 'insert bookAll set?';
   var data = {
   	  bookname:bookdata.bookname,
   	  auter:bookdata.auter,
   	  decript:bookdata.decript,
      bookpic:bookdata.bookpic
   }
   db.base(sql,data,function(result){
   	  if(result.affectedRows == 1){
   	  	 var obj = {
   	  	 	result:0,
   	  	 	message:"新增成功"
   	  	 }
         res.json(obj)
   	  }else{
   	  	 var obj = {
   	  	 	result:1,
   	  	 	message:"新增失败"
   	  	 }
         res.json(obj)
   	  }
   })

}

//删除接口
exports.bookdelete = function(req,res){
    var id = req.params.id;
    var sql = 'delete from bookAll where id=?';
    var data = [id];
    db.base(sql,data,function(result){
       if(result.affectedRows == 1){
       	var obj = {
   	  	 	result:0,
   	  	 	message:"删除成功"
   	  	 }
         res.json(obj)
       }
    })
}

//更新接口
exports.bookupdate = function(req,res){
	var info = req.body;
	var book = {}
    for(var key in info){
        book = key;
    }
   var bookdata = JSON.parse(book);
   var sql = 'update bookAll set bookname=?,auter=?,decript=?,bookpic=? where id=?';

   var data = [bookdata.bookname,bookdata.auter,bookdata.decript,bookdata.bookpic,bookdata.id]

   db.base(sql,data,function(result){
   	if(result.affectedRows==1){
      	var obj = {
   	  	 	result:0,
   	  	 	message:"修改成功"
   	  	 }
         res.json(obj)
   	}
   })
   

}
//搜索接口
exports.booksearch = function(req,res){
	var bookname = req.body.bookname;

	var sql = 'select * from bookAll where bookname like"%'+bookname+'%"'; //模糊查询
	db.base(sql,null,function(result){

		var obj = {
			data:"",
			result:0,
			message:'查询成功'
		}
		obj.data=result;
		res.json(obj)
	})
    

}

//图片上传
exports.upimg = function(req,res){
  var CryptoJS = require("crypto-js");
  var base64encode = require('crypto-js/enc-base64');

    var buckname = req.params.buckname

    var qiniu = require("qiniu");
    var Access_Key = "OAUqNJ9DrF61XHCYclUPvD7HTo-65sBra_wL-klv";
    var Secret_Key = "przAVf2yDpWXunD-3TC60NOmiWdjlB0WNT7SMaXT";
   

    var mac = new qiniu.auth.digest.Mac(Access_Key, Secret_Key);
    //要上传的空间
    var bucket = buckname;

    var options = {scope: bucket};
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uptoken = putPolicy.uploadToken(mac)
      var obj = {
        data:uptoken,
        message:'获取七牛token成功'
      }
      res.json(obj)
  
}

