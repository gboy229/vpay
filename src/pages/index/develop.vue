<template>
  <div class="develop">
    <div class="header">
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
    </div>
    <div class="develop_div">
      <img src="../../assets/images/develop.png" alt="" class="develop_img">
      <p>开发中...</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.develop{
.header {
    position: relative;
    height: 66px;
    margin-top:50px;
    img {
      position: absolute;
      top: 50%;
      left: 36px;
    }
  }
  .develop_div{
    color:#fff;
    text-align: center;
    position: fixed;
    top:50%;
    left:50%;
    margin-top:-200px;
    margin-left:-200px;
    p{
      margin-top:20px;
    }
  }
  .develop_img{
    width:400px;
  }
}
  
</style>