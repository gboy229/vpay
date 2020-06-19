<!--  -->
<template>
  <div class="oct-wrap">
    <div class="tabs-wrap">
      <button :class="{'active':active=='buy'}" @click="toggleClass">购买</button>
      <button :class="{'active':active=='sell'}" @click="toggleClass">出售</button>
    </div>
    <div class="transaction" v-if="active=='buy'">
      <div class="inner">
        <p class="now">
          当前 USDT 价格:
          <span style="color:#30d0a1">{{buyprice}}</span>
        </p>
        <div class="udst">
          <div class="title">数量 UDST</div>
          <div class="inputbox">
            <input
              type="number"
              placeholder="请输入购买数量"
              @keyup="upload"
              v-model="number"
              class="transactioninput"
            />
            <button @click="showPopup">立即购买</button>
          </div>
        </div>
        <div class="transactionabout">≈{{getBuySum}}CNY</div>
      </div>
    </div>
    <div class="transaction" v-if="active=='sell'">
      <div class="inner">
        <p class="now">
          当前 USDT 价格:
          <span style="color:#30d0a1">{{sellprice}}</span>
        </p>
        <div class="udst">
          <div class="title">数量 UDST</div>
          <div class="inputbox">
            <input
              type="number"
              placeholder="请输入出售数量"
              @keyup="upload"
              v-model="number"
              class="transactioninput"
            />
            <button @click="showPopup1">立即出售</button>
          </div>
        </div>
        <div class="transactionabout">≈{{getSellSum}}CNY</div>
      </div>
    </div>
    <div class="paynote">
      <div class="img">
        <img src="../assets/images/paynote.png" alt />
      </div>
      <ul class="paylist" v-if="active == 'buy'">
        <li @click="orderDetails(item.orderno)" v-for="(item,index) in buylist" :key="index">
          <div class="left">
            <p class="listnumber">{{item.orderno}}</p>
            <p class="listdate">{{item.time}}</p>
          </div>
          <div class="right">
            <div class="result">{{item.status_name}}</div>
            <i>
              <img src="../assets/images/right.png" alt />
            </i>
          </div>
        </li>
      </ul>
      <ul class="paylist" v-if="active == 'sell'">
        <li @click="orderDetails(item.orderno)" v-for="(item,index) in selllist" :key="index">
          <div class="left">
            <p class="listnumber">{{item.orderno}}</p>
            <p class="listdate">{{item.time}}</p>
          </div>
          <div class="right">
            <div class="result">{{item.status_name}}</div>
            <i>
              <img src="../assets/images/right.png" alt />
            </i>
          </div>
        </li>
      </ul>
    </div>

    <div class="popup" v-show="show">
      <img src="../assets/images/close_black.png" alt class="close" @click="hidePopup" />
      <span>请输入交易密码</span>
      <p class="error">{{errorInfo}}</p>
      <div class="shade" v-show="show_shade"></div>
      <!-- vant密码组件 -->
      <van-password-input
        :value="safe_password"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- vant键盘组件 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
      <p class="find_pwd" @click="$router.push('/account/forgetPayPass')">找回密码并交易</p>
    </div>

    <oct-footer current="2"></oct-footer>
  </div>
</template>

<script>
import octFooter from "@/components/footer";
import octBuy from "@/components/buy-oct";
import octSale from "@/components/sale-oct";

export default {
  data() {
    return {
      active: "buy", // 切换状态
      number: "", // 数量
      orderlistB: [], // 购买完整订单数据
      orderlistS: [], // 出售完整订单数据

      buylist: [], // 购买记录
      selllist: [], // 出售记录

      buyprice: 0, // 购买价格
      sellprice: 0, // 出售价格

      show: false, // 输入框
      show_shade: false,
      showKeyboard: false,
      safe_password: "", //	操作密码
      errorInfo: "", // 错误提示信息
      count: 0,

      cancel_num: 0, // 取消次数
      buy_ordering: "", // 购买订单
      sell_ordering: "" // 出售订单
    };
  },
  components: {
    octFooter,
    octBuy,
    octSale
  },
  created() {
    this.get_coin_order_list();
    this.query_price();
    this.query_user();
    // this.getCoinAllOrderB()
    // this.getCoinAllOrderS()
  },
  methods: {
    toggleClass() {
      if (this.active == "buy") {
        this.active = "sell";
        this.number = "";
      } else {
        this.active = "buy";
        this.number = "";
      }
    },

    // 键盘变色功能~
    upload() {
      if (this.number.length > 0) {
        document.querySelector(".transactioninput").classList.add("active");
        document.querySelector(".transactionabout").classList.add("active");
      } else {
        document.querySelector(".transactioninput").classList.remove("active");
        document.querySelector(".transactionabout").classList.remove("active");
      }
    },

    // 查看订单详情
    orderDetails(orderno) {
      this.$router.push({
        path: "/business/paydetails/",
        query: {
          id: orderno
        }
      });
    },

    // 获取订单数据
    get_coin_order_list() {
      const url = "/Coin/get_coin_order_list";
      this.axios.post(url, {}).then(res => {
        this.buylist = res.data.data.buy.list;
        this.selllist = res.data.data.sell.list;
      });
    },

    // 获取ustd当前买卖价格
    query_price() {
      const url = "/Coin/query_price";
      this.axios.post(url, {}).then(res => {
        this.buyprice = res.data.data.price.buyPrice;
        this.sellprice = res.data.data.price.sellPrice;
      });
    },

    query_user() {
      const url = "/Coin/query_user";
      this.axios.post(url, {}).then(res => {
        console.log(res);
        this.cancel_num = res.data.data.cancel_num;
        this.buy_ordering = res.data.data.buy_ordering;
        this.sell_ordering = res.data.data.sell_ordering;
      });
    },

    // 获取完整购买订单数据
    // getCoinAllOrderB() {
    //   const url = '/Coin/getCoinAllOrder'
    //   this.axios.post(url,{
    //     type: 'buy',
    //     page: 1
    //   }).then(res=>{
    //     this.orderlistB = res.data.data.list
    //   })
    // },
    // // 获取完整出售订单数据
    // getCoinAllOrderS() {
    //   const url = '/Coin/getCoinAllOrder'
    //   this.axios.post(url,{
    //     type: 'sell',
    //     page: 1
    //   }).then(res=>{
    //     this.orderlistS = res.data.data.list
    //   })
    // }

    //
    showPopup() {
      if (this.buy_ordering) {
        this.$messagebox.alert("有正在交易中的订单");
        return;
      }
      if (this.sell_ordering) {
        this.$messagebox.alert("有正在交易中的订单");
        return;
      }
      if (this.number == "") return;
      if (this.cancel_num > 4) {
        this.$messagebox.alert("取消订单次数过多,限制交易");
        return;
      }
      if (!localStorage.getItem("isSetPaypass")) {
        this.$messagebox.alert("请设置交易密码").then(action => {
          this.$router.push("account/setPayPass");
        });
      } else {
        this.show = true;
      }
    },
    showPopup1() {
      if (this.sell_ordering) {
        this.$messagebox.alert("有正在交易中的订单");
        return;
      }
      if (this.number == "") return;
      if (this.cancel_num > 4) {
        this.$messagebox.alert("取消订单次数过多,限制交易");
        return;
      }
      if (!localStorage.getItem("isSetPaypass")) {
        this.$messagebox.alert("请设置交易密码").then(action => {
          this.$router.push("account/setPayPass");
        });
      } else {
        this.show = true;
      }
    },

    hidePopup() {
      this.show = false;
      this.Keyboard = false;
      this.safe_password = ""
    },
    onInput(key) {
      this.safe_password = (this.safe_password + key).slice(0, 6);
      if (this.active == "buy") {
        const url = "/Coin/buy_coin";
        if (this.safe_password.length === 6) {
          this.axios
            .post(url, {
              coin_amount: this.number,
              safe_password: this.safe_password
            })
            .then(res => {
              let status = res.data.status;
              if (status == 304) {
                //密码错误清空密码
                this.safe_password = "";
                this.count++;
                if (this.count == 1) {
                  this.errorInfo = "密码不正确，请重新输入";
                } else if (this.count > 1 && this.count < 5) {
                  this.errorInfo = `密码不正确，您还有${5 - this.count}次机会`;
                } else {
                  this.errorInfo = "您的输入机会已用完，请找回交易密码";
                  this.showKeyboard = false;
                  this.show_shade = true;
                }
              } else if (status == 200) {
                // console.log(res.data.data)
                const div = document.createElement("div");
                div.innerHTML = res.data.data;
                document.body.appendChild(div);
                document.forms[0].submit();
              }
            });
        } 
      }else if(this.active == "sell"){
          const url = "/Coin/sell_coin";
          if (this.safe_password.length === 6) {
            this.axios.post(url, {
              coin_amount: this.number,
              safe_password: this.safe_password
            })
            .then(res => {
              let status = res.data.status;
              if (status == 304) {
                //密码错误清空密码
                this.safe_password = "";
                this.count++;
                if (this.count == 1) {
                  this.errorInfo = "密码不正确，请重新输入";
                } else if (this.count > 1 && this.count < 5) {
                  this.errorInfo = `密码不正确，您还有${5 -
                    this.count}次机会`;
                } else {
                  this.errorInfo = "您的输入机会已用完，请找回交易密码";
                  this.showKeyboard = false;
                  this.show_shade = true;
                }
              } else if(status == 400){
                this.$messagebox.alert(res.data.message)
                this.show_shade = false
                this.showKeyboard = false
                this.show = false
              } else if(status == 200) {
                location.href = res.data.data.link
              }
            });
          }
        }
    },
    onDelete() {
      this.safe_password = this.safe_password.slice(
        0,
        this.safe_password.length - 1
      );
    }
  },
  computed: {
    getBuySum() {
      return (this.number * this.buyprice).toFixed(4);
    },
    getSellSum() {
      return (this.number * this.sellprice).toFixed(4);
    }
  }
};
</script>
<style lang='scss' scoped>
.oct-wrap {
  padding: 0 36px;
  .tabs-wrap {
    display: flex;
    margin-top: 108px;
    button {
      flex: 1;
      height: 60px;
      font-size: 24px;
      border: 3px solid #30d0a1;
      background-color: transparent;
      color: #30d0a1;
    }
    button:first-child {
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    button:last-child {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    button.active {
      background-color: #30d0a1;
      color: #fff;
    }
  }

  .transaction {
    height: 263px;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 57px;
    padding: 36px;
    .now {
      font-size: 26px;
      color: #011321;
    }
    .udst {
      margin-top: 36px;
      .title {
        color: #30d0a1;
        font-size: 26px;
      }
      .inputbox {
        position: relative;
        input {
          height: 84px;
          border-bottom: 1.5px solid #f0f1f2;
          width: 100%;
          font-size: 30px;
          color: #011321;
        }
        input.active {
          border-bottom: 1.5px solid #30d0a1;
        }

        input::-webkit-input-placeholder {
          color: #cbccce;
        }
        input:-moz-placeholder {
          color: #cbccce;
        }

        input::-moz-placeholder {
          color: #cbccce;
        }

        input:-ms-input-placeholder {
          color: #cbccce;
        }

        button {
          position: absolute;
          width: 180px;
          height: 60px;
          background-color: #30d0a1;
          text-align: center;
          font-size: 24px;
          right: 0;
          color: #fff;
          border-radius: 30px;
          top: 10px;
        }
      }
    }
    .transactionabout {
      margin-top: 20px;
      font-size: 26px;
      color: #cbccce;
    }
    .transactionabout.active {
      color: #30d0a1;
    }
  }

  .paynote {
    margin-top: 60px;
    margin-bottom: 150px;
    .img {
      img {
        width: 194px;
      }
    }
  }

  .paylist {
    li {
      height: 118px;
      border-bottom: 1.5px solid #0a393b;
      .left {
        float: left;
        margin-top: 26px;
        .listnumber {
          font-size: 28px;
          color: #fff;
        }
        .listdate {
          font-size: 24px;
          color: #a4a7a9;
        }
      }
      .right {
        float: right;
        margin-top: 40px;
        .result {
          font-size: 28px;
          color: #fff;
          float: left;
        }
        i {
          float: right;
          padding-left: 30px;
          padding-top: 2px;
          img {
            width: 16px;
          }
        }
      }
    }
  }

  .popup {
    width: 80%;
    height: 320px;
    z-index: 2100;
    position: fixed;
    top: 20%;
    left: 10%;
    background-color: #fff;
    border-radius: 20px;
    padding-top: 40px;
    box-sizing: border-box;
    box-shadow: 0px 20px 40px #000;
    text-align: center;
    .close {
      width: 40px;
      position: absolute;
      top: 40px;
      left: 50px;
    }
    span {
      color: #041b29;
      font-size: 34px;
    }
    p {
      span:first-child {
        font-size: 38px;
        font-weight: 600;
      }
      span:last-child {
        font-size: 80px;
        color: #011321;
        font-weight: 600;
      }
    }
    .error {
      color: #f55c57;
      margin: 15px 0;
    }
    .find_pwd {
      color: #32d1a2;
      margin: 18px 0;
    }
    .shade {
      width: 100%;
      height: 120px;
      background-color: transparent;
      z-index: 2200;
      position: absolute;
      top: 60%;
    }
  }
}
</style>
