<template>
  <div class="team-wrap">
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
      <router-link to="/account/teamList" class="header-item-right" tag="div">会员列表</router-link>
    </header>
    <div class="info">
      <div class="top">
        <img :src="img_head" alt="">
        <span>{{ userInfo.username }}</span>
      </div>
      <div class="bottom">
        <div class="box1 mg">ID:{{ userInfo.mobile }}</div>
        <div class="box2 mg">{{ userInfo.vip_grade_name }}</div>
        <div class="box3 mg">L{{ userInfo.market_grade }}</div>
      </div>
      <div class="info-bottom">
        <div class="info-bottom-item">
          总业绩<br><span>{{ teamInfo.achievement }}</span>
        </div>
        <div class="info-bottom-item">
          新增业绩<br><span>{{ teamInfo.achievement }}</span>
        </div>
        <div class="info-bottom-item">
          总人数<br><span>{{ teamInfo.number }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item,index) of member_list" :key = "index">
        <div class="content-item-left">
          <img src="../../assets/images/mllq.png" alt="">
          <div class="user-info">
            <h1>{{item.username}}</h1>
            <p>
              <span>{{item.vip_name}}</span>
              <span>L{{item.vip_grade}}</span>
            </p>
          </div>
        </div>
        <div class="content-item-right">${{item.financial_num}}</div>
      </div>
      <!-- <div class="content-item">
        <div class="content-item-left">
          <img src="../../assets/images/mllq.png" alt="">
          <div class="user-info">
            <h1>白日梦想家</h1>
            <p>
              <span>认证会员</span>
              <span>L1</span>
            </p>
          </div>
        </div>
        <div class="content-item-right">$0.50</div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <img src="../../assets/images/mllq.png" alt="">
          <div class="user-info">
            <h1>白日梦想家</h1>
            <p>
              <span>认证会员</span>
              <span>L1</span>
            </p>
          </div>
        </div>
        <div class="content-item-right">$0.50</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
    export default {
      name: "team",
      data() {
        return {
          userInfo: [],
          teamInfo: [],
          member_list:[]
        }
      },
      mounted() {
        // 获取会员信息
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // 获取会员团队
        this.getUserTeamList();
        
      },
      methods: {
        getUserTeamList() {
          this.axios.post('/User/myTeam', {
            token: localStorage.getItem('token'),
          }).then(res=> {
            let _status = res.data.status;
            let _msg = res.data.message;
            if (_status === 200) {
              this.teamInfo = res.data.data;
              // console.log(res.data.data);
              this.member_list = res.data.data.member_list;
              console.log(this.member_list);
            } else {
              console.log(_msg);
            }

          }).catch(error=> {
            console.log(error);
          })
        }
      },
      computed:{
        ...mapState(["img_head"])
      },
    }
</script>

<style lang="scss" scoped>
  .team-wrap {
    width: 100%;
    height: 100%;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background-color: #fff;

    header {
      position: relative;
      height: 66px;
      padding-top: 66px;
      margin-bottom: -2px;
      text-align: center;
      background-color: rgba(1, 19, 33, 1);

      img {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }

      .header-item-right {
        position: absolute;
        top: 74px;
        right: 36px;
        padding: 10px 20px;
        color: #fff;
        background-color: #30d0a1;
        border-radius: 48px;
      }
    }

    .info {
      padding: 36px;
      background-color: rgba(1, 19, 33, 1);
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;

      .top {
        display: flex;
        align-items: center;

        img {
          width: 84px;
          height: 84px;
        }

        span {
          font-weight: 500;
          font-size: 45px;
          padding-left: 30px;
        }
      }

      .bottom {
        display: flex;

        .mg {
          margin: 14px 10px 0 0;
          font-size: 26px;
          line-height: 30px;
          text-align: center;
        }

        .box1 {
          /*width: 138px;*/
          height: 30px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, .2);
          border-radius: 15px;
          color: rgba(255, 255, 255, 1);
        }

        .box2 {
          /*width: 120px;*/
          height: 30px;
          padding: 6px 10px;
          background: rgba(48, 208, 161, .2);
          border-radius: 15px;
          color: rgba(48, 208, 161, 1);
        }

        .box3 {
          /*width: 45px;*/
          width:13%;
          height: 40px;
          line-height:40px;
          // padding: 6px 10px;
          background: rgba(255, 214, 48, 0.2);
          border-radius: 15px;
          font-family: AliHYAiHei, sans-serif;
          font-style: italic;
          color: rgba(255, 214, 48, 1);
        }
      }

      .info-bottom {
        display: flex;
        padding: 40px 0;
        text-align: center;
        font-size: 24px;
        color: rgba(255, 255, 255, .5);

        .info-bottom-item {
          flex: 1;
          position: relative;
          line-height: 60px;

          span {
            font-size: 40px;
            color: #fff;
          }
        }

        .info-bottom-item:first-child:after,
        .info-bottom-item:nth-of-type(2):after {
          content: "";
          position: absolute;
          top: 40px;
          right: 0;
          bottom: 5px;
          width: 2px;
          height: 40px;
          background-color: #fff;
        }
      }

    }

    .content {
      // height:100%;
      background-color:#fff;
      .content-item {
        display: flex;
        align-items: center;
        margin: 40px;
        color: #011321;

        .content-item-left {
          display: flex;
          flex: 1;
          align-items: center;

          img {
            width: 80px;
            height: 80px;
          }

          .user-info {
            margin-left: 20px;

            h1 {
              padding-bottom: 10px;
              font-family: PingFangSC-Regular, sans-serif;
              font-size: 32px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #011321;
            }

            p>span:first-child {
              padding: 6px 20px;
              border-radius: 60px;
              color: #30d0a1;
              background-color: rgba(48, 208, 161, .2);
            }

            p>span:last-child {
              padding: 6px 20px;
              font-family: AliHYAiHei, sans-serif;
              font-weight: normal;font-style: italic;
              font-stretch: normal;
              letter-spacing: 0;
              border-radius: 60px;
              color: rgb(255, 214, 48);
              background-color: #fff7d6;
            }

          }
        }

        .content-item-right {
          flex: 1;
          text-align: right;
          font-family: PingFangSC-Medium, sans-serif;
          font-size: 40px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          color: #011321;
        }
      }
    }
    

  }

</style>
