<!--  -->
<template>


  <!-- 判断  没撑出滚动条就加100%   撑出了就改auto -->
  <!-- <div class='recharge-oil' :style="{'height':document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)? '100%':'auto'}"> -->
  <div class='recharge-oil'>
    <div class="fff">
      <header>
      <img src="../../assets/images/back_black.png" alt="" @click="$router.go(-1)">
      <p>油卡充值</p>
    </header>
    <div class="chooseCompany">
        <div class="petroleum" @click="petroleum">
            <input type="radio" name="chooseCompany" id="petroleum">
            <label for="petroleum">
                <div v-if="chooseCompany=='petroleum'"><img src="../../assets/images/onpetroleum.png" alt="" class="shadow"></div>
                <div v-else><img src="../../assets/images/petroleum.png" alt=""></div>
            </label>
        </div>
        <div class="petrifaction" @click="petrifaction">
            <input type="radio" name="chooseCompany" id="petrifaction">
            <label for="petrifaction">
                <div v-if="chooseCompany=='petrifaction'"><img src="../../assets/images/onpetrifaction.png" alt="" class="shadow"></div>
                <div v-else><img src="../../assets/images/petrifaction.png" alt=""></div>
            </label>
        </div>
    </div>
    <div class="inputbox" >
      <div>
        <p class="number">油卡号</p>
        <input type="number" v-model="oilnumber" placeholder="请输入油卡编号" @keyup="inputactive" id="oilnumber">
        <p class="name">姓名</p>
        <input v-model="username" placeholder="请输入姓名" @keyup="inputactive1" id="username">
        <p class="phonenum">手机号</p>
        <input type="number" v-model="phonenum" placeholder="请输入手机号" @keyup="inputactive2" id="phonenum">
        <p class="balance">余额: {{lgcnum}} LGC</p>
      </div>
    </div>

    <div class="choosePrice" v-if="chooseCompany=='petroleum'">
      <ul class="pricelist">
        <li @click="passid(item.id,item.price)" v-for="(item,index) in petroleumlist" :key=index>{{item.price}}<span>元</span></li>
      </ul>
    </div>

    <div class="choosePrice" v-if="chooseCompany=='petrifaction'">
      <ul class="pricelist">
        <li @click="passid(item.id,item.price)" v-for="(item,index) in petrifactionlist" :key=index>{{item.price}}<span>元</span></li>
      </ul>
    </div>

    <div class="carefulTip" v-if="chooseCompany=='petroleum'">
        <p class="title">中石油充值注意事项:</p>
        <p>1、暂只支持个人卡记名卡 (卡号以90开头), 不支持车队卡 (卡号以91开头)。</p>
        <p>2、中石油官方客服热线: 95504</p>
    </div>
    <div class="carefulTip" v-if="chooseCompany=='petrifaction'">
        <p class="title">中石化充值注意事项:</p>
        <p>1、中石化官方每日 22.50-00.50为其系统对账时间,此段时间拒绝收单处理,对账结束,正常处理。</p>
        <p>2、所有加油卡主卡都可以在线充值,包含记名主卡、不记名主卡、企业主卡。副卡、挂失卡、卡号不存在无法充值。</p>
        <p>3、订单充值成功,一般10分钟内即可到账,用户需在加油站完成圈存,方可使用。</p>
        <p>4、同一时间同一卡号提交多笔,可能会被石化系统限制,导致充值失败,不同省份超限额度不同。</p>
        <p>5、订单充值陈功,如超过24小时仍未到账,为中石化官方系统数据传输问题,请您尽快通过客服热线与我们或中石化官方联系。</p>
        <p>6、中石化官方客服热线: 区号+95105888/91505988</p>
    </div>




    <van-action-sheet v-model="show">
      <div class="content">
        <div class="details">
          <img src="../../assets/images/close_black.png" alt="" @click="show=false;passwordshow=false">
          <span class="payinfo">付款详情</span>
          <p class="title">{{cnyprice}}<span class="type">LGC</span></p>
          <p class="introduce">1.0000 LGC ≈ {{exchange_rate}} CNY</p>
          <div class="lgc">
            <div class="lgc1">
              <span class="left">余额 (LGC):</span>
              <span class="right">{{lgcnum}}</span>
            </div>
            <div class="lgc1">
              <span class="left">消耗 (LGC):</span>
              <span class="right">{{cnyprice}}</span>
            </div>
          </div>
          <div class="release">
            <van-button type="primary" block @click="passwordshow=true">确认支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    
    <!-- <van-popup
    v-model="passwordshow"
    round
    position="bottom"
    :close-on-click-overlay="false"
    :style="{ backgroundColor: '#fff', height: '40%', textAlign: 'center', padding: '40px 0' }"
    class="popup"
    > -->
    <div class="popup" v-show="passwordshow">
      <div class="head">
        <img src="../../assets/images/close_black.png" alt="" class="close" @click="hidePopup">
        <span>请输入交易密码</span>
      </div>
      <p>
        <span>{{cnyprice}}</span>
        <span>LGC</span>
      </p>
      <p class="error">{{errorInfo}}</p>
      <div class="shade" v-show="show_shade"></div>
      <van-password-input :value="value" :focused="showKeyboard"  @focus="showKeyboard = true"/>
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
      <router-link to="/account/forgetPayPass" tag="p" class="find_pwd">找回密码并交易</router-link>
    <!-- </van-popup> -->
    </div>
  </div>
  </div>
  
</template>

<script>

  export default {
    data() {
      return {
        oilnumber: '', // 油卡号
        username: '', // 用户姓名
        phonenum: '', // 用户手机号
        chooseCompany: 'petroleum',
        petroleumlist: [], //中石油
        petrifactionlist: [], //中石化
        show: false,
        password: '',
        
        
        passwordshow:false,
        value: '',
        showKeyboard: true,
        errorInfo: '',
        count:0,
        show_shade:false,

        // priceLise: [{"id":1,price:"1000.00"},{"id":2,price:"100.00"},{"id":3,price:"50.00"},{"id":3,price:"50.00"},{"id":3,price:"50.00"},{"id":3,price:"50.00"},{"id":3,price:"50.00"}],
        priceLise: '', 
        chooseid: 0, // 选中的id
        chooseprice: 0, // 选中id对应的价格
        cnyprice: 0.0000, // 传入rmb对应的lgc货币
        lgcnum: localStorage.getItem('lgc_num'), // 余额
        exchange_rate: 0 // 汇率

      }
    },
    created() {
      this.get_goods_list()
      
    },
    updated() {
      this.offsetBlack()
    },
    watch: {
      chooseCompany(old,newValue){
        this.get_exchangePrice()

      }
    },
    
    methods: {
        inputactive() {
            console.log(this.oilnumber.length,this.username)
            if(this.oilnumber.length == 5 && this.username != ""){
                document.querySelector('.pricelist').classList.add('active')
            } else {
                document.querySelector('.pricelist').classList.remove('active')
            }

            if(this.oilnumber.length >= 1){
                document.getElementById('oilnumber').setAttribute('style','border-bottom-color:#30d0a1')
            } else {
                document.getElementById('oilnumber').setAttribute('style','border-bottom-color:none')
            }

        },
        inputactive1() {
            
            if(this.oilnumber.length == 5 && this.username != ""){
                document.querySelector('.pricelist').classList.add('active')
            } else {
                document.querySelector('.pricelist').classList.remove('active')
            }
            if(this.username.length != ''){
                document.getElementById('username').setAttribute('style','border-bottom-color:#30d0a1')
            }else {
                document.getElementById('username').setAttribute('style','border-bottom-color:none')
            }
        },
        inputactive2() {
            
            if(this.oilnumber.length == 5 && this.username != ""){
                document.querySelector('.pricelist').classList.add('active')
            } else {
                document.querySelector('.pricelist').classList.remove('active')
            }
            if(this.phonenum.length != ''){
                document.getElementById('phonenum').setAttribute('style','border-bottom-color:#30d0a1')
            }else {
                document.getElementById('phonenum').setAttribute('style','border-bottom-color:none')
            }
        },


        petroleum() {
            this.chooseCompany = 'petroleum'
        },
        petrifaction() {
            this.chooseCompany = 'petrifaction'
        },


        offsetBlack(){
          if(document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)){
            // 有滚动条
            document.querySelector('.recharge-oil').setAttribute('style', 'height:auto');
          }else{
            // 没滚动条
            document.querySelector('.recharge-oil').setAttribute('style', 'height:100%');
          }
        },


        showPopup(){
          this.passwordshow = true;
        },
        hidePopup(){
          this.passwordshow = false;
          this.show = false
        },
        // 验证支付密码
        onInput(key) {

          this.value = (this.value + key).slice(0, 6);
          let self = this
          if(this.value.length===6){
            const url = '/Goods/refueling_card'
            this.axios.post(url,{
              goods_id: this.chooseid,
              game_userid: this.oilnumber,
              gasCardTel: this.phonenum,
              gasCardName: this.username,
              safe_password: this.value,
              // token: localStorage.getItem('token'),
            }).then(res=>{
            // this.pricetype = res
              console.log(res)
              if(res.data.status == 200){
              // Toast('充值成功')
              this.$messagebox.alert(res.data.message);
              this.$router.push("/business/clickreturn");
            }else if(res.data.status == 304){
              this.errorInfo = res.data.message;
              
              // console.log(err.message)
              // this.$route.push('/rechargePhone')
              // 刷新页面
              // location.reload()
              this.value="";
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
            }
          })
        }







        },
        onDelete() {
          this.value = this.value.slice(0, this.value.length - 1);
        },

        // 获取点击商品的id
        passid(id,price) {
          if(!this.oilnumber){
            this.$messagebox.alert("油卡号码不能为空")
          }else if(!this.username){
            this.$messagebox.alert("用户名不能为空")
          }else if(!this.phonenum){
            this.$messagebox.alert("手机号码不能为空")
          }else{
            this.show = true
            console.log(id)
            this.chooseid = id
            console.log(this.chooseid)
            this.chooseprice = price
            this.get_exchangePrice()
          }
          
        },


        // 油卡充值
        get_goods_list(){
          const url = '/Goods/get_goods_list'
          this.axios.post(url,{
            cat_id: 1,
            // token: localStorage.getItem('token')
          }).then(res=>{
            this.priceLise = res.data.data
              
            this.petroleumlist = this.priceLise.filter(item => item.charge_type === 2)
            this.petrifactionlist = this.priceLise.filter(item => item.charge_type === 1)
            console.log(this.priceLise)
            console.log(this.petroleumlist)
            console.log(this.petrifactionlist)

            
          })
        },



        // 请求数据
        get_refueling_card(){
          const url = '/Goods/refueling_card'
          this.axios.post(url,{
            goods_id: this.chooseid,
            game_userid: this.oilnumber,
            gasCardTel: this.phonenum,
            gasCardName: this.username,
            safe_password: this.value,
            // token: localStorage.getItem('token'),
          }).then(res=>{
            if(res.statu ==200){
              console.log('充值成功')
              this.$router.push('/clickreturn')
            }else {
              console.log('充值失败')
              // this.$route.push('/rechargeoil')
            }
          })
        },

        
        // 获取余额及汇率
        get_exchangePrice() {
          const url = '/Coin/exchangePrice'
          this.axios.post(url,{
            price: this.chooseprice,
            // token: localStorage.getItem('token')
          }).then(res=>{
            this.cnyprice = res.data.data.cnyPrice
            // this.lgcnum = res.data.data.lgcNum
            this.exchange_rate = res.data.data.lgc_price

            console.log(this.cnyprice)
            console.log(this.lgcnum)
            console.log(this.exchange_rate)
          })
        }


      }
    }

</script>
<style lang='scss' scoped>

  .recharge-oil {
    padding: 0 36px;
    background-color: #fff;
    height: 100%;
    header {
      text-align: center;
      position: relative;
      padding-top: 80px;
      img {
        position: absolute;
        top: 80px;
        left: 0;
        width: 21px;
      }
      p {
        font-size: 36px;
        font-weight: 600;
        line-height: 38px;
      }
    }

    .chooseCompany {
        margin-top: 80px;
        display: flex;
        justify-content: space-between;
        #petroleum,
        #petrifaction {
            display: none;
        }
        .petroleum,
        .petrifaction {
            width: 49%;
            img {
                max-width: 100%;
            }
        }
        .shadow {
          border-radius: 20px;
          box-shadow: 0px 20px 22px #d9e0e3;
        }
    }

    .inputbox {
      background-color: #0f394b;
      border-radius: 20px;
      padding: 36px;
      margin-top: 45px;
      box-shadow: 0px 20px 22px #d9e0e3;
      .number {
        font-size: 24px;
        color: #30d0a1;
        line-height: 30px;
      }
      .name {
        font-size: 20px;
        color: #30d0a1;
        margin-top: 20px;
      }
      .phonenum {
        font-size: 20px;
        color: #30d0a1;
        margin-top: 20px;
      }
      input {
        background-color: #0f394b;
        width: 100%;
        font-size: 36px;
        color: #fff;
        border-bottom: 1.5px solid #1d4556;
        padding-bottom: 20px;
        padding-top: 9px;
      }
      input::-webkit-input-placeholder {
        color: #798890;
      }

      input:-moz-placeholder {
        color: #798890;
      }

      input::-moz-placeholder {
        color: #798890;
      }

      input:-ms-input-placeholder {
        color: #798890;
      }
      .balance {
        font-size: 24px;
        line-height: 22px;
        color: #a6afb4;
        margin-top: 18px;
      }
    }


    .choosePrice {
      margin-top: 45px;

      .pricelist {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
        
        li {
          border-radius: 13px;
          text-align: center;
          width: 141px;
          height: 85px;
          align-items: center;
          line-height: 85px;
          font-size: 28px;
          margin-bottom: 30px;
          color: #cbccce;
          border: 2.5px solid #e8eaec;
          span {
            font-size: 17px;
            align-items: center;
            color: #cbccce;
          }
        }
        li+li{
          margin-left:30px;
        }
        li:nth-child(5),
        li:nth-child(9){
          margin-left:0;
        }
      }

      .pricelist.active {
        li {
          border: 2.5px solid #30d0a1;
        }
        li,span {
          color: #30d0a1;
        }
      }
    }

    .carefulTip {
        margin-top: 30px;
        p.title {
            font-size: 22px;
            color: #0f394b;
            margin-bottom: 10px;
        }
        p {
            font-size: 18px;
            line-height: 32px;
            color: #a5aeb3;
        }
        p:last-child {
          padding-bottom: 30px;
        }
    }


 .content {
      padding: 36px;
      .details {
        text-align: center;
        line-height: normal;
        position: relative;
  
        img {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .payinfo {
          font-size: 30px;
          color: #011321;
          line-height: 34px;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
        }

        .title {
          padding-top: 78px;
          font-size: 46px;
          line-height: 46px;
          .type {
            transform: translateX(15px);
            font-size: 17px;
            display: inline-block;
            line-height: 17px;
          }
        }
        .introduce {
          font-size: 18px;
          line-height: 18px;
          color: #a3a6a8;
          margin-top: 30px;
        }

        .lgc {
          margin-top: 58px;
          .lgc1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 44px;
          }
          .left {
            font-size: 30px;
            line-height: 30px;
            color: #a3a6a8;
          }
          .right {
            font-size: 24px;
            color: #011321;
          }
        }

        .release {
          padding-top: 30px;
          button {
            background-color: #30d0a1;
            color: #ffffff;
            border-radius: 15px;
          }
        }
      }
    }

// 复制来的密码
    .popup{
      width:80%;
      height:450px;
      z-index:2100;
      position: fixed;
      top:20%;
      left:10%;
      // margin-top:-250px;
      background-color:#fff;
      border-radius:20px;
      padding-top:40px;
      box-sizing: border-box;
      text-align: center;
      box-shadow: 0px 20px 40px #000;
      .head {
        position: relative;
        .close {
          width: 40px;
          position: absolute;
          left: 50px;
        }
        span {
          color:#041b29;
          font-size: 34px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      
      p {
        margin-top: 40px;
        span:first-child{
          font-size: 46px;
          font-weight: 500;
        }
        span:last-child{
          font-size: 17px;
          color:#001420;
        }
      }
      .error{
        color:#f55c57;
        font-size: 22px;
        margin:15px 0;
      }
      .find_pwd{
        color:#32d1a2;
        font-size: 22px;
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
  

  }

</style>
