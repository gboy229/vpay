<template>
  <div class="index-wrap">
    <!-- <img class="bg" src="../assets/images/bg.png" alt=""> -->
    <!-- <div class="bg">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="img"/>
        </van-swipe-item>
      </van-swipe>
    </div> -->
      <!-- <video v-show="false" src="../assets/images/start.mp4" autoplay class="test" muted  width="100%"></video> -->
    <div>
      <van-swipe :autoplay="8000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" class="img"/>
          </van-swipe-item>
        </van-swipe>
      <div class="wrap">
        <router-link to='/lgc' tag='div' class="box">
          <div class="top">
            <img class="logo" src="../assets/images/lgc.png" alt="">
            <span>LGC</span>
          </div>
          <p>{{parseInt(lgc_num).toFixed(4)}}</p>
        </router-link>
        <!-- <router-link to="/index/scan" tag="div" class="box1">
          <img class="qr" src="../assets/images/sm.png" alt="" >
        </router-link> -->
        <img class="qr" src="../assets/images/sm.gif" alt="" @click="scan">
        <router-link to='/usdt' tag='div' class="box">
          <div class="top">
            <img class="logo" src="../assets/images/usdt.png" alt="">
            <span>USDT</span>
          </div>
          <p>{{parseInt(usdt_num).toFixed(4)}}</p>
        </router-link>
      </div>

      <div class="wrap2">
        <router-link to='/exchange' tag='div' class='wrap2-item'>
          <img src="../assets/images/dh.png">
          <p>兑换</p>
        </router-link>
        <router-link to='/assets' tag='div' class='wrap2-item'>
          <img src="../assets/images/zcb.png">
          <p>购买资产包</p>
        </router-link>
        <router-link to='/develop' tag='div' class='wrap2-item'>
          <img src="../assets/images/ly.png">
          <p>LGC旅游</p>
        </router-link>
        <router-link to='/develop' tag='div' class='wrap2-item'>
          <img src="../assets/images/sc.png">
          <p>LGC商城</p>
        </router-link>
        <router-link to='/business/rechargePhone' tag='div' class='wrap2-item'>
          <img src="../assets/images/hf.png">
          <p>话费充值</p>
        </router-link>
        <router-link to='/business/rechargeoil' tag='div' class='wrap2-item'>
          <img src="../assets/images/yk.png">
          <p>油卡充值</p>
        </router-link>
        <router-link to='/business/rechargeflow' tag='div' class='wrap2-item'>
          <img src="../assets/images/ll.png">
          <p>5G流量</p>
        </router-link>
        <router-link to='/develop' tag='div' class='wrap2-item'>
          <img src="../assets/images/jc.png">
          <p>LGC叫车</p>
        </router-link>
      </div>

      <ul class="ul-wrap">
        <router-link to='/lgc' tag='li'>
          <div class="li-left">
            <img src="../assets/images/lgc.png" alt="">
            <div class="word">
              <span>LGC</span>
              <p>{{parseInt(lgc_num).toFixed(4)}} LGC</p>
            </div>
          </div>
          <div class="li-right">
            <p>=￥{{parseInt(lgc_cny).toFixed(4)}} CNY</p>
            <p>≈ ${{parseInt(lgc_num).toFixed(4)}} USD</p>
          </div>
        </router-link>
        <router-link to='/usdt' tag='li'>
          <div class="li-left">
            <img src="../assets/images/usdt.png" alt="">
            <div class="word">
              <span>USDT</span>
              <p>{{parseInt(usdt_num).toFixed(4)}} USDT</p>
            </div>
          </div>
          <div class="li-right">
            <p>=￥{{parseInt(usdt_cny).toFixed(4)}} CNY</p>
            <p>≈ ${{parseInt(usdt_num).toFixed(4)}} USD</p>
          </div>
        </router-link>

      </ul>
    </div>
    <index-footer current='0'></index-footer>
  </div>
</template>

<script>
  import indexFooter from '@/components/footer'
  import {mapMutations} from "vuex";
  export default {
    data() {
      return {
         images: [
          require("../assets/images/banner3.gif"),
          require("../assets/images/banner1.gif"),
          require("../assets/images/banner2.gif")
        ],
        lgc_cny:"",
        lgc_num:"",
        usdt_cny:"",
        usdt_num:""
      }
    },
    components: {
      indexFooter
    },
    mounted(){
      this.axios.post("/Index/index",{
        token:localStorage.getItem("token")
      }).then(res=>{
        let lgc_cny = res.data.data.store.lgc.cny;
        let lgc_num = res.data.data.store.lgc.num;
        let usdt_cny = res.data.data.store.usdt.cny;
        let usdt_num = res.data.data.store.usdt.num;
        let userid = res.data.data.userInfo.mobile;
        let username = res.data.data.userInfo.username;
        let img_head = res.data.data.userInfo.img_head || require("../assets/images/user.png");
        this.lgc_cny = lgc_cny;
        this.lgc_num= lgc_num;
        this.usdt_cny = usdt_cny;
        this.usdt_num = usdt_num;
        this.setInfo({
          lgc_cny,
          lgc_num,
          usdt_cny,
          usdt_num,
          userid,
          username,
          img_head
        })
        ////存储到本地
        localStorage.setItem("lgc_cny",lgc_cny);
        localStorage.setItem("lgc_num",lgc_num);
        localStorage.setItem("usdt_cny",usdt_cny);
        localStorage.setItem("usdt_num",usdt_num);
        localStorage.setItem("username",username);
        localStorage.setItem("img_head",img_head);
        localStorage.setItem("userid",userid);
      })
    },
    methods:{
      ...mapMutations(['setInfo']),
      scan: function() {
         /* // 测试用例
         this.$router.push({
          name: 'codepay',
          params: {
            scanType: 0,
            address: 'https://qr.alipay.com/fkx00106950cs8rjj63uta5?t=1592379392865',
          }
        }); */
        
        // appcan 调取扫码功能
        uexScanner.open(this.callback);
      },

      // appcan 扫码回调
      callback(error,data) {
        const that = this;

        if(!error){
          var _pattAlipay = /^https:\/\/qr.alipay.com\/fkx/;
          var _pattEth = /^(0x)?[0-9a-fA-F]{40}$/;

          if (_pattAlipay.test(data['code'])) {
            // 支付宝扫码收款
            // alert('支付宝验证通过');
            that.$router.push({
              name: 'codepay',
              params: {
                scanType: 1,
                address: data['code'],
              }
            });

          } else if (_pattEth.test(data['code'])) {
            // USDT 扫码提现
            // alert('ETH 钱包验证通过');
            that.$router.push({
              name: 'codepay',
              params: {
                scanType: 2,
                address: data['code'],
              }
            });

            // alert("data:" + JSON.stringify(data));
          } else {
            alert('请扫正确的二维码');
          }

        }else{
            alert("failed!");
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .index-wrap {
    width: 100%;
    height: 100%;
    .test{
      overflow-y: hidden;
    }

      .img{
        width:100%;
        height:470px;
      }


    .wrap {
      width: 620px;
      height: 188px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 15px 36px 0px rgba(1, 19, 33, 0.1);
      border-radius: 30px;
      position: absolute;
      top: 390px;
      left: 50%;
      margin-left: -310px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      
      .box {
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(1, 19, 33, 1);
        text-align:center;
        .top {
          display: flex;
          align-items: center;

          .logo {
            width: 50px;
            height: 50px;
          }

          span {
            font-size: 28px;
            padding-left: 15px;
          }
        }

        p {
          font-size: 34px;
          line-height: 60px;
        }
      }

      .qr {
        width: 84px;
        height: 84px;
        
      }
      .box1{
        margin-top:-10px;
        margin-left:-70px;
      }
    }
    .wrap2 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 36px 36px 0 36px;
      box-sizing: border-box;
      margin-top: 100px;

      .wrap2-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 46px;
        flex:25%;
        img {
          width: 84px;
          height: 84px;
          padding-bottom: 22px;
        }

      }
    }

    .ul-wrap {
      width: 620px;
      margin: 0 auto;
      margin-bottom: 164px;
      
      li {
        width: 100%;
        // height: 144px;
        background: rgba(15, 57, 75, 1);
        border-radius: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px;
        box-sizing: border-box;
        margin-bottom: 30px;

        .li-left {
          display: flex;
          width: 50%;

          img {
            width: 74px;
            height: 74px;
          }

          .word {
            font-family: PingFangSC;
            padding-left: 30px;
            overflow: hidden;

            span {
              font-size: 36px;
              font-weight: 500;
              color: rgba(48, 208, 161, 1);
            }

            p {
              font-size: 26px;
              font-weight: 400;
              color: rgba(255, 255, 255, .5);
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }

        .li-right {
          font-size: 26px;
          font-weight: 400;
          color: rgba(48, 208, 161, 1);
          line-height: 48px;
          text-align:right;
        }
      }
    }
  }

</style>
