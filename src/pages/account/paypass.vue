<!--  -->
<template>
  <div class='safe-wrap'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>交易密码</span>
    </header>

    <ul class="safe-ul">
      <router-link to='/account/editPayPass' tag='li'>
        <span>更改交易密码</span>
        <img src="../../assets/images/right.png" alt="">
      </router-link>
      <router-link to='/account/forgetPayPass' tag='li'>
        <span>找回交易密码</span>
        <img src="../../assets/images/right.png" alt="">
      </router-link>
    </ul>

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
  .safe-wrap {
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
        font-family: PingFangSC, sans-serif;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }
    }

    .safe-ul {
      border-top: 1px solid #16575C;
      border-bottom: 1px solid #16575C;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      li {
        width: 686px;
        height: 84px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        font-family: PingFangSC, sans-serif;
        font-weight: 400;
        color: rgba(48, 208, 161, 1);

        img {
          width: 12px;
          height: 20px;
          padding-right: 36px;
        }
      }

      li:nth-of-type(1) {
        border-bottom: 1px solid #16575C;
      }
    }
  }

</style>
