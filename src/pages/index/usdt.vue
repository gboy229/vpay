<template>
  <div class="usdt">
    <div class="header">
      <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      <span>USDT</span>
    </div>
    <div class="lgc_header">
      <p>
        <img src="../../assets/images/usdt.png">
        <span>USDT</span>
      </p>
      <p>{{usdt_num}}</p>
      <p>≈{{usdt_cny}} CNY</p>
      <div>
        <span id="bar">{{address}}</span>
        <img src="../../assets/images/copy.png" data-clipboard-target="#bar" @click="copy" class="img">
      </div>
    </div>
    <ul class="lgc_list">
      <li v-for="(item,index) of info1" :key="index">
        <a href="javascript:void(0);" @click="showPopup(index, $event)">
          <img :src="item.icon">
          <p class="light_color">{{item.message}}</p>
        </a>
      </li>
    </ul>
    <van-popup
      v-model="show1"
      closeable
      close-icon-position="top-left"
      round
      position="bottom"
      :close-on-click-overlay="false"
      :style="{ backgroundColor: '#011321', height: '65%', textAlign: 'center', padding: '40px 0' }"
      class="popup"
    >
      <div class="popup_list">
        <img class="via" :src="img_head" alt="">
        <p class="id">ID:{{userid}}</p>
        <!-- 充值 -->
        <div v-if="index===0">
          <recharge :address="address" :qrCode="qrCode"></recharge>
        </div>
        <!-- 提币 -->
        <div v-else-if="index===1">
          <extractCurrency></extractCurrency>
        </div>
        <!-- 转账 -->
        <div v-else>
          <transfer></transfer>
        </div>
        <div class="tip">
          <p>温馨提示:</p>
          <p class="tip_text">请确认您的USDT充值链类型为ERC20链类型，错误的链类型会导致资产丢失哦。USDT充值区块确认时间为1-5分钟</p>
        </div>
      </div>
    </van-popup>
    <div class="jyjl">
      <img src="../../assets/images/jyjl.png">
    </div>
    <div v-if="this.info2.length > 0">
      <div class="trading_record" v-for="(item,index) of info2" :key="index">
        <div>
          <p>{{item.comment}}</p>
          <p class="date light_color">{{item.get_time}}</p>
        </div>
        <div>{{item.nums}} LGC</div>
      </div>
    </div>
    <div v-else class="nodata">
      <div class="nodata_box">
        <img src="../../assets/images/nodata.png" alt="">
        <p>没有数据...</p>
      </div>
    </div>
  </div>
</template>
<script>
import extractCurrency from '@/components/usdt/extractCurrency'
import recharge from '@/components/usdt/recharge'
import transfer from '@/components/usdt/transfer'
import {mapState} from "vuex";
import Clipboard from 'clipboard';
import { Notify } from 'vant';
  export default {
    data(){
      return{
        info1:[
          { icon: require('../../assets/images/cz.png'), message: "充值"},
          { icon: require('../../assets/images/tb.png'), message: "提币"},
          { icon: require('../../assets/images/zz.png'), message: "转账"}
        ],
        info2:[],
        show1: false,
        index:'',
        address:"",
        qrCode:""
      }
    },
    methods: {
      showPopup: function(value, event) {
        console.log(value);
        this.show1 = true;
        this.index = value;
        console.log(this.index);
      },
      copy() {
        console.log("kashi")
        var clipboard = new Clipboard('.img')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy();
          Notify({
            message: '复制成功',
            color: '#000',
            background: "rgba(48,208,161,0.5)",
            duration: 2000
          });
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      }
    },
    components:{extractCurrency,recharge,transfer},
    computed:{
      ...mapState(["usdt_cny","usdt_num","img_head","userid"])
    },
    mounted(){
      this.axios.post("/Tranmoneylog/getFundLog",{
        type:2,
        page:1,
        token:localStorage.getItem("token")
      }).then(res=>{
        console.log(res.data);
        this.info2 = res.data.data.list;
        console.log(this.info2);
      })
      this.axios.post("/Coin/getRechargeAddress").then(res=>{
        // console.log("coin",res.data)
        this.address = res.data.data.address;
        this.qrCode = res.data.data.qrCode;
        // console.log("address",this.address);
        // console.log("qrCode",this.qrCode);
      })
    }
  }
</script>
<style lang="scss" scoped>
  .usdt{
   .popup_list{
      .tip{
        color:#fff;
        text-align: left;
        margin-left: 10px;
        p:first-child{
           font-size:28px;
           font-weight: lighter;
        }
        .tip_text{
          margin-top:15px;
          color:#fff;
          opacity: 0.5;
        }
      }
    }
  }
</style>
<style lang="scss">
 @import '../../assets/css/lgc_usdt.scss'; 
</style>