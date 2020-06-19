<!--  -->
<template>
  <div class='tx-wrap'>
    <div class="flex_box">
      <div class="wrap">
        <div class="header">
          <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
          <span>认购资产包</span>
        </div>
        <p class="p1">账户可用资产折合CNY</p>
        <div class="zichan">
          <p>{{amount}}</p>
          <div><img :src="src" alt="" @click="isvisible"></div>
        </div>
        <router-link class="details" to="/accountDetail">查看账户详情</router-link>
        <!-- <div class="jindu">
          <div><img src="../../assets/images/icon-clock.png" alt=""></div>
          <div>
            <p>
              <span>50%</span>
              <span>当资源包额度开通进程</span>
            </p>
          <mt-progress :value="20" :bar-height="5"></mt-progress>
          </div>
        </div> -->
      </div>
      <div class="wrap2">
        <div class="header">
          <div :style="{'background-color':showCell ? '#30d0a1' : 'transparent',color:showCell ?'#fff':'#30d0a1'}" @click="changeCell(1)">认购资产包</div>
          <div :style="{'background-color':!showCell ? '#30d0a1' : 'transparent',color:!showCell ?'#fff':'#30d0a1'}" @click="changeCell(2)">囤币加速</div>
        </div>
        <div class="subscribe" v-if="showCell">
          <!-- <div class="lgc">
            <div>
              <img src="../../assets/images/lgc_small.png" alt="">
              <span>LGC</span>
            </div>
            <div><img src="../../assets/images/back_up.png" alt=""></div>
          </div> -->
          <ul class="lgc_list">
            <router-link :to="`assetsPack/${item.id}`" v-for="(item,index) of info" :key="index" class="lgc_details" tag="li">
                <div class="lgc_icon">
                  <div><img :src="item.icon" alt=""></div>
                  <div>
                    <p class="title">{{item.name}}</p>
                    <p>{{item.lever}}倍收益</p>
                  </div>
                </div>
                <div class="usdt">
                  <span>{{item.min_num}}~{{item.max_num}} USDT</span>
                  <p></p>
                  <img src="../../assets/images/black_right.png" alt="">
                </div>
            </router-link>
          </ul>
        </div> 
        <div class="expedite" v-else>
          <div class="lgc_card">
            <div class="logo">
              <img src="../../assets/images/lgc_small.png" alt="">
              <span>LGC</span>
            </div>
            <ul class="card_list">
              <li>
                <p>持币数量</p>
                <p>{{info2.amount}}</p>
              </li>
              <li class="border"></li>
              <li>
                <p>可用数量</p>
                <p>{{info2.userAmount}}</p>
              </li>
              <li class="border"></li>
              <li>
                <p>当前收益率</p>
                <p>{{info2.rate}}%</p>
              </li>
            </ul>
            <div class="button_group">
              <a href="javascript:;" class="btn"  @click="forward_into">转入</a>
              <a href="javascript:;" class="btn btn1" @click="forward">转出</a>
            </div>
          </div>
          <p class="explain_title">持币加速说明</p>
          <p class="explain_detail">持币的基础加速收益1%每天，囤币随进随处出，不锁仓，多次囤币按照一笔统计，囤币后7天内未转出，则收益增加0.1%，上限为2%，中途有任意金额转出，则掉回基础收益1%。</p>
        </div>
      
    <!-- 转入 -->
    <van-popup
        v-model="show_into"
        closeable
        close-icon-position="top-left"
        round
        position="bottom"
        :close-on-click-overlay="false"
        :style="{ backgroundColor: '#fff', height: '45%', textAlign: 'center', padding: '40px 0' }"
        class="vanPopup"
      >
      <div class="detail">
        <p>付款详情</p>
        <p>0.0000</p>
        <p>可用数量LGC</p>
      </div>
      <div class="input">
        <p>数量</p>
        <div>
          <input type="text" placeholder="请在此输入转入的数量" v-model="fCount">
          <span>LGC</span>
        </div>
        <a href="javascript:;" class="btn" @click="showPopup">确认转入</a>
      </div>
    </van-popup>
    <div class="popup" v-show="show">
      <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
      <span>请输入交易密码</span>
      <p>
        <span>¥</span>
        <span>{{fCount}}</span>
      </p>
      <p class="error">{{errorInfo}}</p>
      <div class="shade" v-show="show_shade"></div>
      <!-- vant密码组件 -->
      <van-password-input :value="safe_password" :focused="showKeyboard"  @focus="showKeyboard = true" />
      <!-- vant键盘组件 -->
      <van-number-keyboard :show="showKeyboard" @input="onInput_into" @delete="onDelete" @blur="showKeyboard = false" />
      <router-link to="/account/forgetPayPass" tag="p" class="find_pwd">找回密码并交易</router-link>
    </div>
    <!-- 转出 -->
     <van-popup
        v-model="show1"
        closeable
        close-icon-position="top-left"
        round
        position="bottom"
        :close-on-click-overlay="false"
        :style="{ backgroundColor: '#fff', height: '45%', textAlign: 'center', padding: '40px 0' }"
        class="vanPopup"
      >
      <div class="detail">
        <p>付款详情</p>
        <p>0.0000</p>
        <p>可用数量LGC</p>
      </div>
      <div class="input">
        <p>数量</p>
        <div>
          <input type="text" placeholder="请在此输入转出的数量" v-model="fCount">
          <span>LGC</span>
        </div>
        <a href="javascript:;" class="btn" @click="showPopup">确认转出</a>
      </div>
    </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible:false, //开关变量，控制是否可见
        money:"",
        src:"",
        info:[],
        showCell:true, //切换单元格
        show1:false, //控制转出的弹框
        show:false, // 确认转出的弹框
        safe_password: '', //密码输入的值
        showKeyboard: true, //显示密码框/键盘
        errorInfo: '', //密码错误的提示信息
        count:0,  //控制密码输入的次数
        show_shade:false, //控制遮罩层
        fCount:null, //转出的数量
        amount:"0.000",  //总金额
        amount1:"",
        show_into:false, //控制转入的弹框
        info2:{}//囤币卡片数据
      }
    },
    created() {
      
    },
    mounted(){
      //初始化数据
      this.src = require("../../assets/images/visible.png");
      this.axios.post("/Currency/assetsList",{
        tags:1,
        type:2,
        token:localStorage.getItem("token")
      }).then(res=>{
          this.info = res.data.data.list;
          // console.log(this.info);
          console.log(res.data)
          this.amount = res.data.data.amount || "0.0000";
          this.amount1 = res.data.data.amount || "0.0000";
          this.info.forEach(item=>{
          item.icon = require("../../assets/images/"+item.icon);
            // console.log(item.icon)
          })
      })
      this.axios.post("Currency/getUserExtractMoney",{}).then(res=>{
          // console.log(res.data);
          this.info2 = res.data.data;
          // console.log(this.info2)
      })  
    },
    methods: {
      //余额是否可见
      isvisible(){
        if(this.visible){
          this.visible = false
          this.src = require("../../assets/images/visible.png");
          this.amount =  this.amount1;
        }else{
          this.visible = true
          // this.amount = parseInt(this.amount);
          this.amount = this.amount.replace(/\d/ig,"*");
          this.src = require("../../assets/images/invisible.png")
        }
      },
      //切换单元格
      changeCell(i){
        if(i==1){
          this.showCell = true;
        }else{
          this.showCell = false;
        }
      },
      forward(){
        this.show1 = true;
      },
      forward_into(){
        this.show_into = true
      },
      showPopup(){
        if(!this.fCount){
          this.$messagebox.alert("数量不能为空");
        }else{
          this.show = true;
        }
      },
      hidePopup(){
        this.show = false;
      },
      //验证转入的密码
      onInput_into(key){
         this.safe_password = (this.safe_password + key).slice(0, 6);
        if(this.safe_password.length===6){
          this.axios.post("Currency/hoardMoney",
            {
              amount: this.fCount,
              safe_password: this.safe_password,
              type: 1,
              token: localStorage.getItem('token')
            }
          ).then(res=>{
            // console.log(res.data);
            let status = res.data.status;
            if(status == 304){
              //密码错误清空密码
              this.safe_password="";
              this.count ++;
              if(this.count ==1 ){
                this.errorInfo = "密码不正确，请重新输入";
              }else if(this.count>1 && this.count<5){
                this.errorInfo =  `密码不正确，您还有${5-this.count}次机会`
              }else{
                this.errorInfo = "您的输入机会已用完，请找回交易密码";
                this.showKeyboard = false;
                this.show_shade = true;
              }
              }else if(status == 200){
              // this.$router.push("/");
              // console.log(res.data);
              this.safe_password = "";
              console.log("成功");
              this.$router.push("/");
            }
        })
      }
      },
      // 验证支付密码
      onInput(key) {
         this.safe_password = (this.safe_password + key).slice(0, 6);
        if(this.safe_password.length===6){
          this.axios.post("Currency/extractMoney",
            {
              amount: this.fCount,
              safe_password: this.safe_password,
              type: 1,
              token: localStorage.getItem('token')
            }
          ).then(res=>{
          // console.log(res.data);
          let status = res.data.status;
          if(status == 304){
            //密码错误清空密码
            this.safe_password="";
            this.count ++;
            if(this.count ==1 ){
              this.errorInfo = "密码不正确，请重新输入";
            }else if(this.count>1 && this.count<5){
              this.errorInfo =  `密码不正确，您还有${5-this.count}次机会`
            }else{
              this.errorInfo = "您的输入机会已用完，请找回交易密码";
              this.showKeyboard = false;
              this.show_shade = true;
            }
          }else if(status == 200){
            // this.$router.push("/");
            // console.log(res.data);
            this.safe_password = "";
            console.log("成功");
            this.$router.push("/business/clickreturn");
          }
        })
      }
    },
    
    // 删除输入的密码值
      onDelete() {
        this.safe_password = this.safe_password.slice(0, this.safe_password.length - 1);
      }
    }
  }

</script>
<style lang='scss' scoped>
  .tx-wrap {
    font-family: PingFangSC;
    background-color:#fff;
    height:100%;
    .wrap {
      /*background: rgba(15, 57, 75, 1);*/
      // border-radius: 0 0 45px 45px;
      text-align: center;
      background-color:#000;
      height:450px;
      .header {
        text-align: center;
        position: relative;
        height: 66px;
        line-height:100px;
        font-size:36px;
        padding-top:50px;
        color: #30D0A1;
        img {
          position: absolute;
          top: 50%;
          left: 36px;
        }
      }
      .p1 {
        color: rgba(255, 255, 255, .5);
        padding-top: 62px;
        font-size:24px;
      }
      .zichan {
        display: flex;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-bottom:10px;
        justify-content: center;
        p{
          font-size:70px;
        }
        img{
          margin-top:30px;
          margin-left:15px;
        }
      }
      .btn-box {
        display: flex;
        justify-content: space-around;
        padding-top: 50px;

        .zz {
          width: 180px;
          height: 74px;
          background: rgba(48, 208, 161, .2);
          border-radius: 42px;
          font-size: 26px;
          font-weight: 500;
          color: rgba(48, 208, 161, 1);
          line-height: 74px;
        }
        .sk {
          width: 180px;
          height: 74px;
          background: rgba(48, 208, 161, 1);
          border-radius: 42px;
          font-size: 26px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 74px;
        }
      }
    }
    .tit {
      font-size: 40px;
      font-weight: 500;
      color: rgba(255, 255, 255, .5);
      padding: 34px 0 20px 36px;
    }
    .details{
      display: inline-block;
      width:250px;
      height:70px;
      line-height: 70px;
      border-radius: 50px;
      color: #30d0a1;
      background-color: rgba(48, 208, 161, .3);
      font-size:28px;
    }
    .jindu{
      display: flex;
      width:95%;
      height:160px;
      background-color:#30d0a1;
      border-radius:48px;
      margin:20px auto;
      padding:40px 0 0 40px;
      box-sizing: border-box;
      color:#fff;
      font-size:24px;
      img{
        margin-right:40px;
      }
    }
    .wrap2 {
      border-radius: 45px 45px 0 0;
      background-color: #ffffff;
      
      padding:50px;
      // flex: 1;    
      .header{
        display: flex;
        border:3px solid #30d0a1;
        height:70px;
        margin:0 auto;
        border-radius:15px;
        div{
          flex:50%;
          text-align: center;
          line-height: 70px;
          font-size:32px;
        }
      }
      .lgc{
        display:flex;
        height:90px;
        border:1px solid rgba(48, 208, 161, .3);
        padding:0 30px;
        justify-content: space-between;
        line-height: 90px;
        margin:40px 0;
        border-radius:15px;
        font-size:38px;
        img{
          margin-top:-10px;
          margin-right:20px;
        }
      }
      .lgc_list{
        margin-top:50px;
        .lgc_details{
          display:flex;
          justify-content: space-between;
          align-items: center;
          color:rgba(0, 0, 0, .5);
          height:120px;
          .lgc_icon{
            display:flex;
            align-items: center;
            div:first-child{
              margin-right:25px;
            }
          }
          .title{
            font-size:36px;
            color:#000;
          }
          .usdt{
            display: flex;
            align-items: center;
          }
          .usdt>span{
            font-size:px;
            margin-right:20px;
          }
        }
        .lgc_details+.lgc_details{
          margin-top:50px;
        }
      }
      .lgc_card{
        height:300px;
        margin:30px 0;
        background-color:rgb(15,57,75);
        border-radius:30px;
        padding:30px;
        color:#fff;
        font-size:30px;
        .logo{
          font-size:48px;
          margin-bottom:20px;
        }
        .card_list{
          display:flex;
          text-align:center;
          justify-content: space-around;
          
          li>p:first-child{
            color:#879ca5;
            margin-bottom:10px;
          }
          .border{
            background-color:rgb(39, 77, 93);
            width:3px;
            height:50px;
            line-height:80px;
            margin-top:25px;
          }
        }
        .button_group{
          display: flex;
          justify-content: space-between;
          margin-top:20px;
          .btn{
            width:40%;
            height:70px;
            line-height:70px;
            border-radius:50px;
            display: block;
            border:3px solid #30d0a1;
            color:#30d0a1;
            text-align:center;
            font-family: PingFangSC;
          }
          .btn1{
            background:#30d0a1;
            color:#fff;
          }
        }
      }
      .explain_title{
        color:#011321;
        font-size:21px;
        margin-bottom:30px;
      }
      .explain_detail{
        color:#0f394b;
        font-size:18px;
      }
    }
    .vanPopup{
      .detail{
        p:first-child{
          margin-top:-30px;
          font-size:32px;
          color:#011321;
          font-weight: bold;
          margin-bottom:30px;
        }
        p:nth-child(2){
          font-size:60px;
        }
        p:last-child{
          color:rgba(0, 0, 0, .5);
        }
      }
      .input{
        text-align:left;
        padding:50px 40px;
        p:first-child{
          font-size:26px;
        }
        div{
          display: flex;
          justify-content: space-between;
          font-size:34px;
          padding:20px 0;
          border-bottom:1px solid rgba(0, 0, 0, .2);
        }
      }
      .btn {
        width:95%;
        display: block;
        background:#30d0a1;
        color:#fff;
        text-align:center;
        border-radius:15px;
        line-height: 100px;
        color:#fff;
        font-size:35px;
        margin:100px auto 50px auto;
        font-family: PingFangSC;
      }
    }
    .popup{
      width:80%;
      height:450px;
      z-index:2100;
      position: fixed;
      top:20%;
      left:10%;
      // margin-top:-250px;
      background-color:#fff;
      border:1px solid rgba(0, 0, 0, .2);
      border-radius:20px;
      padding-top:40px;
      box-sizing: border-box;
      text-align: center;
      box-shadow: 0px 20px 40px #000;
      .close{
        width:40px;
        position: absolute;
        top:40px;
        left:50px;
      }
      span{
        color:#041b29;
        font-size:34px;
      }
      p{
        span:first-child{
          font-size:38px;
          font-weight: 600;
        }
        span:last-child{
          font-size:80px;
          color:#011321;
          font-weight: 600;
        }
      }
      .error{
        color:#f55c57;
        margin:15px 0;
      }
      .find_pwd{
        color:#32d1a2;
        margin:18px 0;
      }
    }
    .shade{
      width:100%;
      height:120px;
      background-color: transparent;
      z-index:2200;
      position:absolute;
      top:60%;
    }
    .subscribe{
      background-color:#fff;
    }
  }

</style>
<style lang="scss">
.tx-wrap{
  .mt-progress-runway{
    background-color:rgba(255, 255, 255, .3);
    border-radius:9px;
    width:500px;
  }
  .mt-progress-progress{
    background-color:#fff;
    border-radius:9px;
    width:200px !important;
  }
  .popup{
    .van-popup__close-icon{
      font-size:54px;
      color:#000;
    }
    
  }
}
</style>
