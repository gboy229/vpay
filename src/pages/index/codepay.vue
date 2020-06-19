<template>
  <div id="codepay">
    <div class="fff">
      <header>
        <img src="../../assets/images/back.png" alt="" @click="$router.push('/');">
      </header>
      <div class="text">
        <img src="../../assets/images/paycode.png" alt="">
      </div>
      <div class="inputbox" >
        <p class="number">支付金额</p>
        <div class="inner">
          <div class="left">
            <input type="number" v-model="amount" placeholder="请输入需要支付的金额" id="amount">
          </div>
          <div class="right">CNY</div>
        </div>
      </div>
      <div class="inputbox" >
        <p class="number">支付密码</p>
        <div class="inner">
          <div class="left">
            <input type="password" v-model="paypass" placeholder="请输入您的支付密码">
          </div>
        </div>
      </div>
      <div class="tips" v-if="scanType == 2">
        <div class="title">温馨提示:</div>
        <p class="text">请确认您的USDT充值链类型为ERC20链类型, 错误的链类型会导致资产丢失哦。USDT充值区块确认时间为1-5分钟</p>
      </div>
      <div class="button">
        <button @click="onsubmit">确认支付</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        amount: '',
        paypass: '',
        scanType: this.$route.params.scanType || 0,  // 0 错误类型 1 支付宝 2 USDT
        address: this.$route.params.address,
        // address: 'https://qr.alipay.com/fkx15844wkw0hx1es6dqlea?t=1592463157474',
      }
    },
    methods: {
      onsubmit() {
        // console.log(this.address.split("?")[0]);return false;

        switch (this.scanType)
        {
          case 1:
            // 支付宝收款
            // console.log(this.scanType);
            this.alipay();
            break;
          case 2:
            // USDT 提现
            // console.log(this.scanType);
            this.ethpay();
            break;
          default:
            this.$messagebox.alert('请扫正确的二维码');
        }
      },

      // 支付宝支付
      alipay() {
        let _self = this;
        // 获取扫码订单号
        this.axios.post('/Coin/QrCodeOrder', {
          amounts: _self.amount,
          safe_password: _self.paypass,
          token: localStorage.getItem('token'),
        }).then(function (res) {
          // 返回状态
          var _status = res.data.status;
          // 返回信息
          var _msg = res.data.message;
          // 订单号
          // this.orderno = res.data.data.orderno;
          var _orderNo = res.data.data.orderno;

          // console.log(res.data.data.orderno);

          if (_status === 200) {
            // 调取扫码收款
            _self.axios.get('http://digitalcourtpd.cn:8080/index.php/index/index/transfer', {
              params: {
                qr_url: _self.address.split("?")[0],
                amount: _self.amount,
                orderno: _orderNo,
                notify_url: 'http://vpay.huziru.com/Home/Coin/QrCodeOrder'
              }
            }).then(function (res) {

              // if (res.status === 200) {
                _self.$messagebox.alert('支付成功!').then(action=> {
                  _self.$router.push('/');
                });
              // } else {
              //   _self.$messagebox.alert('支付失败!');
              // }
            })
            
          } else {
            _self.$messagebox.alert(_msg);
          }

        }).catch(function (error) {
          console.log(error);
        })
      },

      // USDT 提现
      ethpay() {
        let _self = this;
        this.axios.post('/Coin/TransferOut', {
          address: _self.address,
          amounts: _self.amount,
          safe_password: _self.paypass,
          token: localStorage.getItem('token'),
        }).then(function (res) {
          // 返回状态
          var _status = res.data.status;
          // 返回信息
          var _msg = res.data.message;

          if (_status === 200) {
            _self.$messagebox.alert(_msg).then(action=> {
              _self.$router.push('/');
            });
          } else {
            _self.$messagebox.alert(_msg);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #codepay {
    background-color: #011321;
    height: 100%;
    .fff {
      background-color: #011321;
      padding: 0 36px;
      header {
        margin-top: 80px;
        img {
          width: 21px;
        }
      }
      .text {
        margin-top: 60px;
        img {
          width: 196px;
        }
      }

      .inputbox {
        margin-top: 60px;
        .number {
          font-size: 20px;
          color: #30d0a1;
          line-height: 30px;
        }
        input {
          background-color: transparent;
          width: 100%;
          font-size: 30px;
          color: #fff;
          border-bottom: 1.5px solid #0a393b;
          padding-bottom: 20px;
          padding-top: 30px;
        }
        .inner {
          position: relative;
          .right {
            color: #fff;
            font-size: 23px;
            right: 0;
            top: 32px;
            position: absolute;
          }
        }
      }
      .tips {
        margin-top: 30px;
        .title {
          font-size: 24px;
          color: #fff;
          line-height: 24px;
        }
        .text {
          font-size: 18px;
          line-height: 36px;
          color: #a4a7a9;
          margin-top: 15px;
        }
      }
      .button {
        margin-top: 70px;
        text-align: center;
        button {
          width: 100%;
          height: 73px;
          background-color: #30d0a1;
          color: #fff;
          border-radius: 15px;
        }
      }
    }
  }
</style>
