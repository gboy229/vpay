<!--  -->
<template>
  <div class='recharge-flow'>
    <div class="fff">
    
      <header>
      <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      <p>流量充值</p>
    </header>
    <div class="inputbox" >
      <p class="number">手机号</p>
      <input type="number" v-model="phonenumber" placeholder="请在此输入手机号" @keyup="inputactive" id="phonenumber">
      <p class="balance">余额: {{lgcnum}} LGC</p>
    </div>

    <div class="choosePrice">
      <ul class="pricelist">
        <li @click="passid(item.id,item.inprice)" v-for="(item,index) in phoneflow.flows" :key='index'>
            <div class="top">
                <span class="num">{{item.p}}</span>
                <!-- <span class="unit">M</span> -->
            </div>
            <p class="price">{{item.inprice}}元</p>
        </li>
      </ul>
    </div>
    <van-action-sheet v-model="show">
      <div class="content">
        <div class="details">
          <img src="../../assets/images/close_black.png" alt="" @click="show=false;passwordshow=false">
          <span class="payinfo">付款详情</span>
          <p class="title">{{cnyprice}}<span class="type">LGC</span></p>
          <p class="introduce">1.0000 LGC ≈ {{exchange_rate}} CNY</p>
          <div class="lgc">
            <div class="lgc1">
              <span class="left">余额 (LGC):</span>
              <span class="right">{{lgcnum}}</span>
            </div>
            <div class="lgc1">
              <span class="left">消耗 (LGC):</span>
              <span class="right">{{cnyprice}}</span>
            </div>
          </div>
          <div class="release">
            <van-button type="primary" block @click="passwordshow=true">确认支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <van-popup
    v-model="passwordshow"
    round
    position="bottom"
    :close-on-click-overlay="false"
    :style="{ backgroundColor: '#fff', height: '40%', textAlign: 'center', padding: '40px 0' }"
    class="popup"
    >
      <div class="head">
        <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
        <span>请输入交易密码</span>
      </div>
      <p>
        <span>{{cnyprice}}</span>
        <span>LGC</span>
      </p>
      <p class="error">{{errorInfo}}</p>
      <div class="shade" v-show="show_shade"></div>
      <van-password-input :value="value" :focused="showKeyboard"  @focus="showKeyboard = true" />
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
      <router-link to="/account/forgetPayPass" tag="p" class="find_pwd">找回密码并交易</router-link>
    </van-popup>
    
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
        phonenumber: null,
        show: false,

        passwordshow:false,
        value: '',
        showKeyboard: true,
        errorInfo: '',
        count:0,
        show_shade:false,

        phoneflow: [],
        chooseid: 0, // 选中的id
        chooseprice: 0, // 选中id对应的价格
        cnyprice: 0.0000,  // 传入rmb对应的lgc货币
        lgcnum: localStorage.getItem('lgc_num'),  // 余额
        exchange_rate: 0 // 汇率
      }
    },
    created() {
      
    },
    methods: {
      inputactive() {
        // console.log(this.phonenumber)
        if(this.phonenumber.length == 11){
          let mobileExp = /^19\d{9}$/;
        if(mobileExp.test(this.phonenumber)){
          this.$toast("该号码暂不支持");
        }else{
          document.querySelector('.pricelist').classList.add('active')
          this.get_mobile_flow()
        }
          
        }else {
          document.querySelector('.pricelist').classList.remove('active')
        }
        if(this.phonenumber.length >= 1){
          document.getElementById('phonenumber').setAttribute('style','border-bottom-color:#30d0a1')
        }else {
          document.getElementById('phonenumber').setAttribute('style','border-bottom-color:none')
        }
      },

      showPopup(){
        this.passwordshow = true;
      },
      hidePopup(){
        this.passwordshow = false;
        this.show = false
      },
      // 验证支付密码
      onInput(key) {





        this.value = (this.value + key).slice(0, 6);
        let self = this
        if(this.value.length===6){
          const url = '/Goods/recharge_mobile_flow'
          this.axios.post(url,{
            pid: this.chooseid,
            mobile: this.phonenumber,
            safe_password: this.value,
            // token: localStorage.getItem('token'),
          }).then(res=>{
            // this.pricetype = res
            console.log(res)
            if(res.data.status == 200){
              // Toast('充值成功')
              console.log('充值成功')
              this.$router.push('/business/clickreturn')
            }else if(res.data.status == 304) {
              // self.$messagebox.alert(res.data.message)
              // console.log(err.message)
              // this.$route.push('/rechargePhone')
              // 刷新页面
              // location.reload()
              this.value="";
              this.count ++;
              if(this.count ==1 ){
                this.errorInfo = "密码不正确，请重新输入";
              }else if(this.count>1 && this.count<5){
                this.errorInfo =  `密码不正确，您还有${5-this.count}次机会`
              }else{
                this.errorInfo = "您的输入机会已用完，请找回交易密码";
                this.showKeyboard = false;
                this.show_shade = true;
              }
            }
          })
        }




      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      },


      // 点击价格调出输入框
      passid(id,price) {
        this.show = true
        // console.log(id)
        this.chooseid = id
        // console.log(this.chooseid)
        this.chooseprice = price
        // console.log(this.chooseprice)
        // console.log(price)
        // console.log('nnnn')
        this.get_exchangePrice()
      },




      // 获取流量套餐
      get_mobile_flow() {
        // let self = this
        const url = '/Goods/check_mobile_flow'
        // if(this.phonenumber.length != 11) return
        
        this.axios.post(url,{
          mobile: this.phonenumber,
          // token: localStorage.getItem('token')
        }).then(res=>{
          // console.log(res.data.data[0])
          
          // self.$messagebox.alert('666')
          // console.log(this.phoneflow)
          // console.log(this.phoneflow.flows)
          if(res.data.status == 400){
            this.$messagebox.alert(res.data.message);
          }else{
            this.phoneflow = res.data.data[0]
          }
        })
      },


      // 充值流量
      // get_recharge_mobile_flow() {
      //   // let self = this
      //   const url = '/Goods/recharge_mobile_flow'
      //   this.axios.post(url,{
      //     pid: this.chooseid,
      //     mobile: this.phonenumber,
      //     safe_password: this.value,
      //     token: localStorage.getItem('token')
      //   }).then(res=>{
      //     console.log(res)
      //     // self.$messagebox.alert(res.data.message)
      //     // this.phoneflow = res
      //     // this.$router.push('/business/clickreturn')
      //   })
      // },

      // 获取余额及汇率
      get_exchangePrice() {
        const url = '/Coin/exchangePrice'
        this.axios.post(url,{
          price: this.chooseprice,
          // token: localStorage.getItem('token')
        }).then(res=>{
          this.cnyprice = res.data.data.cnyPrice
          // this.lgcnum = res.data.data.lgcNum
          this.exchange_rate = res.data.data.lgc_price
        })
      }
    }
  }

</script>
<style lang='scss' scoped>

  .recharge-flow {
    background-color: #fff;
    height: 100%;
    padding: 0 36px;
    header {
      text-align: center;
      position: relative;
      padding-top: 80px;
      img {
        position: absolute;
        top: 80px;
        left: 0;
        width: 21px;
      }
      p {
        font-size: 36px;
        line-height: 38px;
      }
    }
    .inputbox {
      background-color: #0f394b;
      border-radius: 20px;
      padding: 36px;
      margin-top: 45px;
      box-shadow: 0px 20px 22px #d9e0e3;
      .number {
        font-size: 26px;
        color: #30d0a1;
        line-height: 30px;
      }
      input {
        background-color: #0f394b;
        width: 100%;
        font-size: 36px;
        color: #fff;
        border-bottom: 1.5px solid #1d4556;
        padding-bottom: 20px;
        padding-top: 24px;
        // margin-top: 4px;
      }
      input::-webkit-input-placeholder {
        color: #798890;
      }

      input:-moz-placeholder {
        color: #798890;
      }

      input::-moz-placeholder {
        color: #798890;
      }

      input:-ms-input-placeholder {
        color: #798890;
      }
      .balance {
        font-size: 24px;
        line-height: 22px;
        color: #a6afb4;
        margin-top: 18px;
      }
    }

    .choosePrice {
      margin-top: 47px;

      .pricelist {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        
        li {
          border-radius: 13px;
          text-align: center;
          width: 141px;
          align-items: center;
          font-size: 28px;
          margin-bottom: 30px;
          color: #cbccce;
          border: 2.5px solid #e8eaec;
          padding-top: 10px;
          padding-bottom: 10px;
          
          .top {
              .num {
                  font-size: 23px;
                  color: #cbccce;
              }
              .unit {
                  font-size: 14px;
                  color: #cbccce;
              }
          }
          .price {
              font-size: 17px;
              color: #cbccce;
          }
        }
        li+li{
          margin-left:30px;
        }
        li:nth-child(5),
        li:nth-child(9){
          margin-left:0;
        }
      }

      .pricelist.active {
        li {
          border: 2.5px solid #30d0a1;
        }
        li .top .num, 
        li .top .unit,
        li .price {
          color: #30d0a1;
        }
      }
    }
    .content {
      padding: 36px;
      .details {
        text-align: center;
        line-height: normal;
        position: relative;
  
        img {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .payinfo {
          font-size: 30px;
          color: #011321;
          line-height: 34px;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
        }

        .title {
          padding-top: 78px;
          font-size: 46px;
          line-height: 46px;
          .type {
            transform: translateX(15px);
            font-size: 17px;
            display: inline-block;
            line-height: 17px;
          }
        }
        .introduce {
          font-size: 18px;
          line-height: 18px;
          color: #a3a6a8;
          margin-top: 30px;
        }

        .lgc {
          margin-top: 58px;
          .lgc1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 44px;
          }
          .left {
            font-size: 30px;
            line-height: 30px;
            color: #a3a6a8;
          }
          .right {
            font-size: 24px;
            color: #011321;
          }
        }

        .release {
          padding-top: 30px;
          button {
            background-color: #30d0a1;
            color: #ffffff;
            border-radius: 15px;
          }
        }
      }
    }


    // 复制来的密码
    .popup{
      width:80%;
      height:450px;
      z-index:2100;
      position: fixed;
      top:20%;
      left:10%;
      // margin-top:-250px;
      background-color:#fff;
      border-radius:20px;
      padding-top:40px;
      box-sizing: border-box;
      text-align: center;
      .head {
        position: relative;
        .close {
          width: 40px;
          position: absolute;
          left: 50px;
        }
        span {
          color:#041b29;
          font-size: 34px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      
      p {
        margin-top: 40px;
        span:first-child{
          font-size: 46px;
          font-weight: 500;
        }
        span:last-child{
          font-size: 17px;
          color:#001420;
        }
      }
      .error{
        color:#f55c57;
        font-size: 22px;
        margin:15px 0;
      }
      .find_pwd{
        color:#32d1a2;
        font-size: 22px;
        margin:18px 0;
      }
    }
    .shade{
      width:100%;
      height:120px;
      background-color: transparent;
      z-index:2200;
      position:absolute;
      top:60%;
    }
  }

</style>
