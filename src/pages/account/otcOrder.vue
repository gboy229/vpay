<!--  -->
<template>
  <div class='otcOrder-wrap'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>OTC 订单</span>
    </header>
    <nav>
      <div class="box">
        <ul class="nav-wrap">
          <li v-for="(item, index) in navList" :key="index" :class="current == index?'hover':''"
            @click="navBtn(item, index)">{{item.name}}</li>
        </ul>
      </div>
    </nav>

    <div class="ev-card" v-for="order in orderList">
      <div class="ev-card-header">
        <h1>
          <img src="../../assets/images/mllq.png" alt="">
          {{ order.user_name }}
        </h1>
        <p>时间：{{ order.create_time }}</p>
        <p>数量（LGC）：{{ order.amount }}</p>
        <p>交易类型：{{ order.trade_type }}</p>
      </div>
      <div class="ev-card-content">
        <div class="ev-card-content-top">
          <p>¥ {{ order.total_amount }}</p>
          <p>交易总额</p>
        </div>
        <div class="ev-card-content-bottom">
          <p>{{ order.status }}</p>
          <router-link to="/account/otcOrderDetail" tag="p">查看详情></router-link>
        </div>
      </div>
    </div>

    <!--空订单-->
    <div class="wrap">
      <img src="../../assets/images/msj.png" alt="" class="logo">
      <p>还没有任何数据哦！</p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        navList: [{
            'api': 'getIndexOther',
            'banner': 'getIndexBanner',
            'name': '全部'
          },
          {
            'api': 'getOutfootMain',
            'banner': 'getOutfootBanner',
            'name': '待付款'
          },
          {
            'api': 'getgnFootMain',
            'banner': 'getgnFootBanner',
            'name': '待放行'
          },
          {
            'api': 'getYcMain',
            'banner': 'getYcMain',
            'name': '申诉中'
          },
          {
            'api': 'getCBAMain',
            'banner': 'getCBAPic',
            'name': '已完成'
          },
          {
            'api': 'getNBAMain',
            'banner': 'getNBAPic',
            'name': '已取消'
          },
          {
            'api': 'getTYMain',
            'banner': 'getTYBanner',
            'name': '已超时'
          },
        ],
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
        ]
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
    }
  }

</script>
<style lang='scss' scoped>
  .otcOrder-wrap {
    font-family: PingFangSC;
    font-weight: 400;

    header {
      text-align: center;
      position: relative;
      height: 66px;
      padding-top: 66px;
      margin-bottom: 46px;

      img {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }

      span {
        font-size: 36px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }
    }

    nav {
      height: 90px;

      .box {
        overflow-x: scroll;
        overflow-y: hidden;

        .nav-wrap {
          width: 120%;
          display: flex;
          align-items: center;

          li {
            display: block;
            width: 200px;
            height: 60px;
            background: rgba(48, 208, 161, .2);
            border-radius: 30px;
            font-size: 24px;
            color: rgba(48, 208, 161, 1);
            text-align: center;
            line-height: 60px;
            margin: 0 16px;
          }

          .hover {}
        }
      }
    }

    .ev-card {
      display: flex;
      align-items: stretch;
      margin: 25px 16px;

      .ev-card-header {
        flex: 2;
        padding: 26px;
        border-radius: 15px 0 0 15px;
        background-color: #0f394b;

        h1 {
          padding-bottom: 25px;
          font-size: 32px;
          color: #ffffff;

          img {
            width: 85px;
            height: 85px;
          }
        }

        p {
          padding-bottom: 10px;
          color: rgba(255, 255, 255, .5);
        }
      }

      .ev-card-content {
        flex: 1;

        .ev-card-content-top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 50%;
          border-top-right-radius: 15px;
          background-color: #3f5846;

          p:first-child {
            font-size: 32px;
            color: #f0d44e;
          }

          p:last-child {
            color: rgba(255, 255, 255, .5);
          }
        }

        .ev-card-content-bottom {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 50%;
          border-bottom-right-radius: 15px;
          background-color: #16575c;

          p:first-child {
            font-size: 32px;
            color: rgba(255, 255, 255, 1);
          }

          p:last-child {
            color: rgba(255, 255, 255, .5);
          }
        }
      }

    }

    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 272px;

      .logo {
        width: 420px;
        height: 330px;
      }

      p {
        font-size: 20px;
        color: rgba(255, 255, 255, .5);
        padding: 30px 0;
      }
    }

  }

</style>
