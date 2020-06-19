<!--  -->
<template>
  <div class='edit-pass'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>修改登录密码</span>
    </header>
    <div class="input-wrap">
      <p>原密码</p>
      <div class="input-box">
        <input type="password" placeholder="请输入原始密码" v-model="oldPassword">
      </div>
    </div>
    <div class="input-wrap">
      <p>新密码</p>
      <div class="input-box">
        <input type="password" placeholder="请我输入新密码" v-model="newPassword">
      </div>
    </div>
    <div class="input-wrap">
      <p>确认密码</p>
      <div class="input-box">
        <input type="password" placeholder="请确认新密码" v-model="reNewPassword">
      </div>
    </div>

    <!--<router-link to='/account/forgetPass' tag='p' class="forget-btn">忘记密码？</router-link>-->

    <div class="btn" @click="edit">保存</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
      }
    },
    created() {

    },
    methods: {
      edit() {
        let _self = this;

        this.axios.post('/User/updatePassword', {
          type: 1,
          old_password: this.oldPassword,
          password: this.newPassword,
          relpassword: this.reNewPassword,
          token: localStorage.getItem('token'),
        }).then(function (response) {
          var _status = response.data.status;
          var _msg = response.data.message;
          if (_status === 200) {
            _self.$messagebox.alert(_msg).then(action=> {
              _self.$router.go(-1);
            });
          } else if (_status === 400) {
            _self.$messagebox.alert(_msg);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }

</script>
<style lang='scss' scoped>
  .edit-pass {
    font-family: PingFangSC, sans-serif;

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
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }
    }

    .input-wrap {
      width: 620px;
      border-bottom: 1px solid #30D0A1;
      margin: 0 auto;
      font-weight: 400;
      margin-bottom: 44px;

      p {
        font-size: 26px;
        color: rgba(48, 208, 161, 1);
      }

      .input-box {
        display: flex;
        justify-content: flex-start;
        padding: 26px 0;

        input {
          font-size: 36px;
          background-color: #011321;
          caret-color: rgba(48, 208, 161, 1);
          color: #fff;
        }

        input::-webkit-input-placeholder {
          font-weight: 400;
          color: rgba(255, 255, 255, .3);
        }

        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
          background-color: rgb(0, 255, 189) !important;
          background-image: none !important;
          color: rgb(0, 0, 0) !important;
        }

        span {
          font-size: 26px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .forget-btn {
      font-size: 22px;
      font-weight: 500;
      text-decoration: underline;
      color: #30d0a1;
      position: relative;
      left: 580px;
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
      margin: 70px auto;
    }

  }

</style>
