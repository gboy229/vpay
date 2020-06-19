/**
 * Created by Administrator on 2018/12/26 0026.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lgc_cny:localStorage.getItem("lgc_cny"),
    lgc_num:localStorage.getItem("lgc_num"),
    usdt_cny:localStorage.getItem("usdt_cny"),
    usdt_num:localStorage.getItem("usdt_num"),
    userid:localStorage.getItem("userid"),
    username:localStorage.getItem("username"),
    img_head:localStorage.getItem("img_head"),
  },
  //读取状态
  /*getters:{
    cid:(state)=>{
      return state.cid;
    }
  },*/
  //修改状态值
  mutations: {
    setInfo(state,payload){
      state.lgc_cny = payload.lgc_cny;
      state.lgc_num = payload.lgc_num;
      state.usdt_cny = payload.usdt_cny;
      state.usdt_num = payload.usdt_num;
      state.userid = payload.userid;
      state.username = payload.username;
      state.img_head = payload.img_head;
    },
    logout(){
      localStorage.clear();
    }
    
    
  },
  actions: {

  }
})

/*setData(state,data){
      state.data=data;
    },
    setislogin(state,islogin){
      state.islogin=islogin;
    },*/ 