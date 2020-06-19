<!--  -->
<template>
  <div class='clickreturn'>
    <div class="fff">
      <header>
        <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      </header>

      <div class="inner">
        <div class="imgbox">
          <img src="../../assets/images/ok.png" alt="">
        </div>
        <p class="p1">已完成</p>
        <p class="p2">交易已完成,点击返回</p>
        <button @click="clickreturn">点击返回</button>
      </div>

      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    created() {
      
    },
    methods: {
      clickreturn() {
        this.$router.push('/')
      }
    }
  }

</script>
<style lang='scss' scoped>
  .clickreturn {
    background-color: #fff;
    height: 100%;
    .fff {
      background-color: #fff;
    }
    header {
      text-align: center;
      position: relative;
      height: 66px;
      padding-top: 66px;

      img {
        width: 16px;
        height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }
    }

    .inner {
      text-align: center;
      margin-top: 250px;
      .imgbox {
        img {
          width: 120px;
          height: 120px;
        }
      }
      .p1 {
        font-size: 38px;
        color: #000000;
        margin-top: 23px;
        line-height: 30px;
      }
      .p2 {
        font-size: 26px;
        color: #a3a3a3;
        margin-top: 13px;
      }
      button {
        width: 240px;
        height: 73px;
        background-color: #30d0a1;
        color: #fff;
        text-align: center;
        border-radius: 73px;
        margin-top: 40px;
        font-size:26px;
      }
    }

  }

</style>
