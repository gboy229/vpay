<!--  -->
<template>
  <div class='invitation-wrap' id="faultTree" ref="faultTree">
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>分享链接</span>
    </header>

    <div class="wrap">
      <p class="tit">邀请码</p>
      <p class="num">{{ info.invit }}</p>
      <img :src="info.qrCode" alt="" class="qr">
    </div>

    <div class="link-btn">
      <p id="bar">http://vpay.huziru.com/#/register/?invit={{ info.invit }}</p>
      <div class="btn" data-clipboard-target="#bar" @click="copy">复制链接</div>
    </div>

  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  import { Notify } from 'vant';
  export default {
    data() {
      return {
        info: [],
      }
    },
    created() {

    },
    mounted() {
      this.getInfo();
    },
    methods: {
      // 复制链接
      copy() {
        var clipboard = new Clipboard('.btn')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy();
          // this.$toast("复制成功")
          Notify({
            message: '复制成功',
            color: '#000',
            background: "#fff",
            duration: 2000
          });
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },

      // 获取分享二维码信息
      getInfo() {
        this.axios.post('/User/userQrCode', {
          token: localStorage.getItem('token'),
        }).then(res=> {
          let _status = res.data.status;
          let _msg = res.data.message;
          if (_status === 200) {
            this.info = res.data.data;
          } else {
            console.log(_msg);
          }

        }).catch(error=> {
          console.log(error);
        })
      }
    }
  }

</script>

<style lang='scss' scoped>
  .invitation-wrap {
    width: 100%;
    height: 100%;
    background: url('../../assets/images/qrbj.png') no-repeat;
    background-size: cover;
    font-family: PingFangSC, sans-serif;

    header {
      text-align: center;
      position: relative;
      height: 66px;
      padding-top: 66px;

      img {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }

      span {
        font-size: 36px;
        font-family: PingFangSC, sans-serif;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }
    }

    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;

      .tit {
        font-size: 30px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        padding: 152px 0 16px 0;
      }

      .num {
        font-size: 45px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      .qr {
        width: 250px;
        height: 250px;
        border: 12px solid rgba(255, 255, 255, .2);
        margin-top: 18px;
      }
    }

    .link-btn {
      width: 480px;
      height: 74px;
      background: rgba(48, 208, 161, 0.5);
      margin: 42px auto;
      border-radius: 24px;
      border: 3px solid rgba(29, 186, 140, 1);
      box-shadow: -4px 15px 10px 0px rgba(15, 57, 75, 0.1);
      display: flex;
      justify-content: space-between;
      text-align: center;
      line-height: 74px;
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      padding-left:20px;
      p {
        width: 70%;
      }

      .btn {
        width: 30%;
        background: rgba(48, 208, 161, 1);
        border: 3px solid rgba(48, 208, 161, 1);
        border-radius: 0 21px 21px 0;
      }
    }
  }

</style>
