<!--  -->
<template>
  <div class='edit-pass'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
    </header>
    <img src="../../assets/images/zhjymm.png" alt="" class="tit">
    <div class="input-wrap">
      <p>手机号</p>
      <div class="input-box">
        <input type="number" placeholder="请输入手机号或邮箱">
      </div>
    </div>
    <div class="input-wrap">
      <p>验证码</p>
      <div class="input-box">
        <input type="number" placeholder="请输入验证码">
      </div>
      <div :class="canClick?'yzm-btn':'ayzm-btn'" @click="countDown">{{content}}</div>
    </div>
    <div class="input-wrap">
      <p>密码</p>
      <div class="input-box">
        <input type="number" placeholder="请输入密码">
      </div>
    </div>
    <div class="input-wrap">
      <p>确认密码</p>
      <div class="input-box">
        <input type="number" placeholder="请再次输入密码">
      </div>
    </div>

    <div class="btn">保存</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '发送验证码',
        totalTime: 60,
        timer: '',
        href: '',
        canClick: true //添加canClick
      }
    },
    created() {

    },
    methods: {
      countDown() {
        if (!this.canClick) return
        this.showImg = true
        this.canClick = false
        this.content = this.totalTime + 's后重发'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重发'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送'
            this.totalTime = 60
            this.canClick = true //这里重新开启
          }
        }, 1000)
      },
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
    }

    .tit {
      width: 296px;
      height: 42px;
      margin: 0 0 60px 60px;
    }

    .input-wrap {
      width: 620px;
      border-bottom: 1px solid #30D0A1;
      margin: 0 auto;
      font-weight: 400;
      margin-bottom: 44px;
      position: relative;

      p {
        font-size: 24px;
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

        span {
          font-size: 26px;
          color: rgba(255, 255, 255, 1);
        }
      }

      .yzm-btn {
        width: 180px;
        height: 60px;
        background: rgba(48, 208, 161, 1);
        border-radius: 30px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 60px;
        position: absolute;
        bottom: 12px;
        right: 0;
      }

      .ayzm-btn {
        width: 180px;
        height: 60px;
        background: rgba(255, 255, 255, .2);
        border-radius: 30px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 60px;
        position: absolute;
        bottom: 12px;
        right: 0;
      }

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
      margin: 80px auto;
    }

  }

</style>
