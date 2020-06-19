<template>
  <div class="login">
    <div class="header">
      <img src="../assets/images/login.png" alt="">
    </div>
    <div>
      <div class="input">
        <img src="../assets/images/phone.png" alt="">
        <input class="input_style" type="text" placeholder="请输入手机号" v-model="account">
		  </div>
      <div class="input">
        <img src="../assets/images/mm.png" alt="">
        <input class="input_style" type="password" placeholder="请输入密码" v-model="login_pwd">
		  </div>
    </div>
    <div class="forget">
      <router-link to="/account/forgetPass">忘记密码 ?</router-link>
    </div>
    <a href="javascript:;" class="btn" @click="login">确认</a>
  </div>
</template>
<script>
// import {mapMutations} from "vuex";
import {mapState} from "vuex";
    export default {
      data(){
        return {
          account:"",
          login_pwd:""
        }
      },
      methods:{
        // ...mapMutations(['setislogin','']),
        login(){
          this.axios.post('/Login/login',{
            account: this.account,
            login_pwd: this.login_pwd
          }).then(res=>{
            console.log(res.data);
            let status = res.data.status;
            if(status == 400){
              this.$messagebox.alert(res.data.message,'登录失败')
            }else{
              localStorage.setItem("token", res.data.data);
              console.log('存储token')
              // console.log(res);
              this.$router.replace("/");
              // console.log(Base64.decode(res.data.data));
              // this.setislogin(true);
              // this.setData(Base64.decode(res.data.data));
              // console.log(this.data);
              // localStorage.setItem("token", Base64.decode(res.data.data));
              // console.log(localStorage.getItem("token"))
              // localStorage.setItem("islogin",true);
              // //  console.log(store.state.islogin)
              // // console.log(!localStorage.getItem("data"))
              // console.log(localStorage.getItem("data"))
              // console.log(localStorage.getItem("islogin"))
              // store.commit("setData",data);
              // store.commit("setislogin",true);
              // console.log(Base64.decode(res.data.data))
            }
          })
        }
      },
      computed:{
      ...mapState(["data"])
      }
    }
</script>

<style lang="scss" scoped>
  .login{
    padding:0 40px;
    overflow-y:hidden;
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
    
  .forget{
    font-weight: 500;
    font-size:26px;
    text-align: right;
    margin-top:30px;
    a{
      color:#30d0a1;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .btn {
      width:95%;
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
}

</style>
