<template>
  <div class="chongzhi">
    <img :src="qrCode" alt="" class="ewm">
    <p id="bar">{{address}}</p>
    <a href="javascript:;" class="btn btn2" @click="copy" data-clipboard-target="#bar">复制地址</a>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import { Notify } from 'vant';
export default {
  data(){
    return{

    }
  },
  props:["address","qrCode"],
  methods:{
    copy() {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', e => {
        console.log('复制成功')
        // 释放内存
        clipboard.destroy();
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
    }
  }
}
</script>
<style lang="scss" scoped>
.chongzhi{
        margin-top:20px;
        p{
          width:80%;
          margin:0 auto;
          padding-bottom:10px;
          border-bottom:1px solid #32d1a2;
          color:rgba(255,255,255,0.8);
          font-size:32px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap
        }
        a{
          margin:30px auto;
        }
        .ewm{
          width: 380px;
        }
        .btn{
          width:35%;
          height:80px;
          display: block;
          background:#30d0a1;
          color:#fff;
          text-align:center;
          font-family: PingFangSC;
          border-radius:40px;
          line-height: 80px;
          font-size:24px;
        }
      }
      
</style>
