import axios from "axios";
import qs from "qs";
import store from '@/store/index';
import router from "./router"

const Axios=axios.create({
  baseURL:"http://vpay.huziru.com/api",
  // withCredentials:true,
  withCredentials: true,  // 跨域请求
  crossDomain: true,  // 跨域请求
  headers: {
    "Content-Type":"multipart/form-data"
  }
})

// 请求拦截器
Axios.interceptors.request.use(
  config=>{
    console.log("进入请求拦截器...");

    //this.axios.post(
      //"user/signin",
      //{uname:dingding , upwd:123456}
    //)
    if(config.method==="post"){
      config.data=qs.stringify(config.data)
      // console.log(config.data)  // 账号密码
    }

    if(localStorage.getItem("token")){
      // config.headers.common['token'] =localStorage.getItem('token');
      // config.headers.token=localStorage.getItem("token");

      // console.log(localStorage.getItem("token")) // 这里已经能拿到 token
      // config.params.token = localStorage.getItem("token");

    }

    // if(sessionStorage.getItem("token")){
    //   config.headers.token=sessionStorage.getItem("token");
    // }
    return config;
  },
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    if(res.data.status===302){

      // localStorage.removeItem("token");

      // localStorage.removeItem("data");
      // localStorage.removeItem("islogin")
      // store.commit("setislogin",false);
      // store.commit("setislogin",false);
      // store.commit("setData","");
    // }else if(res.data.code==-1){
    //   store.commit("setislogin",false);
    //   store.commit("setMobile","");
    //   //alert(res.data.msg+" 请先登录 !");
      console.log('响应302--》移除token')

      //跳转到登录界面
      router.push("/login");
      

    }else{

      // let token = Base64.decode(res.data.data);
      // localStorage.setItem("token", token);

      // if (!localStorage.getItem('token')) {
      //   localStorage.setItem("token", res.data.data);
      // }

      // console.log(data);
      // store.commit("setData",data);
      // store.commit("setislogin",true);
      // localStorage.setItem("data",res.data.data);
      // localStorage.setItem("islogin",true);
      // store.commit("setislogin",false);

      // console.log(store);
      // console.log(res.data.data);
      // if(res.remember==="true"){
      //   localStorage.setItem("token",res.data.token);
      // }else{
      //   sessionStorage.setItem("token",res.data.token);
      // }
      // console.log('200 成功')
    }
    return res;
  },
  error=>{

  }
)

export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}
// export default Axios
