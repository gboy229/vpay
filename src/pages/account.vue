<!--  -->
<template>
  <div class='mine-wrap'>
    <div class="warp-item">
      <div class="info">
        <div class="top">
          <img :src="img_head" alt="">
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="bottom">
          <div class="box1 mg">ID:{{ userInfo.mobile }}</div>
          <div class="box2 mg">{{ userInfo.vip_grade_name }}</div>
          <div class="box3 mg">L{{ userInfo.market_grade }}</div>
        </div>
        <router-link to="/account/userDetails" tag="div" class="edit">
          <span>编辑</span>
        </router-link>
      </div>
    </div>

    <div class="wrap">
      <router-link to='/account/authentication' tag='div' class='wrap-item'>
        <img src="../assets/images/msm.png">
        <p>实名认证</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mdd.png">
        <p>工作室申请</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mxx.png">
        <p>消息中心</p>
        <span class="ev-badge"></span>
      </router-link>
      <router-link to='/account/invitation' tag='div' class='wrap-item'>
        <img src="../assets/images/mfx.png">
        <p>分享链接</p>
      </router-link>
      <router-link to='/account/profit' tag='div' class='wrap-item'>
        <img src="../assets/images/msy.png">
        <p>分享收益</p>
      </router-link>
      <router-link to='/account/team' tag='div' class='wrap-item'>
        <img src="../assets/images/mtd.png">
        <p>我的团队</p>
      </router-link>
      <router-link to='/account/safe' tag='div' class='wrap-item'>
        <img src="../assets/images/maq.png">
        <p>安全设置</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mlx.png">
        <p>联系客服</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mllq.png">
        <p>区块浏览器</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mkf.png">
        <p>开发者部落</p>
      </router-link>
      <router-link to='/develop' tag='div' class='wrap-item'>
        <img src="../assets/images/mky.png">
        <p>开源地址</p>
      </router-link>
      <div class='wrap-item' @click="logout">
        <img src="../assets/images/mtc.png">
        <p>退出登录</p>
      </div>
      <!--<router-link to='/pages/login' tag='div' class='wrap-item' @click="logout">-->
      <!--</router-link>-->
    </div>
    <mine-footer current='3'></mine-footer>
  </div>
  <!-- <div class="popup" v-else >
      <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
      <span>请设置交易密码</span>
      <router-link to="/account/forgetPayPass" tag="p" class="find_pwd">点击设置交易密码</router-link>
    </div> -->
</template>

<script>
  import mineFooter from '@/components/footer'
  import {mapState} from "vuex";
  export default {
    data() {
      return {
        userInfo: []
      }
    },
    components: {
      mineFooter
    },
    created() {
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        this.axios.post('/User/index', {
          token: localStorage.getItem('token'),
        }).then(res=> {
          let _status = res.data.status;
          let _msg = res.data.message;
          if (_status === 200) {
            this.userInfo = res.data.data;
            localStorage.setItem('img_head', res.data.data.img_head);
            localStorage.setItem('userInfo', JSON.stringify(res.data.data));
            console.log(res.data.data);
          } else {
            console.log(_msg);
          }

        }).catch(error=> {
          console.log(error);
        })
      },
      logout() {
        this.axios.post('/Login/loginOut', {
          token: localStorage.getItem('token'),
        }).then(res=> {
          let _status = res.data.status;
          let _msg = res.data.message;
          console.log(_status);
          if (_status === 200) {
            localStorage.removeItem('userInfo');
            this.$router.push('/login');
          } else {
            this.$messagebox.alert(_msg);
          }

        }).catch(error=> {
          console.log(error);
        })
      }
    },
    computed:{
      ...mapState(["img_head"])
    }
  }

</script>
<style lang='scss' scoped>
  .mine-wrap {
    overflow-y:hidden;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

    .info {
      width: 95%;
      height: 240px;
      background: #0F394B;
      box-shadow: 0 15px 36px 0 rgba(1, 19, 33, 0.1);
      border-radius: 30px;
      margin: 120px auto 0;
      padding: 36px;
      box-sizing: border-box;
      position: relative;

      .top {
        display: flex;
        align-items: center;

        img {
          width: 84px;
          height: 84px;
          border-radius: 50%;
        }

        span {
          font-weight: 500;
          font-size: 45px;
          padding-left: 30px;
        }
      }

      .bottom {
        display: flex;

        .mg {
          margin: 14px 10px 0 0;
          font-size: 26px;
          line-height: 30px;
          text-align: center;
        }

        .box1 {
          /*width: 138px;*/
          height: 30px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, .2);
          border-radius: 15px;
          color: rgba(255, 255, 255, 1);
        }

        .box2 {
          /*width: 120px;*/
          height: 30px;
          padding: 6px 10px;
          background: rgba(48, 208, 161, .2);
          border-radius: 15px;
          color: rgba(48, 208, 161, 1);
        }

        .box3 {
          /*width: 45px;*/
          width:13%;
          height: 40px;
          line-height:40px;
          // padding: 6px 10px;
          background: rgba(255, 214, 48, 0.2);
          border-radius: 15px;
          font-family: AliHYAiHei, sans-serif;
          font-style: italic;
          color: rgba(255, 214, 48, 1);
          text-align: center;
        }
      }

      .edit {
        width: 112px;
        height: 60px;
        background: rgba(48, 208, 161, .2);
        border-radius: 30px;
        font-size: 26px;
        font-weight: 500;
        font-family: PingFangSC, sans-serif;
        color: rgba(48, 208, 161, 1);
        line-height: 60px;
        text-align: center;
        position: absolute;
        right: 36px;
        bottom: 54px;
      }
    }

    .wrap {
      width: 95%;
      height: 732px;
      background: #0F394B;
      box-shadow: 0 15px 36px 0 rgba(1, 19, 33, 0.1);
      border-radius: 30px;
      margin: 40px auto 160px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .wrap-item {
        position: relative;
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-right: 1px solid #011321;
        border-top: 1px solid #011321;

        img {
          width: 50px;
          height: 50px;
        }

        p {
          font-size: 24px;
          font-family: PingFangSC, sans-serif;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding-top: 18px;
        }

        .ev-badge {
          position: absolute;
          top: 26px;
          right: 26px;
          box-sizing: border-box;
          width: 22px;
          min-width: 0;
          height: 22px;
          padding: 0 3px;
          color: #fff;
          font-weight: 500;
          font-size: 12px;
          font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
          line-height: 14px;
          text-align: center;
          background-color: #f55c57;
          border-radius: 100%;
          /*-webkit-transform: translate(50%, -50%);
          transform: translate(50%, -50%);
          -webkit-transform-origin: 100%;
          transform-origin: 100%;*/
        }
      }

      .wrap-item:nth-of-type(3),
      .wrap-item:nth-of-type(6),
      .wrap-item:nth-of-type(9),
      .wrap-item:nth-of-type(12) {
        border-right: 0;
      }

      .wrap-item:nth-of-type(1),
      .wrap-item:nth-of-type(2),
      .wrap-item:nth-of-type(3) {
        border-top: 0;
      }
    }
  }

</style>
