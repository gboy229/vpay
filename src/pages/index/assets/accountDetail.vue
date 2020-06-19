<template>
  <div class="account_detail">
    <div>
      <div class="header">
        <img src="../../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
        <span>账户详情</span>
      </div>
      <div class="balance">
        <p>资产包余额USDT</p>
        <p>{{amount}}</p>
        <!-- <router-link class="details" to="/release">查看释放详情</router-link> -->
      </div>
    </div>
    <div class="wrap">
      <p class="title">资产包开通详情</p>
      <div>
        <ul class="card" v-for="(item,index) of info" :key="index" :class="item.class_name">
          <li>
            <img src="../../../assets/images/date.png" alt="">
            <span>日期</span>
            <p>{{item.createtime}}</p>
          </li>
          <li>
            <img src="../../../assets/images/money.png" alt="">
            <span>金额</span>
            <p>{{item.amount}}</p>
          </li>
          <li>
            <img src="../../../assets/images/asset.png" alt="">
            <span>资产</span>
            <p>{{item.total_mount}}</p>
          </li>
          <li>
            <div>
              <div>
                <img src="../../../assets/images/release.png" alt="">
                <span>释放</span>
              </div>
              <router-link class="detail" :to="`/releaseDetail/${item.id}`">详情</router-link>
            </div>
            <p>{{item.release_amount}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      info:[],
      amount:""
    }
  },
  mounted(){
    this.axios.post("/Currency/getUserAmount",{
      token:localStorage.getItem("token")
    }).then(res=>{
      console.log("res.data",res.data);
      this.info = res.data.data.list;
      this.amount = res.data.data.amount;
      console.log(this.amount)
    })
  }
}
</script>
<style lang="scss" scoped>
  .account_detail{
    height:100%;
    .header {
      text-align: center;
      position: relative;
      height: 66px;
      line-height:100px;
      font-size:36px;
      margin-top:50px;
      color: #30D0A1;
      img {
        position: absolute;
        top: 50%;
        left: 36px;
      }
    }
    .balance{
      text-align:center;
      p:first-child {
        color: rgba(255, 255, 255, .5);
        margin-top: 62px;
      }
      p:nth-child(2){
        font-size:70px;
        color:#fff;
        margin:15px 0;
      }
      .details{
        display: inline-block;
        width:250px;
        height:70px;
        line-height: 70px;
        border-radius: 50px;
        color: rgba(48, 208, 161, 1);
        background-color: rgba(48, 208, 161, .3);
        font-size:28px;
      }
    }
    .wrap{
      border-radius: 45px 45px 0 0;
      background-color: #ffffff;
      margin-top:60px;
      padding:50px;
      height:100%;
      .title{
        font-size:42px;
        font-weight: bold;
      }
      .card{
        
        padding:30px 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        
        border-radius: 40px;
        color:rgba(255, 255, 255, .8);
        margin-top:30px;
        li{
          flex:50%;
          img{
            margin-right:10px;
            margin-top:-5px;
          }
          p{
            color:#fff;
            font-size:30px;
            margin-top:10px;
          }
          div:first-child{
            display:flex;
            justify-content: space-between;
            .detail{
              display:block;
              width:100px;
              height:42px;
              background-color:#fff;
              color:#000;
              border-radius:20px;
              text-align: center;
              line-height:42px;
            }
          }
        }
      }
      .color_green{
        background-color:#30D0A1;
      }
      .color_blue{
        background-color: #47d3f4;
      }
      .color_purple{
        background-color: #6e90f4;
      }
      .color_orange{
        background-color: #ed9e51;
      }
    }
  }
</style>
