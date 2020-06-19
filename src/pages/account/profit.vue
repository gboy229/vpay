<!--  -->
<template>
  <div class='otcOrder-wrap'>
    <header>
      <img class="header-item-left" src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>分享收益</span>
    </header>

    <div class="otc-order-header">
      <img :src="img_head" alt="">
      <h1>{{allReward}}</h1>
      <p>我的加速收益 USDT/天</p>
      <p class="small">管理津贴 {{teamReward}}</p>
    </div>

    <div class="ev-card" v-for="(item,index) of info" :key="index">
      <div class="ev-card-left">
        <div class="ev-card-left-header">
          <img src="../../assets/images/mllq.png" alt="">
          <p><span class="ev-username">{{item.username}}</span><br>ID{{item.userid}}</p>
        </div>
        <p class="ev-card-left-footer">
          <span class="grade">L{{item.market_grade}}</span>
          {{item.buy_time}}
        </p>
      </div>
      <div class="ev-card-center">
        <p>资产包</p>
        <p>{{item.amount}}</p>
        <p>USDT</p>
      </div>
      <div class="ev-card-right">
        <p>加速收益</p>
        <p>{{item.reward}}</p>
        <p>USDT/ 天</p>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
  export default {
    data() {
      return {
        current: 0,
        orderList: [
          {
            'user_name': '白日梦想家',
            'create_time': '2020.06.11',
            'amount': '20.0000',
            'trade_type': '购买 LGC',
            'total_amount': '20.0000',
            'status': '已完成'
          },
          {
            'user_name': '白日梦想家',
            'create_time': '2020.06.11',
            'amount': '20.0000',
            'trade_type': '购买 LGC',
            'total_amount': '20.0000',
            'status': '待付款'
          }
        ],
        info:[],
        allReward:"",
        teamReward:""
      }
    },
    created() {

    },
    methods: {
      navBtn(item, index) {
        this.current = index;
        let params = item.api;
        let banners = item.banner;
        /*api[params]().then((v) => {
          this.dataList = v.data;
          this.imgUrl = v.data[0].image;
        })
        api[banners]().then((v) => {
          this.bannerList = v.data.slice(0, 5);
        })*/
      }
    },
    mounted(){
      this.axios.post("/Currency/getTeamReward").then(res=>{
        // console.log(res.data);
        this.info = res.data.data.list;
        this.allReward = res.data.data.allReward;
        this.teamReward = res.data.data.teamReward;
      })
    },
    computed:{
      ...mapState(["img_head"])
    }
  }

</script>
<style lang='scss' scoped>
  .otcOrder-wrap {
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: 400;

    header {
      position: relative;
      height: 66px;
      padding-top: 66px;
      margin-bottom: -2px;
      background-color: #0f394b;
      text-align: center;

      .header-item-left {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }

      span {
        font-size: 36px;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }

    }

    .otc-order-header {
      padding: 60px 0;
      margin-bottom: 30px;
      text-align: center;
      border-radius: 0 0 50px 50px;
      background-color: #0f394b;

      img {
        width: 82px;
        padding-bottom: 30px;
      }

      h1 {
        font-size: 64px;
        color: #fff;
      }

      p {
        color: rgba(255, 255, 255, .5);
      }
      .small{
        color: rgba(48, 208, 161, 1);
        margin-top:10px;
      }
    }

    .ev-card {
      display: flex;
      align-items: center;
      padding: 30px;
      margin: 25px 16px;
      border-radius: 10px;
      background-color: #fff;

      p {
        color: rgba(0, 0, 0, .5);
      }

      .ev-card-left {
        flex: 2;

        .ev-card-left-header {
          display: flex;
          align-items: center;
          padding-bottom: 20px;

          img {
            width: 80px;
            height: 80px;
            margin-right: 16px;
          }

          .ev-username {
            font-size: 32px;
            color: #011321;
          }
        }

        .ev-card-left-footer {
          .grade{
            display: inline-block;
            width:15%;
            background-color:rgba(255,214,48,0.2);
            text-align: center;
            border-radius:15px;
            color:#ffd630;
          }
        }

      }

      .ev-card-center,
      .ev-card-right {
        flex: 1;

        p:first-child {
          font-size: 28px;
        }

        p:nth-child(2) {
          font-size: 32px;
          color: #011321;
        }
      }

      .ev-card-center {
        text-align: center;

        p:nth-child(2) {
          font-size: 32px;
          border-left: 1px solid rgba(1, 19, 33, .1);
          border-right: 1px solid rgba(1, 19, 33, .1);
          color: #011321;
        }
      }

      .ev-card-right {
        text-align: right;
      }

    }

  }

</style>
