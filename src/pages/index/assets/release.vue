<template>
  <div class="release">
    <div class="header_box">
      <div class="header">
        <img src="../../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
        <span>释放详情</span>
      </div>
      <p>0.0000</p>
      <p>资产包余额USDT</p>
    </div>
    <div class="release_detail">
      <img src="../../../assets/images/release_detail.png" alt="">
      <div v-for="(item,index) of info" :key="index" class="release_list">
        <div>
          <p>{{item.title}}</p>
          <p>{{item.date}}</p>
        </div>
        <div>
          <p>{{item.USDT}} USDT</p>
          <p>{{item.LGC}} LGC</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      info:[
        {title:"本金释放", date:"2020.06.11 06:26", USDT:"-16.1264", LGC:"-14.0146"},
        {title:"本金释放", date:"2020.06.11 06:26", USDT:"-16.1264", LGC:"-14.0146"},
        {title:"本金释放", date:"2020.06.11 06:26", USDT:"-16.1264", LGC:"-14.0146"}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .release{
    .header_box{
      background-color:rgb(15,57,75);
      height:350px;
      padding-top:50px;
      border-radius:0px 0px 60px 60px;
      text-align: center;
      .header {
        position: relative;
        height: 66px;
        line-height:100px;
        font-size:36px;
        margin-bottom:50px;
        color: #30D0A1;
        img {
          position: absolute;
          top: 50%;
          left: 36px;
        }
      }
      p:nth-child(2){
        color:#fff;
        font-size:90px;
      }
      p:last-child{
        color:rgba(255,255,255,0.5);
        font-size:28px;
      }
    }
    .release_detail{
      margin-top:50px;
      padding:0 36px;
      img{
        margin-bottom:40px;
      }
    }
    .release_list{
      display: flex;
      justify-content: space-between;
      padding:20px 0;
      color:rgba(255,255,255,0.3);
      border-bottom:1px solid #0a393b;
      div>p:first-child{
        color:#fff;
        font-size:36px;
        margin-bottom:5px;
      }
      div:last-child{
        text-align: right;
      }
    }
  }
</style>
