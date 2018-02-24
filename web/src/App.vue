<template>
  <div id="app">
     <el-container style="height: 100%; border: 1px solid #eee">
  
    <el-header style="text-align: right; font-size: 12px">
      <h3>小程序管理系统</h3>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;color:#ffffff"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>

    <el-container>
         <el-aside width="200px" style="background-color: #364150">
          <ul class="ul">
            <li style="margin-top:10px;"><router-link v-bind="{to:'/home'}">首页</router-link>></li>
            <li><router-link v-bind="{to:'/carousel'}">轮播图管理</router-link></li>
             <li><router-link v-bind="{to:'/home'}">导航栏管理</router-link>></li>
              <li><router-link v-bind="{to:'/home'}">产品中心</router-link></li>
               <li><router-link v-bind="{to:'/home'}">预约中心</router-link></li>
               <li><router-link v-bind="{to:'/home'}">联系我们</router-link></li>
          </ul>
        </el-aside>


        <router-view/>
  
    </el-container>
    
</el-container>






    
    
  </div>





</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body,html{
  margin: 0;
/*  background: #364150;*/
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

 .el-header {
    background-color: #2b3643;
    color: #333;
    line-height: 60px;
  }
  .el-header h3{
    float: left;
    color: #ffffff;
    font-size: 25px;
    line-height: 15px;
    margin-left: 200px;

  }
  .ul{
    padding: 0px;
    margin: 0px;
    list-style: none;
  }
  .ul li{
    line-height: 30px;
    margin-bottom: 5px;
    border-bottom: 1px solid #3d4957;
  }
  .ul li a{
    color: #b4bcc8;
    text-decoration: none;
    font-size: 16px;
    text-align:center;
  }






</style>
