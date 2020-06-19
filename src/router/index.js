import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router =  new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index'),
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
     },
      {
      path: '/quotation',
      name: 'quotation',
      component: () => import('@/pages/quotation'),
    },
    {
      path: '/oct',
      name: 'oct',
      component: () => import('@/pages/oct'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/pages/account'),
      meta:{
        requiresAuth:true
      }
    },{
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register'),
    },
      {
        path: '/account/userDetails',
        name: 'userDetails',
        component: () => import('@/pages/account/userDetails'),
      },
    {
      path: '/account/invitation',  //分享链接
      name: 'invitation',
      component: () => import('@/pages/account/invitation'),
    },
    {
      path: '/account/safe',  //安全设置
      name: 'safe',
      component: () => import('@/pages/account/safe'),
    },
    {
      path: '/account/editPass',   //安全设置=》 修改登录密码
      name: 'editPass',
      component: () => import('@/pages/account/editPass'),
    },
    {
      path: '/account/forgetPass',  //安全设置=》绑定手机号
      name: 'forgetPass',
      component: () => import('@/pages/account/forgetPass'),
    },
    {
      path: '/account/telNum',  //安全设置=》绑定手机号
      name: 'telNum',
      component: () => import('@/pages/account/telNum'),
    },
    {
      path: '/account/realName',  //实名认证  =》  没有认证的页面
      name: 'realName',
      component: () => import('@/pages/account/realName'),
    },
    {
      path: '/account/authentication',    // 实名认证 =》 认证完毕的页面
      name: 'authentication',
      component: () => import('@/pages/account/authentication'),
    },
    {
      path: '/account/otcOrder',  //otc订单
      name: 'otcOrder',
      component: () => import('@/pages/account/otcOrder'),
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('@/pages/index/exchange'),
    },
    {
      path: '/lgc',
      name: 'lgc',
      component: () => import('@/pages/index/lgc'),
    },
    {
      path: '/usdt',
      name: 'usdt',
      component: () => import('@/pages/index/usdt'),
    },
    {
      path: '/assets',  // 认购资产包
      name: 'assets',
      component: () => import('@/pages/index/assets'),
    },
    {
      path: '/agreement',  // 注册协议
      name: 'agreement',
      component: () => import('@/pages/register/agreement'),
    },
    {
      path: '/assetsPack/:id',  // 资产包
      name: 'assetsPack',
      component: () => import('@/pages/index/assets/assetsPack'),
    },
    {
      path: '/accountDetail',  // 账户详情
      name: 'accountDetail',
      component: () => import('@/pages/index/assets/accountDetail'),
    },
    {
      path: '/release',  // 查看释放详情
      name: 'release',
      component: () => import('@/pages/index/assets/release'),
    }
    ,
    {
      path: '/releaseDetail/:id',  // 释放详情
      name: 'releaseDetail',
      component: () => import('@/pages/index/assets/releaseDetail'),
    }

    // author：caiyongwen
    ,
    {
      path: '/account/editNickname',  // 编辑昵称
      name: 'editNickname',
      component: () => import('@/pages/account/editNickname'),
    },
    {
      path: '/account/otcOrderDetail',  // OTC 订单详情
      name: 'otcOrderDetail',
      component: () => import('@/pages/account/otcOrderDetail')
    },
    {
      path: '/account/profit',  // OTC 订单详情
      name: 'profit',
      component: () => import('@/pages/account/profit')
    },
    {
      path: '/account/paypass',  // 安全设置=》交易密码
      name: 'paypass',
      component: () => import('@/pages/account/paypass')
    },
    {
      path: '/account/forgetPayPass',  // 安全设置=》找回交易密码
      name: 'forgetPayPass',
      component: () => import('@/pages/account/forgetPayPass')
    },
    {
      path: '/account/editPayPass',  // 安全设置=》更改交易密码
      name: 'editPayPass',
      component: () => import('@/pages/account/editPayPass')
    },
    {
      path: '/account/team',  // 我的团队
      name: 'team',
      component: () => import('@/pages/account/team')
    },
    {
      path: '/account/teamList',  // 我的团队列表
      name: 'teamList',
      component: () => import('@/pages/account/teamList')
    },
    {
      path: '/account/setPayPass',  // 设置交易密码
      name: 'setPayPass',
      component: () => import('@/pages/account/setPayPass')
    },
    {
      path: '/index/codepay',  // 扫码支付
      name: 'codepay',
      component: () => import('@/pages/index/codepay')
    },

    // author: nbsp
    {
      path: '/oct/buy',  // oct 购买
      component: () => import('@/pages/business/buy'),
    },
    {
      path: '/oct/sale', // oct 出售
      component: () => import('@/pages/business/sale'),
    },
    {
      path: '/business/rechargePhone', // 手机充值
      component: () => import('@/pages/business/rechargePhone'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/business/rechargeflow', // 流量充值
      component: () => import('@/pages/business/rechargeflow'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/business/rechargeoil', // 油卡充值
      component: () => import('@/pages/business/rechargeoil'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/business/clickreturn', // 点击返回
      component: () => import('@/pages/business/clickreturn'),
    },
    {
      path: '/business/paydetails', // 订单详情
      component: () => import('@/pages/business/paydetails'),
    },
    {
      path: '/business/welcome', // 启动页
      component: () => import('@/pages/business/welcome'),
    },
    {
      path: '/develop', // 点击返回  //开发中
      component: () => import('@/pages/index/develop'),
    }
  ]
})

//全局前置守卫
// router.beforeEach((to,from,next)=>{
//   // console.log(to);
//   if(to.matched.some(r=>r.meta.requiresAuth)){
//     if(!localStorage.getItem('token')){
//       // router.push({
//       //   path:"/Login",query:{path:to.fullPath}
//       // })
//       console.log(localStorage.getItem('token'));

//       router.push("/login")
//     }else{
//       next()
//       console.log('登录组件含token')
//     }
//   }else{
//     next()
//   }
// })
export default router
