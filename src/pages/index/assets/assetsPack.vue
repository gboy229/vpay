<template>
  <div class="supremacy">
    <div class="header_box">
      <div class="header">
        <img src="../../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
        <span>资产包{{info.name}}</span>
      </div>
      <p>{{info.quota}}</p>
      <p>可用USDT</p>
    </div>
    <div class="supremacy_info">
      <p>
        <span>资产包{{info.name}} {{info.lever}}倍出局，日收益</span>
        <span>{{info.release_rate}}%</span>
      </p>
      <input type="text" placeholder="请输入数量" class="input_style" v-model="amount">
      <p>限额：{{info.min_num}}~{{info.max_num}}</p>
    </div>
    <a href="javascript:;" class="btn" @click="showPopup">预约 / 开通</a>
    <div class="popup" v-show="show">
      <img src="../../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
      <span>请输入交易密码</span>
      <p>
        <span>¥</span>
        <span>{{amount}}</span>
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
  data(){
    return {
      info:{},
      show:false, // 密码框
      showKeyboard: true,//密码框对焦
      errorInfo: '',
      count:0,
      amount:"",
      safe_password:"", //安全密码
      show_shade:false, //遮罩层
      id:""
    }
  },
  mounted(){
     this.id = this.$route.params.id;
      this.axios.post("/Currency/assetsList",{
      tags:1,
      type:2,
      token:localStorage.getItem("token")
    }).then(res=>{
      this.info = res.data.data.list[this.id-1];
      console.log(this.info);
    })
  },
  methods:{
    showPopup(){
      if(!this.amount){
        this.$messagebox.alert("转出的数量不能为空")
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
        this.axios.post("/Currency/buyAssets",{
            id:this.id,
            amount: this.amount,
            safe_password: this.safe_password,
            token:localStorage.getItem("token")
          }).then(res=>{
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
            // this.$router.push("/");
            // console.log(res.data);
            this.safe_password = "";
            console.log("成功");
            this.$router.push("/");
          }else{
            this.safe_password = "";
            this.show = false;
            this.showKeyboard = false;
            this.show_shade = true;
            this.$messagebox.alert(res.data.message);
             
          }
        })
      }
    },
    //删除输入的密码值
    onDelete() {
      this.safe_password = this.safe_password.slice(0, this.safe_password.length - 1);
     }
  }
}
</script>
<style lang="scss" scoped>
  .supremacy{
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
    .supremacy_info{
      margin-top:50px;
      padding:0 36px;
      p>span{
        font-size:30px;
      }
      p>span:first-child{
        color:rgba(255,255,255,0.8);
      }
      p>span:last-child{
        color:#30D0A1;
      }
      .input_style{
        width:100%;
        background: transparent;
        font-size:36px;
        color:#fff;
        margin-top:30px;
        padding-bottom:20px;
        border-bottom:3px solid rgba(255,255,255,0.1);
      }
      .input_style::-webkit-input-placeholder{
        color:rgba(255,255,255,0.3);
      }
      p:last-child{
        color:rgba(255,255,255,0.3);
        font-size:28px;
        text-align:right;
        margin-top:30px;
      }
    }
    .btn {
      width:90%;
      display: block;
      background:#30d0a1;
      color:#fff;
      text-align:center;
      border-radius:15px;
      line-height: 100px;
      color:#fff;
      font-size:35px;
      margin:100px auto 50px auto;
      font-family: PingFangSC;
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
      text-align: center;
      box-shadow: 0px 20px 40px #000;
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
