<!--  -->
<template>
  <div class='otcOrder-wrap'>
    <header>
      <img class="header-item-left" src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>订单详情</span>
      <div class="header-item-right">联系
        <img src="../../assets/images/account/icon-message.png" alt=""></div>
    </header>

    <div class="otc-order-header">
      <img v-if="orderInfo.status === 1" src="../../assets/images/account/icon-success.png" alt="">
      <img v-else src="../../assets/images/account/icon-warning.png" alt="">
      <h1>{{ orderInfo.status_name }}</h1>
      <p v-if="orderInfo.status === 1">
        卖家确认并放行，交易完成
      </p>
      <p v-else>
        您还没有付款，交易未完成
      </p>
    </div>

    <div class="ev-wrap">
      <table class="ev-table">
        <tbody>
        <tr>
          <td>交易总额</td>
          <td>¥{{ orderInfo.total_amount }}</td>
        </tr>
        <tr>
          <td>单价</td>
          <td>¥{{ orderInfo.unit_price }}</td>
        </tr>
        <tr>
          <td>交易类型</td>
          <td>{{ orderInfo.trade_type }}</td>
        </tr>
        <tr>
          <td>卖家</td>
          <td>{{ orderInfo.seller_name }}</td>
        </tr>
        <tr>
          <td>支付时间</td>
          <td>{{ orderInfo.pay_time }}</td>
        </tr>
        <tr>
          <td>交易单号</td>
          <td>{{ orderInfo.order_num }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="btn" v-if="orderInfo.status !== 1">去付款</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        orderInfo: {
          'trade_type': '购买 LGC',
          'order_num': 'L215469872103654852190',
          'seller_name': '白日梦想家',
          'unit_price': '0.6014',
          'total_amount': '20.0000',
          'pay_time': '2020.06.11 08:30:30',
          'status_name': '已完成',
          'status': 1,
        }
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
    font-family: PingFangSC, sans-serif;
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
        font-size: 30px;
        font-family: PingFangSC, sans-serif;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }

      .header-item-right {
        position: absolute;
        top: 74px;
        right: 36px;
        color: rgba(48, 208, 161, 1);
      }
    }

    .otc-order-header {
      padding: 60px 0;
      text-align: center;
      border-radius: 0 0 50px 50px;
      background-color: #0f394b;

      img {
        width: 82px;
        padding-bottom: 30px;
      }

      h1 {
        font-size: 32px;
        color: #fff;
      }

      p {
        color: rgba(255, 255, 255, .5);
      }
    }

    .ev-wrap{
      margin: 32px 16px;

      .ev-table {
        width: 100%;

        td {
          padding: 10px;
          font-size: 26px;
        }
        td:first-child {
          width: 20%;
          color: rgba(255, 255, 255, .5);
        }
        td:last-child {
          width: 80%;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .btn {
      width: 620px;
      height: 84px;
      background: rgba(48, 208, 161, 1);
      border-radius: 24px;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 78px;
      text-align: center;
      margin: 130px auto;
    }

  }

</style>
