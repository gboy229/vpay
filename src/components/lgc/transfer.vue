<template>
	<div class="extractCurrency">
		<div>
			<p>余额 LGC</p>
			<P>{{lgc_num}}</P>
		</div>
		<div class="tiqu">
			<p class="small_title">地址</p>
			<input class="input_style input_style1 input_style_width" type="text" placeholder="请输入钱包地址" v-model="payee_id">
		</div>
		<div class="tiqu">
			<p class="small_title">数量</p>
			<div class="flex_box">
				<input class="input_style input_style1" type="text" placeholder="请输入数量" v-model="amount">
				<a href="javascript:;" class="btn btn3">全部转出</a>
			</div>
		</div>
		<div class="tiqu">
			<p class="small_title">服务费</p>
			<div class="flex_box">
				<span>0</span>
				<span>LGC</span>
			</div>
		</div>
		<a href="javascript:;" class="btn btn1" @click="showPopup">确认转出</a>
    <div class="popup" v-show="show">
      <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
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
import {mapState} from "vuex";
export default {
  data(){
    return {
      show:false,
      showKeyboard: true,
      errorInfo: '',
      count:0,
      show_shade:false,
      payee_id:"", //收款人ID
      amount:"",  //转出金额
      safe_password:"" //	操作密码
    }
  },
  methods:{
    showPopup(){
      if(!this.payee_id){
        this.$messagebox.alert("钱包地址不能为空");
      }else if(!this.amount){
        this.$messagebox.alert("转出金额不能为空")
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
        this.axios.post("/Currency/transferOut",
          {
            address: this.payee_id,
            amount: this.amount,
            safe_password: this.safe_password,
            type: 1,
            token: localStorage.getItem('token')
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
     }
    },
    computed:{
      ...mapState(["lgc_num"])
    }
  }
</script>
<style lang="scss" scoped>
.extractCurrency{
	div:first-child{
        p:first-child{
          color:rgba(255,255,255,0.3);
        }
        p:nth-child(2){
          color:#fff;
          font-size:60px;
        }
      }
	.tiqu{
      text-align: left !important;
      margin:0 30px;
      border-bottom:1px solid #0a393b;
    }
    .tiqu+.tiqu{
      margin-top:20px;
		}
		.small_title{
      font-size:26px;
      color:#32d1a2;
      padding-bottom:20px;
    }
    .flex_box{
      display: flex;
      justify-content: space-between;
      padding-bottom:10px;
      span{
        color:rgba(255,255,255,0.8);
        font-size:32px;
      }
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
    .btn{
      display: block;
      background:#30d0a1;
      color:#fff;
      text-align:center;
      font-family: PingFangSC;
    }
    .btn1{
      width:95%;
      height:100px;
      border-radius:15px;
      line-height: 100px;
      color:#fff;
      font-size:35px;
      margin:100px 30px 50px auto;
		}
		.btn3{
      width:30%;
      height:70px;
      line-height:70px;
      border-radius:50px;
      font-size:28px;
  }
  .input_style_width{
     width:100%;
  }
  .input_style{
    background: transparent;
    margin-left:35px;
    color:#fff;
    font-size:36px;
  }
  .input_style::-webkit-input-placeholder{
    opacity: 0.7;
  }
  .input_style1{
    margin-left:0;
    padding-bottom:20px;  
  }
}
</style>
<style lang="scss">
.mint-msgbox-wrapper{
  z-index:2012 !important;
}
</style>