<!--  -->
<template>
  <div class=''>
    <ul class="oct-list">
      <li>
        <div class="li-left">
          <div class="li-top">
            <img src="../assets/images/lgc.png" alt="">
            <span>白日梦想家</span>
          </div>
          <p>数量: 20.8452 LGC</p>
          <p>限额: 0.000~20.4343 CMY</p>
        </div>
        <div class="li-right">
          <div class="right-top">
            ￥0.2587
          </div>
          <div class="right-bottom">
            <span>出售</span>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <div class="li-top">
            <img src="../assets/images/lgc.png" alt="">
            <span>白日梦想家</span>
          </div>
          <p>数量: 20.8452 LGC</p>
          <p>限额: 0.000~20.4343 CMY</p>
        </div>
        <div class="li-right">
          <div class="right-top">
            ￥0.2587
          </div>
          <div class="right-bottom">
            <span>出售</span>
          </div>
        </div>
      </li>
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
  .oct-list {
    width: 620px;
    margin: 0 auto;
    margin-top: 40px;

    li {
      display: flex;
      height: 240px;
      background: rgba(15, 57, 75, 1);
      border-radius: 30px;
      margin-bottom: 30px;

      .li-left {
        width: 60%;
        font-family: PingFangSC;
        font-weight: 500;
        padding: 36px;

        .li-top {
          display: flex;
          align-items: center;
          padding-bottom: 6px;

          img {
            width: 60px;
            height: 60px;
          }

          span {
            font-size: 30px;
            color: rgba(255, 255, 255, 1);
            padding-left: 20px;
          }
        }

        p {
          font-size: 18px;
          color: rgba(255, 255, 255, .5);
          line-height: 44px;
        }
      }

      .li-right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 40%;

        .right-top {
          background: rgba(255, 214, 48, .2);
          border-radius: 0px 30px 0px 0px;
          height: 50%;
          font-size: 30px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(240, 212, 78, 1);
          text-align: center;
          line-height: 120px;
        }

        .right-bottom {
          background: rgba(48, 208, 161, .2);
          border-radius: 0px 0px 30px 0px;
          height: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            display: block;
            width: 120px;
            height: 60px;
            background: rgba(48, 208, 161, 1);
            border-radius: 30px;
            font-size: 28px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 60px;
          }
        }
      }

    }
  }

</style>
