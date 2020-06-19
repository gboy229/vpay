<template>
    <div class="tx-wrap">
        <div class="wrap">
            <div class="header">
                <img src="../../assets/images/back.png" alt="" @click="$router.go(-1)">
                <span>购买订单</span>
            </div>
            <p class="p1">实时价格</p>
            <p class="p2">≈0.9527</p>
            <p class="p3">CNY/LGC</p>
        </div>
        <div class="order-details">
            <div class="content">
                <p class="title">参考指数 (0.9527)</p>
                <div class="inputbox">
                    <input type="text" placeholder="请输入单价" class="input">
                    <span class="type">CNY</span>
                </div>
            </div>
            <div class="content">
                <p class="title">数量</p>
                <div class="inputbox">
                    <input type="number" placeholder="请输入交易数量" class="input">
                    <span class="type">LGC</span>
                </div>
            </div>
            <div class="content">
                <p class="title">请选择交易方式</p>
                <div class="paytype">
                    <div class="alipay" @click="chooseA">
                        <label for="alipayicon"><img src="../../assets/images/alipay1.png" alt="" class="icon"></label>
                        <input type="checkbox" v-model="checked[0]" id="alipayicon">
                    </div>
                    <div class="wechat" @click="chooseW">
                        <label for="wechaticon"><img src="../../assets/images/wechat1.png" alt="" class="icon"></label>
                        <input type="checkbox" v-model="checked[1]" id="wechaticon">
                    </div>
                </div>
            </div>
            <div class="release">
                <van-button type="primary" block>发布订单</van-button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
        checked: [false,true]
    };
  },
  methods: {
      chooseA() {
        this.checked[0] = !this.checked[0]
      },
      chooseW() {
        this.checked[1] = !this.checked[1]
      }
  }
};
</script>
<style lang='scss' scoped>
    .tx-wrap {
        font-family: PingFangSC;
        .wrap {
            width: 100%;
            height: auto;
            background: rgba(15, 57, 75, 1);
            border-radius: 0px 0px 45px 45px;
            text-align: center;
            padding-bottom: 44px;

            .header {
                text-align: center;
                position: relative;
                height: 66px;
                padding-top: 82px;

                img {
                width: 16px;
                height: 30px;
                position: absolute;
                top: 100px;
                left: 36px;
                }

                span {
                font-size: 30px;
                font-family: PingFangSC;
                font-weight: 500;
                color: rgba(48, 208, 161, 1);
                line-height: 66px;
                }
            }

            .p1 {
                font-size: 24px;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                padding-top: 45px;
                line-height: 24px;
            }

            .p2 {
                font-size: 46px;
                color: rgba(255, 255, 255, 1);
                padding-top: 40px;
                line-height: 46px;
            }
            .p3 {
                font-size: 24px;
                color: rgba(255, 255, 255, .5);
                padding-top: 20px;
                line-height: 24px;
            }
        
        }

        .order-details {
            padding: 0 36px;
            .content {
                margin-top: 42px;

                .title {
                    font-size: 21px;
                    line-height: 25px;
                    color: #30d0a1;
                }
                .inputbox {
                    padding: 25px 0;
                    border-bottom: 1.5px solid #0a393b;
                    .input {
                        background-color: transparent;
                        color: #fff;
                        width: 90%;
                    }
                    .type {
                        float: right;
                        font-size: 24px;
                        color: #fff;
                    }
                }
                .paytype {
                    margin-top: 26px;
                    display: flex;
                    .alipay,.wechat {
                        margin-right: 75px;
                        .icon {
                            width: 73px;
                            height: 73px;
                            margin-right: 25px;
                        }
                        i {
                            color: yellow;
                            img {
                                width: 36px;
                                height: 36px;
                            }
                        }
                    }



                    

                    input[type=checkbox]{
                        appearance:none;
                        -moz-appearance:none; /* Firefox */
                        -webkit-appearance:none;
                        //visibility: hidden;
                        cursor: pointer;
                        margin:0;
                        width: 36px;
                        height: 36px;
                        background-size: contain;
                    }


                    input[type=checkbox]{
                        background-image:url(../../assets/images/uncheck1.png);
                    }
                    input[type=checkbox]:checked{
                        background-image:url(../../assets/images/oncheck1.png);
                    }
                    
                }
            }

            .release {
                margin-top: 73px;

                button {
                    background-color: #30d0a1;
                    border-radius: 20px;
                    font-size: 30px;
                }
            }
        }
    }
</style>