<!--  -->
<template>
  <div class='tx-wrap'>
    <div class="wrap">
        <div class="header">
            <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
            <span>订单详情</span>
        </div>
        <div class="state" v-if="state=='success'">
            <div class="img">
                <img src="../../assets/images/success.png" alt="">
            </div>
            <p class="paystate">已完成</p>
            <p class="payinfo">卖家确认并放行,交易完成</p>
        </div>
        <div class="state" v-if="state=='doing'">
            <div class="img">
                <img src="../../assets/images/error.png" alt="">
            </div>
            <p class="paystate">交易中</p>
            <p class="payinfo">您的交易正在进行中...</p>
        </div>
        <div class="state" v-if="state=='error'">
            <div class="img">
                <img src="../../assets/images/error.png" alt="">
            </div>
            <p class="paystate">交易失败</p>
            <p class="payinfo">您的交易超时或付未付款,交易失败</p>
        </div>
    </div>

    <div class="content">
        <div>
            <span class="left">交易总额</span>
            <span class="right">{{orderinfo.trade_sum_price || 0}}</span>
        </div>
        <div>
            <span class="left">单价</span>
            <span class="right">{{orderinfo.trade_price || 0}} USDT</span>
        </div>
        <div>
            <span class="left">数量</span>
            <span class="right">{{orderinfo.coin_amount || 0}} USDT</span>
        </div>
        <div>
            <span class="left">交易类型</span>
            <span class="right">{{orderinfo.trade_arrow || 0}} USDT</span>
        </div>
        <div>
            <span class="left">支付时间</span>
            <span class="right">{{orderinfo.trade_order_time || 0}}</span>
        </div>
        <div>
            <span class="left">交易单号</span>
            <span class="right">{{orderinfo.company_order_num || 0}}</span>
        </div>
        <div>
            <span class="left">商户订单号</span>
            <span class="right">{{orderinfo.otc_order_num || 0}}</span>
        </div>
    </div>
    
  </div>
</template>

<script>

  export default {
    data() {
      return {
          state: 'success', // 三种状态
          orderno: '',  // 订单号
          orderinfo: '', // 订单信息
      }
    },
    created() {
        if(location.href.split('=')[1]) {
            this.orderno = location.href.split('=')[1]
        }
        this.get_coin_order(this.$route.query.id)
    },
    updated() {
        // this.get_coin_order()
    },
    methods: {
        get_coin_order(orderno) {
            const url = '/Coin/get_coin_order'
            this.axios.post(url,{
                company_order_num: this.orderno
            }).then(res=>{
                this.orderinfo = res.data.data
                // this.state = res.data.message
                // console.log(res)
            })
        }
    }
  }

</script>
<style lang='scss' scoped>
  .tx-wrap {
    font-family: PingFangSC;
    .wrap {
        background-color: #0f394b;
        border-bottom-left-radius: 45px;
        border-bottom-right-radius: 45px;
        .header {
            padding: 80px 45px 0;
            text-align: center;
            font-size: 30px;
            color: #30d0a1;
            font-weight: 600;
            position: relative;
            img {
                left: 45px;
                position: absolute
            }
        }
        
        .state {
            text-align: center;
            padding-bottom: 60px;
            .img {
                margin-top: 30px;
                img {
                    width: 84px;
                }
            }
            .paystate {
                font-size: 36px;
                color: #fff;
                margin-top: 30px;
            }
            .payinfo {
                font-size: 20px;
                color: #a6afb4;
                margin-top: 20px;
            }
        }

    }

    .content {
        padding: 0 45px;
        margin-top: 40px;
        .left {
            width: 170px;
            display: inline-block;
            font-size: 28px;
            color: #a4a7a9;
        }
        .right {
            font-size: 28px;
            color: #fff;
        }
        >div {
            margin-bottom: 30px;
        }
    }
  }

</style>
