<!--  -->
<template>
  <div class='edit-pass'>
    <header>
      <img src="../../assets/images/back.png" alt="" @click="$router.go(-1)">
      <span>实名认证</span>

    </header>

    <div class="input-wrap">
      <p>真实姓名</p>
      <div class="input-box">
        <input type="text" placeholder="请填写本人的真实姓名">
      </div>
    </div>
    <div class="input-wrap">
      <p>性别</p>
      <div class="input-box">
        <input type="text" placeholder="请选择性别">
        <img src="../../assets/images/right.png" alt="">
      </div>
    </div>
    <div class="input-wrap">
      <p>国籍（区域）</p>
      <div class="input-box">
        <input type="text" placeholder="请选择国籍">
        <img src="../../assets/images/right.png" alt="">
      </div>
    </div>
    <div class="input-wrap">
      <p>证件类型</p>
      <div class="input-box">
        <input type="text" placeholder="请选择证件类型">
        <img src="../../assets/images/right.png" alt="">
      </div>
    </div>
    <div class="input-wrap">
      <p>身份证号</p>
      <div class="input-box">
        <input type="number" placeholder="请填写本人身份证号">
      </div>
    </div>
    <div class="input-wrap">
      <p>证件有效期</p>
      <div class="input-box">
        <input type="number" placeholder="证件有效期">
                <img src="../../assets/images/right.png" alt="">
      </div>
    </div>

    <div class="btn">提交</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }

</script>
<style lang='scss' scoped>
  .edit-pass {
    font-family: PingFangSC;

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
        font-size: 30px;
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
      position: relative;

      p {
        font-size: 24px;
        color: rgba(48, 208, 161, 1);
      }

      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 26px 0;

        img {
          width: 12px;
          height: 20px;
        }

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
      margin: 80px auto;
    }

  }

</style>
