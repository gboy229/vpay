<!-- 用户详情 2020.6.6 -->
<template>
  <div class="user-boss">
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <span>个人资料</span>
    </header>
    <div class="head-container" @click="showAvatar = true">
      <img :src="img_head" alt="个人头像" >
      <span> <h5>编辑</h5> </span>
    </div>
    <ul class="user-ul">
      <li>
        <span>昵称</span>
        <p class="user-id"><span>{{ userInfo.username }}</span></p>
      </li>
      <!--<router-link to='/account/editNickname' tag='li'>
        <span>昵称</span>
        <p class="user-name"><span>{{ userInfo.username }}</span> <img src="../../assets/images/right.png" alt=""></p>
      </router-link>-->
      <!--<router-link to='/account/telNum' tag='li'>
        <span>ID</span>
        <p class="user-id">123456</p>
      </router-link>-->
      <li>
        <span>ID</span>
        <p class="user-id">{{ userInfo.mobile }}</p>
      </li>
    </ul>
    <!--<ul class="user-ul-bottom" @click="show = true">
    <ul class="user-ul-bottom">
      <h5 class="gender">性别</h5>
      <p>
        <img src="../../assets/images/right.png" alt="">
      </p>
    </ul>
    <div class="btn">保存</div>-->

    <!--编辑头像-->
    <van-action-sheet
      v-model="showAvatar"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    >
      <van-uploader :after-read="onRead2">
        <van-button type="primary">从手机上传</van-button>
      </van-uploader>
    </van-action-sheet>

    <!--Popup 弹出层 &#45;&#45; 证件类型-->
    <!--<van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>-->

    <!--<div>
      <van-action-sheet v-model="show" :style="{ backgroundColor: '#0F394B'}">
        <div style="display: flex;padding: 15px 20px;font-size: 16px;">
          <div style="flex: auto;color: rgba(255, 255, 255, .4);text-align: left;">取消</div>
          <div style="flex: auto;color: rgba(48, 208, 161, 1);text-align: right;">保存</div>
        </div>
        <ul style="margin: 50px 0;">
          <li style="border-top: 1px solid #16575c;font-size: 14px;color: #ffffff;text-align: center;padding: 10px 0;">男</li>
          <li style="border-top: 1px solid #16575c;font-size: 14px;color: #577581;text-align: center;padding: 10px 0;">女</li>
        </ul>
      </van-action-sheet>
    </div>-->


  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        showAvatar: false,
        // actions: [{ name: '从手机上传' }, { name: '拍照' }],
        /*actions: [{ name: '从手机上传' }],*/
        actions: [],
        value: '',
        columns: ['男', '女'],
        showPicker: false,
        userInfo: [],
        img_head: localStorage.getItem('img_head') || require('../../assets/images/user.png'),
      }
    },
    created() {

    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    methods: {
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
        return false;
      },
      onSelect(action, index) {
        console.log(action);
        console.log(index);
      },
      // 上传头像
      onRead2(file) {
        let that = this;
        let data = new FormData();
        let content = file.file;
        data.append('head_img', content);

        this.axios.post('/User/updateHeadImg', data, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res) => {
            let _status = res.data.status;
            let _message = res.data.message;
            if (_status === 200) {
              that.$messagebox.alert(_message).then(action=> {
                that.$router.replace('/account')
              })
            } else {
              that.$messagebox.alert(_message)
            }

            console.log(res);
            console.log(_status);
            console.log(_message);
          })
      },

    }
  }

</script>
<style lang='scss' scoped>
  .user-boss{
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    header{
      text-align: center;
      position: relative;
      height: 66px;
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
        font-size: 30px;
        font-family: PingFangSC, sans-serif;
        font-weight: 500;
        color: rgba(48, 208, 161, 1);
        line-height: 66px;
      }


    }
    .head-container{
      position: relative;
      img{
        width: 150px;
        height: 150px;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }
      span{
        position: absolute;
        bottom: -20px;
        right:301px;
        display: block;
        width: 150px;
        height: 70px;
        line-height: 45px;
        font-size: 20px;
        text-align: center;
        margin: 0 auto;
        background-color: #011321;
        opacity:0.5;
        h5{
          color:#ffffff;
        }
      }
    }
    .user-ul {
      font-family: PingFangSC, sans-serif;
      border-top: 1px solid #16575C;
      border-bottom: 1px solid #16575C;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 40px;
      span{
        color: rgba(48, 208, 161, 1);
        font-size: 36px;
        font-weight: 400;
      }
      .user-name span{
        color: #4e5a64;
        vertical-align: middle;
      }
      .user-id{
        color: #4e5a64;
        padding-right: 36px;
      }
      li {
        width: 686px;
        height: 84px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        font-weight: 400;
        color: rgba(48, 208, 161, 1);
        img {
          width: 12px;
          height: 20px;
          padding-right: 36px;
          padding-left: 30px;
        }
      }
      img {
        width: 12px;
        height: 20px;
        padding-right: 36px;
      }
      li:nth-of-type(1) {
        border-bottom: 1px solid #16575C;
      }
    }
    .user-ul-bottom{
      font-family: PingFangSC, sans-serif;
      border-top: 1px solid #16575C;
      border-bottom: 1px solid #16575C;
      height: 84px;
      /*display: flex;*/
      /*flex-direction: column;*/
      /*align-items: flex-end;*/
      margin-top: 40px;
      .gender{
        display: inline-block;
        color: rgba(48, 208, 161, 1);
        font-size: 30px;
        font-weight: 400;
        position: relative;
        top: 20px;
        left: 60px;
      }
      p{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        /*span{*/
        /*  display: block;*/
        /*  color: rgba(48, 208, 161, 1);*/
        /*  font-size: 30px;*/
        /*  font-weight: 400;*/
        /*}*/
        img {
          width: 12px;
          height: 20px;
          padding-right: 36px;
          padding-left: 30px;
          padding-bottom: 10px;

        }
      }
    }

    .btn {
      width: 620px;
      height: 84px;
      background: rgba(48, 208, 161, 1);
      border-radius: 24px;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 78px;
      text-align: center;
      margin: 130px auto;
    }
  }
</style>

<style>
  .van-action-sheet__content {
    text-align: center;
  }
  .van-action-sheet,
  .van-action-sheet__gap {
    background-color: transparent;
  }
  .van-action-sheet__item,
  .van-action-sheet__cancel {
    width: 620px;
    height: 84px;
    margin: 16px auto;
    font-size: 30px;
    border-radius: 24px;
    color: rgba(255, 255, 255, 1);
    background-color: #30d0a1;
  }
  .van-button {
    width: 8.266667rem;
    height: 1.12rem;
    margin: 0.213333rem auto;
    font-size: 0.4rem;
    border-radius: 0.32rem;
    color: rgba(255, 255, 255, 1);
    background-color: #30d0a1;
  }
</style>
