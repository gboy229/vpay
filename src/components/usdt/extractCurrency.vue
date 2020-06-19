<template>
	<div class="tibi">
		<div>
			<p>余额 LGC</p>
			<P>{{usdt_num}}</P>
		</div>
		<div class="tiqu">
			<p class="small_title">地址</p>
			<input class="input_style input_style1" type="text" placeholder="请输入钱包地址">
		</div>
		<div class="tiqu">
			<p class="small_title">数量</p>
			<div class="flex_box">
				<input class="input_style input_style1" type="text" placeholder="请输入数量">
				<a href="javascript:;" class="btn btn3">全部提取</a>
			</div>
		</div>
		<div class="tiqu">
			<p class="small_title">服务费</p>
			<div class="flex_box">
				<span>0</span>
				<span>LGC</span>
			</div>
		</div>
		<a href="javascript:;" class="btn btn1">确认提取</a>
	</div>
</template>
<script>
import {mapState} from "vuex";
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState(["usdt_num"])
  }
}
</script>
<style lang="scss" scoped>
.tibi{
	div:first-child{
        p:first-child{
          color:rgba(255,255,255,0.3);
        }
        p:nth-child(2){
          color:#fff;
          font-size:60px;
        }
      }
	.tiqu{
      text-align: left !important;
      margin:0 30px;
      border-bottom:1px solid #0a393b;
    }
    .tiqu+.tiqu{
      margin-top:20px;
		}
		.small_title{
      font-size:26px;
      color:#32d1a2;
      padding-bottom:20px;
    }
    .flex_box{
      display: flex;
      justify-content: space-between;
      padding-bottom:10px;
      span{
        color:rgba(255,255,255,0.8);
        font-size:32px;
      }
		}
		.btn{
      display: block;
      background:#30d0a1;
      color:#fff;
      text-align:center;
      font-family: PingFangSC;
    }
    .btn1{
      width:95%;
      height:100px;
      border-radius:15px;
      line-height: 100px;
      color:#fff;
      font-size:35px;
      margin:100px 30px 50px auto;
		}
		.btn3{
      width:30%;
      height:70px;
      line-height:70px;
      border-radius:50px;
      font-size:28px;
	}
	.input_style{
    background: transparent;
    margin-left:35px;
    font-size:36px;
    color:#fff;
  }
  .input_style::-webkit-input-placeholder{
    opacity: 0.7;
  }
  .input_style1{
    margin-left:0;
    padding-bottom:20px;
}
}
</style>
