<template>
       <div class="carousel">
       	<el-breadcrumb separator-class="el-icon-arrow-right">
       		<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
       		<el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
       	</el-breadcrumb>

       	<div class="list">
       		<div class="add">
       			<button @click="jquery()">dddd</button>
       			<el-button class="addbtn" @click="dialogVisible = true" type="primary">添加图片</el-button>
       		</div>
       		<el-row>
       			<el-col :span="8" v-for="(o, index) in 10" :key="o" >
       				<el-card :body-style="{ padding: '0px' }">
       					<img src="http://os4skw475.bkt.clouddn.com/f7ce9e9cbe3d076887625c2cf1cc6401" class="image">
       					<div style="padding: 14px;">
       						
       						<div class="bottom clearfix">
       							
       							<el-button type="text" class="button delete">删除</el-button>
       							<el-button type="text" class="button edi">编辑</el-button>
       						</div>
       					</div>
       				</el-card>
       			</el-col>
       		</el-row>
       		
       	</div>

       	<el-dialog
       	title="选择图片"
       	:visible.sync="dialogVisible"
       	width="50%"
       	:before-close="handleClose">
       	<div class="up">
       		 <input type="file" name="file" id="imgFile" />
       	</div>
       	<span slot="footer" class="dialog-footer">
       		<el-button @click="dialogVisible = false">取 消</el-button>
       		<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       	</span>
       </el-dialog>

       




       </div>
</template>




<script type="ecmascript-6">

export default{
      name:'',
      data(){
            return {
               dialogVisible: false
       }
},

created(){

},
methods:{
   handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      jquery(){
      	
      	  $("#imgFile").qiniu({
            showCaption: false,
            maxFileCount: 45,
            browseClass: '',
            browseLabel: '<div class="z_file"></div>'
        }).on('fileuploaded', function (event, data, msg) {
            var key = data.response.key;
            console.log(key)
            obj.bookpic = key;
        }).on('filebatchuploadcomplete', function (event, files, extra) {
            obj.addbook();
        });
      }
    }
}




</script>



<style scoped>
.carousel{
	padding: 20px;
	width: 100%;
	overflow: auto;
}



.list{
	padding: 10px;
}
.add{
	display: block;
	overflow: hidden;
}
.add .addbtn{
	 float: right;
	 margin-bottom: 10px;

}
.el-col{
	margin-bottom: 20px;
	margin-right: 20px;
}
.el-col-8{
	width: 22% !important;
}

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
.edi{
	float: left;
}
   .delete{
   	color: red;
   }
  .image {
    width: 100%;
    height: 150px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }



</style>