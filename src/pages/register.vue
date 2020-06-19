<template>
  <div class="reg">
    <div class="header">
      <img src="../assets/images/reg.png" alt="">
    </div>
    <div>
			<div class="input">
				<img src="../assets/images/reg_user.png" alt="">
				<input class="input_style" type="text" :value ="invit" readonly>
			</div>
      <div class="input">
        <img src="../assets/images/phone.png" alt="">
        <input class="input_style" type="text" placeholder="请输入手机号" v-model="mobile">
		  </div>
      <div class="input">
        <img src="../assets/images/mm.png" alt="">
        <input class="input_style" type="password" placeholder="请输入密码" v-model="login_pwd">
		  </div>
      <div class="input">
        <img src="../assets/images/cpwd.png" alt="">
        <input class="input_style" type="password" placeholder="请再次输入密码" v-model="relogin_pwd">
		  </div>
    </div>
    <!-- 滑动验证 -->
    <div class="yz">
      <van-slider v-model="value" @change="onChange" :disabled="disabled">
        <div slot="button">
          <img :src="src" alt="">
        </div>
      </van-slider>
      <p class="message">{{message}}</p>
    </div>
    <div class="flex_box" v-show="hide">
        <img src="../assets/images/yzm.png" alt="">
        <input type="text" placeholder="请输入验证码" v-model="code">
      <a href="javascript:;" class="btn btn2" @click="showYzm">{{yzm_text}}</a>
    </div>
    <a href="javascript:;" class="btn btn1" @click="register">确认</a>
    <div class="bottom_xy">
      <van-checkbox v-model="checked" shape="square" class="agreement">
        已阅读并同意LGC用户
        <router-link to="/agreement">注册协议</router-link>
      </van-checkbox>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        invit:"",  //推荐id
        mobile:"", //手机号码
        login_pwd:"", //登录密码
        relogin_pwd:"",  //再次输入密码
        code:"", //验证码
        hide:false,
        checked:"",
        yzm_text:"获取验证码",
        count:60,
        timer:null,
        value:6,
        disabled:false,
        src:require('../assets/images/yz_right.png'),
        message:"按住滑动到最右边",
        canClick:true,
      }
    },
    methods:{
      // 滑块验证获取验证码
      showYzm(){
        if (this.mobile === "") {
          this.$toast("请输入手机号");
          return ;
        }

        this.yzm_text = this.count + 's 后重新获取';
        this.axios.post("/Sms/sendRegMsg","mobile=" + this.mobile).then(res=>{
          console.log(res);
        })
        if(this.canClick){
          this.canClick = false;
          this.timer = setInterval(()=>{
          this.count--;
          this.yzm_text = this.count + 's 后重新获取'
          if(this.count <= 0){
            clearInterval(this.timer);
            this.yzm_text = "请重新获取";
            this.count = 60;
            this.canClick = true
          }
        },1000)
        }
      },
      onChange(){
        if(this.value >= 100){
          this.src = require('../assets/images/yz_suc.png')
          this.disabled = true;
          this.message = "验证通过"
          this.hide = true;
        }
      },
      //检测用户输入的规范
      register(){
        //检测手机号码的规范
        var mobileExp = /^1[3-9]\d{9}$/
        if(!mobileExp.test(this.mobile)){
          // this.$toast("手机号码格式不正确");
          this.$toast({
              message: '手机号码格式不正确',
              // position: 'bottom',
              duration: 50000
            });
          return;
      }
        //检测密码的规范
        var upwdExp = /^[a-zA-Z0-9_]{8,10}$/
        if(!upwdExp.test(this.login_pwd)){
          this.$toast("密码必须为字母、数字8-10位的组合");
          return;
        }
        //检测两次密码是否一致
        if(this.login_pwd !== this.relogin_pwd){
          this.$toast("两次密码不一致");
          return;
        }
        // 检验验证码是否输入
        if(!this.code){
          this.$toast("请获取验证码");
          return;
        }
        //验证复选框是否勾选
        if(!this.checked){
          this.$toast("请确认注册协议");
          return;
        }
        
        this.axios.post("/Login/register",{
          invit: this.invit,
          mobile: this.mobile,
          login_pwd: this.login_pwd,
          relogin_pwd: this.relogin_pwd,
          code: this.code
        }).then(res=>{
          let status = res.data.status;
          if(status === 400){
            this.$messagebox.alert(res.data.message)
          }else{
            // this.$messagebox.confirm(message,'注册信息',{
            //   confirmButtonText:'是',
            //   cancelButtonText:'否'
            // }).then(action=>{
            //   // this.$router.push("/login");
            // }).catch(err=>{
            //   this.$router.push("/")
            // })
            this.$messagebox.alert("注册成功");
          }
        })
      },
      beforeDestroy(){
        clearInterval(this.timer);
      }
    },
    mounted(){
      // 获取推荐码
      var query = window.location.search.substring(1);
      var id = query.substring(3);
      var str = window.location.hash;
      var arr = str.split("=");
      this.invit = arr[1];
    }
  }
</script>

<style lang="scss">
  .reg{
    .van-icon{
      border:1px solid #30d0a1 !important;
      border-radius:10px;
    }
    .van-checkbox__icon--checked .van-icon{
      background-color: #30d0a1 !important;
    }
    .van-checkbox__label{
      color:rgba(255,255,255,0.3) !important;
      font-size:16px;

      a{
        color:#30d0a1;
        text-decoration: underline;
      }
    }
    .yz{
       margin-top:50px;

      .message{
        color:#fff;
        position:relative;
        top:-70px;
        left:40%;
      }
      img{
        height:100px;
      }
      .van-slider{
        width:95% !important;
        height: auto;
        margin:0 20px 0 5px;
        border-radius:30px;
        background-color:#000;
      }
      .van-slider__bar{
        height:100px !important;
        background-color: #30d0a1;
      }
    }
    .mint-toast{
      background:rgba(48, 208, 161, 0.5) !important;
    }
  }
</style>

<style lang="scss" scoped>
.reg{
    overflow-x: hidden;
    padding:0 40px;
  .header{
    margin:250px 0 100px;
  }
  .input{
    padding-bottom:20px;
    border-bottom:1px solid #0a393b;
    .input_style{
      background: transparent;
      font-size:36px;
      color: #fff;
      padding-bottom:10px;
      margin-top:10px;
      margin-left:30px;
    }
    .input_style::-webkit-input-placeholder{
      // color:#011321;
      opacity: 0.7;
    }
  }
  .input+.input{
      margin-top:60px;
    }
  .flex_box{
    display:flex;
    justify-content: space-between;
    border-bottom:1px solid #0a393b;
    padding-bottom:20px;

    input{
        background: transparent;
        font-size:18px;
        color:rgba(255,255,255,0.3);
        width:40%;
        margin-right:60px;
    }
    input::-webkit-input-placeholder{
        color:rgba(255,255,255,0.3);
      }
    img{
        height:50px;
        margin-top:10px;
    }
    }
    .btn{
      display: block;
      background:#30d0a1;
      color:#fff;
      text-align:center;
      font-family: PingFangSC, sans-serif;
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
    .btn2{
      width:30%;
      height:70px;
      border-radius:40px;
      line-height: 70px;
      font-size:24px;
    }
    .bottom_xy{
      margin-bottom:20px;
    }
}

</style>
