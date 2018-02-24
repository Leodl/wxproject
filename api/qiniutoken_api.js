const db = require('./db.js');
const path = require('path');
const crypto = require('crypto');

//图片上传
exports.getqiniutoken = function(req,res){
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