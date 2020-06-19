<!--  -->
<template>
  <div class='exchange-wrap'>
    <div class="header">
      <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      <span>兑换</span>
    </div>

    <div class="wrap">
      <p class="dh">1LGC = 0.1426USDT</p>
      <p class="ye">当前余额：{{ parseInt(lgc_num).toFixed(4) }}LGC</p>
      <div class="wrap-bottom">
        <div class="box">
          <img src="../../assets/images/lgc.png" alt="">
          <p>LGC</p>
        </div>
        <img src="../../assets/images/sjt.png" class="sjt" alt="">
        <div class="box">
          <img src="../../assets/images/usdt.png" alt="">
          <p>USDT</p>
        </div>
      </div>
    </div>

    <div class="input-wrap">
      <p>兑换数量</p>
      <div class="input-box" :style="changeBorder">
        <input type="number" placeholder="请填写兑换数量" class="input_style" @focus="focus" @blur="blur" v-model="numbers">
        <span>USDT</span>
      </div>
    </div>
    <div class="input-wrap border_bottom">
      <p>需要</p>
      <div class="input-box">
        <input type="number" :value="numbers_lgc" class="input_style" @focus="focus" @blur="blur" disabled>
        <span>LGC</span>
      </div>
    </div>

    <div class="btn" @click="showPopup">确认</div>
    <div class="popup" v-show="show">
      <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
      <span>请输入交易密码</span>
      <p>
        <span>¥</span>
        <span>{{numbers}}</span>
      </p>
      <p class="error">{{errorInfo}}</p>
      <div class="shade" v-show="show_shade"></div>
      <!-- vant密码组件 -->
      <van-password-input :value="safe_password" :focused="showKeyboard"  @focus="showKeyboard = true" />
      <!-- vant键盘组件 -->
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
      <router-link to="/account/forgetPayPass" tag="p" class="find_pwd">找回密码并交易</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        changeBorder:{
          "border-bottom": "1px solid rgba(0, 0, 0, .1)"
        },
        show:false,
        errorInfo: '',
        count:0,
        show_shade:false,
        showKeyboard: true,
        safe_password:"", //	操作密码
        numbers:"", //输入的数量
        numbers_lgc: 0,  // LGC 兑换金额
        lgc_num: localStorage.getItem('lgc_num')  // LGC 金额
      }
    },
    created() {
      
    },
    methods: {
      focus(){
        this.changeBorder["border-bottom"]="1px solid #30D0A1"
      },
      blur(){
        this.changeBorder["border-bottom"]="1px solid rgba(0, 0, 0, .1)"
      },
      showPopup(){
        if(!this.numbers){
          this.$messagebox.alert("兑换数量不能为空");
        }else{
          this.show = true;
        }
      },
      hidePopup(){
        this.show = false;
      },
      // 验证支付密码
      onInput(key) {
        this.safe_password = (this.safe_password + key).slice(0, 6);
        if(this.safe_password.length===6){
          this.axios.post("/Coin/lgcExchangeUsdt",
            {
              numbers: this.numbers,
              safe_password: this.safe_password
            }
          ).then(res=>{
            // console.log(res.data);
            let status = res.data.status;
            if(status == 304){
              //密码错误清空密码
              this.safe_password="";
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
            }else if(status == 200){
              this.safe_password = "";
              // console.log("成功");
              this.$messagebox.alert(res.data.message);
              this.$router.push("/business/clickreturn");
            }
          })
        }
      },
      //删除输入的密码值
      onDelete() {
        this.safe_password = this.safe_password.slice(0, this.safe_password.length - 1);
      },
    },
    watch:{
      numbers(){
        this.numbers_lgc = parseFloat(this.numbers*0.1426/7).toFixed(4);
      }
    }
  }

</script>
<style lang='scss' scoped>
  
  .exchange-wrap {
    background-color:#fff;
    height:100%;
    .header {
      text-align: center;
      position: relative;
      height: 66px;
      line-height:80px;
      font-size:36px;
      padding-top:20px;
      color:#011321;
      img {
        position: absolute;
        top: 50%;
        left: 36px;
      }
    }
    .wrap {
      width: 620px;
      height: 306px;
      background: rgba(15, 57, 75, 1);
      border-radius: 30px;
      margin: 50px auto;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 10px 36px;
      box-sizing: border-box;
      .dh {
        font-size: 36px;
      }

      .ye {
        font-size: 28px;
        color: rgba(255, 255, 255, .5);
      }

      .wrap-bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .box {
          width: 160px;
          height: 146px;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 10px 0;
          box-sizing: border-box;
          font-size:26px;
          img {
            width: 50px;
            height: 50px;
          }
        }

        .sjt {
          width: 52px;
        }

      }
    }
    .border_bottom{
      border-bottom:1px solid rgba(0, 0, 0, .1);
    }
    .input-wrap {
      width: 620px;
      
      margin: 0 auto;
      font-family: PingFangSC;
      font-weight: 400;
      margin-bottom: 44px;
      p {
        font-size: 28px;
        color: #000;
      }
      .input-box{
        display: flex;
        justify-content: space-between;
        font-size:36px;
        .input_style{
          background: transparent;
          color: #000;
          padding-bottom:10px;
          margin-top:10px;
        }
        .input_style::-webkit-input-placeholder{
          color:#011321;
          opacity: 0.3;
        }
      }
    }

    .btn {
      width: 620px;
      height: 84px;
      background: rgba(48, 208, 161, 1);
      border-radius: 24px;
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 78px;
      text-align: center;
      margin: 0 auto;
    }
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
      box-shadow: 0px 20px 40px #000;
      text-align: center;
      .close{
        width:40px;
        position: absolute;
        top:40px;
        left:50px;
      }
      span{
        color:#041b29;
        font-size:34px;
      }
      p{
        span:first-child{
          font-size:38px;
          font-weight: 600;
        }
        span:last-child{
          font-size:80px;
          color:#011321;
          font-weight: 600;
        }
      }
      .error{
        color:#f55c57;
        margin:15px 0;
      }
      .find_pwd{
        color:#32d1a2;
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
