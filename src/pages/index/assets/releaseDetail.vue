<template>
  <div class="check_release">
    <div class="header">
      <img src="../../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
    </div>
    <div class="release_detail">
      <img src="../../../assets/images/release_detail.png" alt="">
      <div 
      v-for="(item,index) of info" :key="index" class="release_list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
      :infinite-scroll-immediate-check="true"
      >
        <div>
          <p>本金释放</p>
          <p>{{item.release_time}}</p>
        </div>
        <div>
          <p>{{item.release_amount}} USDT</p>
          <p>{{item.lgc_amount}} LGC</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      info:[],
      page:1,  //当前页面
      busy:false, //是否可以滚动
      list:null
    }
  },
  methods:{
    loadData(){
      console.log("data")
        this.busy = true;
        //出现加载提示框
        // this.$indicator.open('加载中...');
        let id = this.$route.params.id;
        //加载数据
        this.axios.post('/Currency/getAssetsRelease',{
          id,
          token:localStorage.getItem("token"),
          page:this.page
        }).then(res=>{
          var info=res.data.data.list;
          this.list = res.data.data.list;
          console.log(info);
          info.forEach(item=>{
            this.info.push(item);
          })  
        });
        this.busy = false;
      },
    //加载更多的信息
    loadMore(){
      //当前页码进行递增操作
        this.page++;
        if(this.list.length > 0){
          this.loadData();
          console.log(this.list);
        }
    }
     

    // loadMore(page){
    //   setTimeout(()=>{
    //     this.axios.post("/Currency/getAssetsRelease",{
    //       id,
    //       token:localStorage.getItem("token"),
    //       page:0
    //     }).then(res=>{
    //       console.log(res.data);
    //       this.info = res.data.data.list;
    //     })
    //   })
    // }
  },
  mounted(){
    this.loadData();
  }
}
</script>
<style lang="scss" scoped>
  .check_release{
    max-height: 100vh;//与屏幕一样高度
    overflow-y: auto;
    .header {
      position: relative;
      height: 66px;
      margin-top:50px;
      img {
        position: absolute;
        top: 50%;
        left: 36px;
      }
    }
    .release_detail{
      margin-top:80px;
      padding:0 36px;
      img{
        margin-bottom:40px;
      }
    }
    .release_list{
      display: flex;
      justify-content: space-between;
      padding:20px 0;
      color:rgba(255,255,255,0.3);
      border-bottom:1px solid #0a393b;
      div>p:first-child{
        color:#fff;
        font-size:36px;
        margin-bottom:5px;
      }
      div:last-child{
        text-align: right;
      }
    }
  }
</style>
