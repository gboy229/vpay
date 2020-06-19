<template>
  <div class="team-wrap">
    <header>
      <img src="../../assets/images/back_small.png" alt="" @click="$router.go(-1)">
    </header>
    <div class="team-header">
      <p>团队总数</p>
      <p>{{ total_num }}</p>
    </div>
    <ul class="ev-list">
      <li v-for="item in list">
        <div class="ev-list-left">
          <span>{{ item.level }}</span>邀请 {{ item.level }} 用户数
        </div>
        <div class="ev-list-right">{{ item.num }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "team",
      data() {
        return {
          total_num: 0,
          list: [
            {
              level: 'L1',
              num: 2,
            },
            {
              level: 'L2',
              num: 1,
            },
            {
              level: 'L3',
              num: 10,
            },
            {
              level: 'L4',
              num: 1,
            },
            {
              level: 'L5',
              num: 1,
            }
          ]
        }
      },
      mounted() {
        this.list.forEach(item=>{
          this.total_num += item.num;
        });
      }
    }
</script>

<style lang="scss" scoped>
  .team-wrap {
    width: 100%;
    height: 100%;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

    header {
      position: relative;
      height: 66px;
      padding-top: 66px;
      text-align: center;
      background-color: rgba(1, 19, 33, 1);

      img {
        // width: 16px;
        // height: 30px;
        position: absolute;
        top: 84px;
        left: 36px;
      }
    }

    .team-header {
      margin-bottom: 30px;
      text-align: center;

      p:nth-of-type(1) {
        font-family: PingFangSC-Regular, sans-serif;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: rgba(255, 255, 255, .5);
      }

      p:nth-of-type(2) {
        font-family: PingFangSC-Medium, sans-serif;
        font-size: 80px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0;
        color: #30d0a1;
      }
    }

    .ev-list {
      li {
        display: flex;
        align-items: center;
        padding: 20px 40px;
        font-size: 32px;

        .ev-list-left {
          flex: 3;
          text-align: left;
          color: rgba(255, 255, 255, .5);

          span {
            padding: 6px 20px;
            margin-right: 20px;
            vertical-align: middle;
            font-family: AliHYAiHei, sans-serif;
            font-size: 28px;
            font-weight: normal;
            font-style: italic;
            font-stretch: normal;
            letter-spacing: 0;
            border-radius: 48px;
            color: #ffd630;
            background-color: #343a24;
          }
        }

        .ev-list-right {
          flex: 1;
          text-align: right;
          font-family: PingFangSC-Medium, sans-serif;
          font-size: 40px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          color: #30d0a1;
        }
      }

    }

  }

</style>
