<!--  -->
<template>
  <div class="quotation-wrap">
    <div id="my-echarts">
      <div class="gif">
        <img src="../assets/images/quxiantu.gif" alt="">
      </div>
      <div class="bottom">
        <div class="lgc">
          <p class="p1">LGC</p>
          <p class="p2">{{lgc}}</p>
        </div>
        <div class="btc">
          <p class="p1">BTC</p>
          <p class="p2">{{btc}}</p>
        </div>
        <div class="eth">
          <p class="p1">ETH</p>
          <p class="p2">{{eth}}</p>
        </div>
      </div>
    </div>
    <ul class="quotation-list">
      <li v-for='(item,index) in info' :key="index">
        <div class="li-left">
          <!-- <img :src="item.icon" alt /> -->
          <!-- item.image = 'require("../../assets/images"+item.icon)' -->
          <img :src="item.icon" alt="">
          <div class="word">
            <span>{{item.coin_name}}</span>
            <!-- <p>{{item.create_time}}</p> -->
          </div>

        </div>

        <div class="money">{{item.sell}}</div>
        <div class="increase">
          <button>{{item.increase}}</button>
        </div>
      </li>
    </ul>
    <div class="hei"></div>
    <quotation-footer current="1"></quotation-footer>
  </div>
</template>

<script>
import quotationFooter from "@/components/footer";
import echarts from "echarts";
export default {
  data() {
    return {
      lgc: '',
      btc: '',
      eth: '',
      info:[]
    };
  },
  components: {
    quotationFooter
  },
  created() {
    this.get_coin_list()
  },
  mounted() {
    
  },
  methods: {

    get_coin_list(){
      const url = '/Coin/get_coin_list'
      
      this.axios.post(url,{
      }).then(res=>{
        this.info = res.data.data;
        this.coinlist = res.data.data;
        this.info.forEach(item=>{
          item.icon = require("../assets/images/"+item.icon);
        })
        for( let i = 0; i < this.info.length; i++ ) {
          if(this.info[i].coin == 'lgc') {
            this.lgc = this.info[i].sell
          }else if (this.info[i].coin == 'btc') {
            this.btc = this.info[i].sell
          }else if (this.info[i].coin == 'eth') {
            this.eth = this.info[i].sell
          }
        }
        
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.quotation-wrap {
  #my-echarts {
    height: 550px;
    background-color: #0f394b;
    border-bottom-left-radius: 45px;
    border-bottom-right-radius: 45px;
    position: relative;
    .gif {
      img {
        width: 100%;
        transform: translateY(120px);
      }
    }
    .bottom {
      position: absolute;
      bottom: 20px;
      display: flex;
      width: 100%;
      .lgc,
      .btc,
      .eth {
        flex: 1;
        text-align: center;
        .p1 {
          font-size: 30px;
          color: #fff;
        }
        .p2 {
          font-size: 26px;
          color: #a6afb4;
        }
      }
    }
  }

  .quotation-list {
    padding: 0 36px;
    margin-top: 45px;
    background-color: #011321;
    li {
      font-family: PingFangSC;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 45px;

      .li-left {
        display: flex;
        flex: 1;
        img {
          width: 96px;
          height: 96px;
        }

        .word {
          padding-left: 30px;
          font-size: 55px;
          span {
            font-size: 30px;
            color: rgba(255, 255, 255, 1);
          }

          p {
            font-size: 21px;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 10px;
          }
        }
      }

      .money {
        font-size: 30px;
        color: rgba(255, 255, 255, 1);
        flex: 1;
        text-align: center;
      }

      .increase {
        flex: 1;
        text-align: center;
        width: 50px;
        height: 50px;
        margin-top: 5px;
        
        button {

          line-height: 50px;
          color: white;
          background-color: red;
          width: 120px;
          border-radius: 15px;
          margin-right: 30px;
          float: right;
        }
      }
    }
  }
  .hei {
    background-color: #011321;
    height: 120px;
  }
}
</style>
