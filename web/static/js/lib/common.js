(function ($) {

   
})(jQuery);


var Common = function () {
    var obj = {};
  
    obj.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var url = window.location.toString();
        var search = url.substring(url.indexOf("?") + 1);
        var r = search.match(reg);  // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    }
  


    obj.alertSuccess = function (title, text) {
        swal({
            title: title,
            text: text,
            timer: 1000,
            showConfirmButton: false,
            type: "success"
        });
    }
    obj.alertError = function (title, text) {
        swal({
            title: title,
            text: text,
            type: "error"
        });
    }

    obj.deleteConfirm = function (successCallback) {
        sweetAlert({
                title: "您确定要删除这条信息吗",
                text: "删除后将无法恢复，请谨慎操作！",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    successCallback();
                }
            })
    }

      obj.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

   
    obj.getQiniuToken = function () {
        var url = window.location.href.split("/");
        var urltype = window.location.host.split(".");
        var buckname = "forchild-resource-dev"
        
    
        console.log(buckname)
        var token;
        $.ajax({
           url:'/book/upimg/'+buckname+'',
           type:'get',
           dataType : 'json',
           async: false,
            success: function (res) {
                console.log(res)
                token = res.data;    
            }
        });
        return token;
    }
    

    obj.currentDate = function () {
        return new Date().Format("yyyy-MM-dd");
    }
    obj.getDateStr = function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        return dd.Format("yyyy-MM-dd");
    }
    obj.currentMonth = function () {
        return new Date().Format("yyyy-MM");
    }
    obj.objToArr = function (obj) {
        var arr = [];
        for (var i in obj) {
            arr.push({"id": i, "text": obj[i]});
        }
        return arr;
    }


    obj.compress = function(file ,callback) {

        if (file < 1024*104){
            callback(file);
        }else{
            var image = new Image(),
                canvas = document.createElement("canvas"),
                ctx = canvas.getContext('2d');


            var reader = new FileReader();//读取客户端上的文件
            reader.onload = function () {
                var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                image.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
            };
            image.onload = function () {
                var afterWidth = '1024';
                var upImgWidth = image.width,
                    upImgHeight = image.height;
                var orientation = 1;
                //获取图像的方位信息
                EXIF.getData(image, function () {
                    orientation = parseInt(EXIF.getTag(image, "Orientation"));
                    orientation = orientation ? orientation : 1;
                });
                //压缩换算后的图片高度
                var afterHeight = afterWidth * upImgHeight / upImgWidth;

                if (orientation <= 4) {
                    // 设置压缩canvas区域高度及宽度
                    canvas.setAttribute("height", afterHeight);
                    canvas.setAttribute("width", afterWidth);
                    if (orientation == 3 || orientation == 4) {
                        hidCtx.translate(afterWidth, afterHeight);
                        hidCtx.rotate(180 * Math.PI / 180);
                    }
                } else {
                    // 设置压缩canvas区域高度及宽度
                    canvas.setAttribute("height", afterWidth);
                    canvas.setAttribute("width", afterHeight);

                    if (orientation == 5 || orientation == 6) {
                        canvas.translate(afterHeight, 0);
                        canvas.rotate(90 * Math.PI / 180);
                    } else if (orientation == 7 || orientation == 8) {
                        canvas.translate(0, afterWidth);
                        canvas.rotate(270 * Math.PI / 180);
                    }
                }

                // canvas绘制压缩后图片
                ctx.drawImage(image, 0, 0, upImgWidth, upImgHeight, 0, 0, afterWidth, afterHeight);

                var newImg = new Image();
                newImg.src = canvas.toDataURL('image/jpeg', 0.7); //d
                var b = obj.dataURLtoBlob(newImg.src);
                callback(b);
            };
            reader.readAsDataURL(file);
        }
    }
    obj.dataURLtoBlob = function (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    return obj;

}();

(function ($) {
    $.fn.extend({
        getFilesCount: function () {
            return $(this).fileinput('getFilesCount');
        },
        qiniu: function (options) {
            var settings = {
                language: 'zh', //设置语言
                uploadUrl: 'http://upload.qiniu.com/', //上传的地址
                showCaption: false,//是否显示被选文件的简介
                showBrowse: true,//是否显示浏览按钮,
                showPreview: true,//是否显示预览
                showRemove: false,//是否显示移除按钮
                showUpload: false, //是否显示上传按钮
                showCancel: false,//是否显示取消按钮
                showClose: true,//是否显示关闭按钮

                resizeImage:true,
                maxImageWidth: 1024,
                maxImageHeight: 768,
                resizePreference: 'width',
                resizeImageQuality:0.7,
                resizeIfSizeMoreThan: 1024,

                uploadAsync: true, //默认异步上传
                allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
                dropZoneEnabled: false,//是否显示拖拽区域
                maxFileCount: 10, //表示允许同时上传的最大文件个数
                uploadIcon: "",
                browseClass: "btn btn-primary", //按钮样式
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                browseIcon: "",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                fileActionSettings: {
                    showZoom: false,
                    showUpload: false
                }
            }
            if (options && options.browseLabel) {
                settings.browseLabel = options.browseLabel;
            }
            if (options && options.browseClass != null) {
                settings.browseClass = options.browseClass;
            }
            if (options && options.maxFileCount) {
                settings.maxFileCount = options.maxFileCount;
            }
            if (options && options.showCaption) {
                settings.showCaption = true;
            }
            if (options && options.fileActionSettings) {
                settings.fileActionSettings = options.fileActionSettings;
            }
            if (options && options.initialPreviewAsData) {
                settings.initialPreviewAsData = true;
                settings.initialPreview = options.initialPreview;
            }
            if (options && options.showUpload) {
                settings.showUpload = true;
            }
            if (options && options.showPreview == false) {
                settings.showPreview = false;
            }
            if (options && options.allowedFileExtensions) {
                settings.allowedFileExtensions = options.allowedFileExtensions;
            }
            if (options && options.allowedFileTypes) {
                settings.allowedFileTypes = options.allowedFileTypes;
            }

            var fileObj = $(this).fileinput(settings).on('filepreupload', function (event, data, previewId, index) {
                var form = data.form;
                form.append('key', Common.generateUUID());
                form.append('accept', '');
                form.append('token', Common.getQiniuToken());
                

            })
            return fileObj;
        },
        initForm: function (options) {
            //默认参数
            var defaults = {
                formdata: "",
                isDebug: true   //是否需要调试，这个用于开发阶段，发布阶段请将设置为false，默认为false,true将会把name value打印出来
            }
            //如果传入的json字符串，将转为json对象
            var tempData = "";
            if ($.type(options) === "string") {
                defaults.formdata = JSON.parse(options);
            } else {
                defaults.formdata = options;
            }
            //设置参数
            // var setting = $.extend({}, defaults, tempData);
            var setting = defaults;
            var form = this;
            formdata = setting.formdata;

            //如果传入的json对象为空，则不做任何操作
            if (!$.isEmptyObject(formdata)) {
                var debugInfo = "";
                $.each(formdata, function (key, value) {
                    //是否开启调试，开启将会把name value打印出来
                    if (setting.isDebug) {
                        debugInfo += "name:" + key + "; value:" + value + "\r\n ";
                    }
                    //表单处理
                    var formField = form.find("[name='" + key + "']");
                    if ($.type(formField[0]) === "undefined") {
                        if (setting.isDebug) {
                            //console.warn("can not find name:[" + key + "] in form!!!"); //没找到指定name的表单
                        }
                    } else {
                        var fieldTagName = formField[0].tagName.toLowerCase();
                        if (fieldTagName == "input") {
                            if (formField.attr("type") == "radio") {
                                $("input:radio[name='" + key + "'][value='" + value + "']").attr("checked", "checked");
                            } else if (formField.attr("type") == "checkbox") {
                                $("input:checkbox[name='" + key + "'][value='" + value + "']").attr("checked", "checked");
                            } else {
                                formField.val(value);
                            }
                        } else if (fieldTagName == "label") {
                            formField.html(value);
                        } else if (fieldTagName == "select") {
                            formField.val(value).trigger('change');
                        } else {
                            formField.val(value);
                        }
                    }
                    //图片链接处理form.find("img[fieldata=img_url]")
                    var formImage = form.find("img[fieldata=" + key + "]");
                    if ($.type(formImage[0]) != "undefined") {
                        formImage.attr("src", value);
                    }
                    //a链接处理
                    var formLink = form.find("a[fieldata=" + key + "]");
                    if ($.type(formLink[0]) != "undefined") {
                        formLink.attr("href", value);
                    }
                })

            }
            return form;    //返回对象，提供链式操作
        }
    });
})(jQuery);











// var common = function(){
// 	var obj = {};
// 	var uptoken = "";
// 	var domain = "";
// 	obj.getqiniutoken = function(){
// 		    domain = 'http://os4skw475.bkt.clouddn.com';
//         var buckname = "forchild-user-dev";
//         $.ajax({
//           url:'/book/upimg/'+buckname+'',
//           type:'get',
//           dataType : 'json',
//           success:function(res){
//               uptoken = res.data;  
//           }
//         })
// 	}()
// 	obj.initqiniu = function(){
// 		alert(domain)
//         var params = {
//         runtimes: 'html5,flash,html4',      // 上传模式,依次退化
//         browse_button: 'imgFile',         // 
//         uptoken :uptoken, // uptoken 是上传凭证，由其他程序生成
    
//         get_new_uptoken: false,             // 
//         domain: domain,     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
//         //container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
//         max_file_size: '100mb',             // 最大文件体积限制
//         //flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
//         max_retries: 3,                     // 上传失败最大重试次数
//         dragdrop: true,                     // 开启可拖曳上传
//         //drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
//         chunk_size: '4mb',                  // 分块上传时，每块的体积
//         auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
//         init: {
//             'FilesAdded': function(up, files) {
//                 plupload.each(files, function(file) {
//                     // 文件添加进队列后,处理相关的事情

//                 });

//             },
//             'BeforeUpload': function(up, file) {
//                 // 每个文件上传前,处理相关的事情
//             },
//             'UploadProgress': function(up, file) {
//                 // 每个文件上传时,处理相关的事情

//             },
//             'FileUploaded': function(up, file, info) {

//                 var res = JSON.parse(info);
//                 var sourceLink = domain +"/"+ res.key;

               

//                  console.log(res)
              
//                 // console.log(sourceLink)
//                  //callback = sourceLink;
//                  //return sourceLink;
//                 // that.headpickey = res.key;
//                 // that.headpic = sourceLink;

             
//             },
//             'Error': function(up, err, errTip) {
//                 //上传出错时,处理相关的事情
//             },
//             'UploadComplete': function() {
//                 //队列文件处理完毕后,处理相关的事情
//             }
//         }
//     }
// 		var uploader = Qiniu.uploader(params);

		

// 	}
	   


// 	return obj
// }()