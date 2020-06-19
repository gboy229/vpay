<template>
<div class="yz">
  <van-slider v-model="value" @change="onChange" :disabled="disabled">
    <div slot="button">
      <img :src="src" alt="">
    </div>
  </van-slider>
  <p class="message">{{message}}</p>
</div>
</template>
<script>
export default {
  data(){
    return {
      value:6,
      disabled:false,
      src:require('../assets/images/yz_right.png'),
      message:"按住滑动到最右边"
    }
  },
  methods:{
    onChange(){
      if(this.value >= 100){
        this.src = require('../assets/images/yz_suc.png')
        this.disabled = true;
        this.message = "验证通过"
        this.$emit("showIt",true);
      }
    }
  }
}
</script>
<style lang="scss">
.yz{
  margin-top:50px;
  .message{
    color:#fff;
    position:relative;
    top:-70px;
    left:40%;
  }
  img{
    height:100px;
  }
}
</style>
<style>
  .van-slider{
    width:95% !important;
    margin:0 20px 0 5px;
    border-radius:30px;
    background-color:#000;
  }
  .van-slider__bar{
    height:100px !important;
    background-color: #30d0a1;
  }
  
</style>