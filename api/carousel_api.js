/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:57:37
 * @version $Id$
 */

const db = require('./db.js');
const path = require('path');
const crypto = require('crypto');


//新增lunbo
exports.addcarousel = function(req,res){
     console.log(req.body)
     var carouseldata = req.body;
     var sql = 'insert wx_carousel set?';
     var data = {
     	companyid:carouseldata.companyid,
     	carousel_pic:carouseldata.carousel_pic
     }
     db.base(sql,data,function(result){
        if(result.affectedRows == 1){
        	var obj={
        		result:0,
        		message:"添加成功"
        	}
        	res.json(obj);
        }else{
         	 var obj = {
            	result:-1,
            	message:'修改失败'
            }
            res.json(obj)
         }
     })
}

//获取lunbo
exports.getcarousel = function(req,res){
     var sql='select * from  wx_carousel';
     db.base(sql,null,function(result){
     	var obj = {}
  	    obj.data = result;
  	    obj.result = 0;
  	    obj.message = "获取成功"
  	    res.json(obj)
      
     })
}

//编辑lunbo
exports.edicarousel = function(req,res){
    var data = req.body;
    var id = data.carouselid;
    var pic = data.carousel_pic;
    var sql='update wx_carousel set carousel_pic=? where carouselid=?';
    var data=[pic,id]
    db.base(sql,data,function(result){
         console.log(result)
         if(result.affectedRows==1){
            var obj = {
            	result:0,
            	message:'修改成功'
            }
            res.json(obj)
         }else{
         	 var obj = {
            	result:-1,
            	message:'修改失败'
            }
            res.json(obj)
         }

    })
}

//删除lunbo
exports.deletecarousel = function(req,res){
  var id = req.params.carouselid;
  console.log(id)
  var sql = 'delete from wx_carousel where carouselid=?';
  var data = [id];
  db.base(sql,data,function(result){
      if(result.affectedRows==1){
          var obj = {
            	result:0,
            	message:'删除成功'
            }
            res.json(obj)
      }else{
      	 var obj = {
            	result:-1,
            	message:'删除失败'
            }
            res.json(obj)
      }
  })

}
