<template>
  <div class="lgc">
    <div class="header">
      <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      <span>LGC</span>
    </div>
    <div class="lgc_header">
      <p>
        <img src="../../assets/images/lgc.png">
        <span>LGC</span>
      </p>
      <p>{{parseInt(lgc_num).toFixed(4)}}</p>
      <p>≈{{parseInt(lgc_cny).toFixed(4)}} CNY</p>
      <div>
        <span>L054D51684...4F152S4Z0E</span>
        <img src="../../assets/images/copy.png">
      </div>
    </div>
    <ul class="lgc_list">
      <li v-for="(item,index) of info1" :key="index">
        <!-- <a href="javascript:void(0);" @click="showPopup(index, $event)"> -->
          <router-link to="/develop">
            <img :src="item.icon">
            <p class="light_color">{{item.message}}</p>
          </router-link>
        <!-- </a> -->
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
          <recharge></recharge>
        </div>
        <!-- 提币 -->
        <div v-else-if="index===1">
          <extractCurrency></extractCurrency>
        </div>
        <!-- 转账 -->
        <div v-else>
          <transfer></transfer>
        </div>
      </div>
    </van-popup>
    <div class="jyjl">
      <img src="../../assets/images/jyjl.png">
    </div>
    <div v-show="false"  class="trading_record_box">
      <div class="trading_record" v-for="(item,index) of info2" :key="index">
        <div>
          <p>{{item.comment}}</p>
          <p class="date light_color">{{item.get_time}}</p>
        </div>
        <div>{{item.nums}} LGC</div>
      </div>
    </div>
    <div class="nodata">
      <div class="nodata_box">
        <img src="../../assets/images/nodata.png" alt="">
        <p>没有数据...</p>
      </div>
    </div>
  </div>
</template>
<script>
import extractCurrency from '@/components/lgc/extractCurrency'
import recharge from '@/components/lgc/recharge'
import transfer from '@/components/lgc/transfer'
import {mapState} from "vuex";
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
        index:''
      }
    },
    methods: {
      showPopup: function(value, event) {
        console.log(value);
        this.show1 = true;
        this.index = value;
        console.log(this.index);
        console.log(this.data);
        console.log("a");
      },
      offsetBlack(){
          if(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)){
            // 有滚动条
            document.querySelector('.lgc').setAttribute('style', 'height:auto');
          }else{
            // 没滚动条
            document.querySelector('.lgc').setAttribute('style', 'height:100%');
          }
        },
    },
    components:{extractCurrency,recharge,transfer},
    computed:{
      ...mapState(["lgc_cny","lgc_num","img_head","userid"])
    },
    // mounted(){
    //   this.axios.post("/Tranmoneylog/getFundLog",{
    //     type:1,
    //     page:1,
    //     token:localStorage.getItem("token")
    //   }).then(res=>{
    //     console.log(res.data);
    //     this.info2 = res.data.data.list;
    //     console.log(this.info2);
    //   })
    //   console.log(this.userid);
    // }
  }
</script>
<style lang="scss" scoped>
  
</style>
<style lang="scss">
 @import '../../assets/css/lgc_usdt.scss';
</style>