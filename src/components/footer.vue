<template>
  <div class="footers">
    <footer>
      <router-link to='/' tag='div' :class="current==0?'green':'foot-item'">
        <img v-if='current==0' src="../assets/images/home_hover.png">
        <img v-else src="../assets/images/home.png">
        <p>首页</p>
      </router-link>
      <router-link to='/quotation' tag='div' :class="current==1?'green':'foot-item'">
        <img v-if='current==1' src="../assets/images/hq_hover.png">
        <img v-else src="../assets/images/hq.png">
        <p>行情</p>
      </router-link>
      <router-link to='/oct' tag='div' :class="current==2?'green':'foot-item'">
        <img v-if='current==2' src="../assets/images/otc_hover.png">
        <img v-else src="../assets/images/otc.png">
        <p>OTC</p>
      </router-link>
      <router-link tag='div' to='/account' :class="current==3?'green':'foot-item'">
        <img v-if='current==3' src="../assets/images/mine_hover.png">
        <img v-else src="../assets/images/mine.png">
        <p>我的</p>
      </router-link>
      <!--<template v-if='loginState'>
        <router-link tag='div' to='/account' class='foot-item'>
          <img v-if='current==3' src="../assets/images/mine_hover.png">
                    <img v-else src="../assets/images/mine.png">
          <p :class="current==3?'green':''">我的</p>
        </router-link>
      </template>
      <template v-else>
        <router-link tag='div' to='/login' class='foot-item'>
          <img v-if='current==3' src="../assets/images/icon_foot5_hover.png">
                    <img v-else src="../assets/images/icon_foot5.png"> 
          <p :class="current==3?'green':''">我的</p>
        </router-link>
      </template>-->
    </footer>
  </div>
</template>
<script>
  export default {
    props: ['loginState', 'current']
  };

</script>
<style lang="scss" scope>
  .footers {
    width: 100%;
    height: 124px;
    background: rgba(15, 57, 75, 1);
    border-radius: 45px 45px 0px 0px;
    position: fixed;
    bottom: 0;
    left: 0;

    footer {
      display: flex;
      justify-content: space-around;
      padding-top: 10px;
      box-sizing: border-box;
    }

    .foot-item {
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, .5);
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 36px;
        height: 36px;
        padding: 12px 0 8px 0;
      }

    }

    .green {
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, .5);
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #30D0A1;
      margin-top: -10px;

      img {
        width: 36px;
        height: 36px;
        padding: 12px 0 8px 0;
      }

    }

  }

</style>
