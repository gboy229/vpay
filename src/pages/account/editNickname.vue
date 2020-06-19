<!--  -->
<template>
  <div class='edit-nickname'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>设置昵称</span>
      <span class="header-item-right">保存</span>
    </header>
    <div class="input-wrap">
      <div class="input-box">
        <input type="text" placeholder="填写昵称">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    created() {

    },
    methods: {

    }
  }

</script>
<style lang='scss' scoped>
  .edit-nickname {
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
        font-size: 36px;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }

      .header-item-right {
        position: absolute;
        right: 36px;
      }
    }

    .input-wrap {
      width: 620px;
      border-bottom: 1px solid #30D0A1;
      margin: 0 auto;
      font-weight: 400;
      margin-bottom: 44px;

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

      }
    }

  }

</style>
