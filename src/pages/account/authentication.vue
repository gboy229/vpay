
<template>
  <div class='authentication-wrap'>
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span v-if="!isRealName">实名认证</span>
    </header>
    <img src="../../assets/images/rzxx.png" alt="" class="tit" v-if="isRealName">

    <ul class="authentication-ul" v-if="isRealName">
      <li>
        <span>真实姓名</span>
        <p>{{ realNameInfo.realname }}</p>
      </li>
      <!--<li>
        <span>性别</span>
        <p>男</p>
      </li>-->
      <li>
        <span>国籍（区域）</span>
        <p>中国大陆</p>
      </li>
    </ul>

    <ul class="authentication-ul" v-if="isRealName">
      <li>
        <span>证件类型</span>
        <p>身份证</p>
      </li>
      <li>
        <span>证件号码</span>
        <p>{{ realNameInfo.id_card }}</p>
      </li>
      <!--<li>
        <span>证件有效期</span>
        <p>蓝忘机</p>
      </li>-->
    </ul>

    <div class="ev-container" v-if="!isRealName" >
      <form class="ev-form">
        <div class="ev-form-group">
          <label for="">真实姓名</label>
          <input type="text" placeholder="请填写本人的真实姓名" v-model="formData.realname">
        </div>
        <!--<div class="ev-form-group">
          <label for="">性别</label>
          <input type="text" placeholder="请选择性别" :value="value.sex" readonly @click="showPicker.sex = true">
          <span class="ev-icon">
            <van-icon name="arrow" :style="arrowStyle" />
          </span>
        </div>-->
        <div class="ev-form-group">
          <label for="">国籍（区域）</label>
          <input type="text" placeholder="请选择国籍" :value="value.country" readonly @click="showPicker.country = true">
          <span class="ev-icon">
            <van-icon name="arrow" :style="arrowStyle" />
          </span>
        </div>
        <div class="ev-form-group">
          <label for="">证件类型</label>
          <input type="text" placeholder="请选择证件类型" :value="value.idCard" readonly @click="showPicker.idCard = true">
          <span class="ev-icon">
            <van-icon name="arrow" :style="arrowStyle" />
          </span>
        </div>
        <div class="ev-form-group">
          <label for="">身份证号</label>
          <input type="text" placeholder="请填写本人身份证号" v-model="formData.idcard">
        </div>
        <div class="ev-form-group">
          <button type="button" class="ev-button ev-button-primary ev-button-block" @click="submit">提交</button>
        </div>
      </form>

      Popup 弹出层 -- 选择性别
      <van-popup v-model="showPicker.sex" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.sex"
          @confirm="onConfirmSex"
          @cancel="showPicker.sex = false"
        />
      </van-popup>

      Popup 弹出层 -- 选择国籍
      <van-popup v-model="showPicker.country" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.country"
          @confirm="onConfirmCountry"
          @cancel="showPicker.country = false"
        />
      </van-popup>

      Popup 弹出层 -- 证件类型
      <van-popup v-model="showPicker.idCard" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.idCard"
          @confirm="onConfirmIdCard"
          @cancel="showPicker.idCard = false"
        />
      </van-popup>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 是否实名认证
        isRealName: true,

        formData: {
          realname: '',
          idcard: '',
        },
        arrowStyle: {
          color: '#30d0a1'
        },
        value: {
          sex: '',
          country: '',
          idCard: '',
        },
        columns: {
          sex: ['男', '女'],
          country: ['中国大陆'],
          idCard: ['居民身份证']
        },
        showPicker: {
          sex: false,
          country: false,
          idCard: false
        },
        realNameInfo: [],  // 实名认证信息
      }
    },
    created() {
      // 获取实名认证信息
      this.getRealNameInfo();
    },
    methods: {

      // 弹层选择性别
      onConfirmSex(value) {
        this.value.sex = value;
        this.showPicker.sex = false;
        return false;
        // console.log(this.value.sex)
      },

      // 弹层选择国籍
      onConfirmCountry(value) {
        this.value.country = value;
        console.log(this.value.country);
        this.showPicker.country = false;
        return false;
      },

      // 弹层选择证件类型
      onConfirmIdCard(value) {
        this.value.idCard = value;
        this.showPicker.idCard = false;
        // console.log(this.value.idCard);
        return false;
        
      },

      // 提交实名认证
      submit() {
        if(!this.formData.realname || !this.value.country || !this.value.idCard || !this.formData.idcard){
          this.$messagebox.alert("信息不能为空")
        }else{
          let _self = this;
          this.axios.post('/User/realName', {
          realname: this.formData.realname,
          idcard: this.formData.idcard,
          token: localStorage.getItem('token'),
          }).then(function (res) {
            var _status = res.data.status;
            var _msg = res.data.message;
            if (_status === 200) {
              _self.$messagebox.alert(_msg).then(action=> {
              window.location.reload();
            });
          } else if (_status === 400) {
            _self.$messagebox.alert(_msg);
          }
        }).catch(function (error) {
          console.log(error);
        })
        }
        
      },

      // 获取实名认证信息
      getRealNameInfo() {
        let _seft = this;
        this.axios.post('/User/getRealName', {
          token: localStorage.getItem('token'),
        }).then(function (res) {
          var _status = res.data.status;
          var _msg = res.data.message;
          if (_status === 200) {
            // 已实名认证
            _seft.realNameInfo = res.data.data;
          } else if (_status === 400) {
            // 未实名认证
            _seft.isRealName = false;
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }

</script>
<style lang='scss' scoped>
  .authentication-wrap {
    header {
      text-align: center;
      position: relative;
      padding-top: 66px;
      margin-bottom: 46px;

      img {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }

      span {
        font-size: 36px;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }
    }

    .tit {
      width: 178px;
      height: 42px;
      margin: 0 0 60px 60px;
    }

    .input-wrap {
      width: 620px;
      border-bottom: 1px solid #30D0A1;
      margin: 0 auto;
      font-weight: 400;
      margin-bottom: 44px;

      p {
        font-size: 24px;
        color: rgba(48, 208, 161, 1);
      }

      .input-box {
        display: flex;
        justify-content: flex-start;
        padding: 26px 0;

        input {
          font-size: 36px;
          background-color: #011321;
          caret-color: rgba(48, 208, 161, 1);
          color: #fff;
        }

        input::-webkit-input-placeholder {
          font-weight: 400;
          color: rgba(255, 255, 255, .3);
        }

        span {
          font-size: 26px;
          color: rgba(255, 255, 255, 1);
        }

        img {
          width: 12px;
          height: 20px;
          padding-right: 36px;
        }
      }
    }

    .authentication-ul {
      border-top: 1px solid #16575C;
      border-bottom: 1px solid #16575C;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 30px;

      li {
        width: 686px;
        height: 84px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        font-family: PingFangSC, sans-serif;
        font-weight: 400;
        color: rgba(48, 208, 161, 1);

        p {
          padding-right: 36px;
          font-size: 26px;
          font-weight: 400;
          color: rgba(255, 255, 255, .3);
        }
      }

      li {
        border-bottom: 1px solid #16575C;
      }

      li:last-of-type {
          border-bottom: 0;
      }
    }

    .ev-container {
      margin-left: 60px;
      margin-right: 60px;

      .ev-form {

        .ev-form-group {
          position: relative;
          margin-bottom: 30px;

          label {
            display: inline-block;
            margin-bottom: 15px;
            font-weight: 400;
            color: #30d0a1;
            font-size:26px;
          }

          input {
            display: block;
            width: 100%;
            padding: .8em 0;
            font-size: 36px;
            line-height: 1.2;
            color: #555;
            vertical-align: middle;
            background-color: transparent;
            background-image: none;
            border-bottom: 1px solid rgba(10, 57, 59, .5);
            border-radius: 0;
            -webkit-appearance: none;
            -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            color:#fff;
          }

          input::-webkit-input-placeholder {
            font-weight: 400;
            opacity: 0.7;
          }

          .ev-icon {
            position: absolute;
            left: auto;
            top: calc(50% + 1em);
            display: block;
            margin-top: -.5em;
            line-height: 1;
            z-index: 2;
            right: .8em;
          }

          .ev-button {
            display: inline-block;
            margin-bottom: 0;
            padding: .5em 1em;
            font-size: 32px;
            font-weight: 400;
            line-height: 1.2;
            text-align: center;
            white-space: nowrap;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 0;
            cursor: pointer;
            outline: 0;
            -webkit-appearance: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-transition: background-color .3s ease-out,border-color .3s ease-out;
            transition: background-color .3s ease-out,border-color .3s ease-out;
          }

          .ev-button-primary {
            color: #fff;
            background-color: #30d0a1;
            border-color: #30d0a1;
            border-radius: 20px;;
          }

          .ev-button-block {
            display: block;
            width: 100%;
            padding-left: 0;
            padding-right: 0;
          }

        }
      }
    }

  }

</style>

<style>
  .van-popup {
    /* background-color: #0f394b; */
    border-radius: 40px 40px 0 0 !important;
  }
  
  
  .van-picker__confirm {
    color: #30d0a1;
    
  }
  .van-picker__cancel:active, .van-picker__confirm:active {
    background-color: #0f394b;
  }
  .van-picker__mask {
    background-image: none;
  }
  [class*=van-hairline]::after {
    border: 0 solid #16575c;
  }
  .van-hairline--top-bottom::after {
    border-width: 0 0;
  }
  .van-hairline-unset--top-bottom::after {
    border-width: 1px 0;
  }
  .van-picker-column__item.van-picker-column__item--selected {
    color: #fff;
  }
  .van-picker-column__item {
    color: rgba(255, 255, 255, .3);
  }
  .van-ellipsis{
    color:#011321 !important;
  }
</style>
