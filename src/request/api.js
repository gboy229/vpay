import http from './http'
//短信验证码
export const getVPhone = p => http.get('/base/getVPhone',p) 
//邀请好友验证码登录
export const invitationLoginYZM = p => http.post('/user/invitationLoginYZM',p) 
//客服
export const customerService = p => http.post('/my/customerService',p) 
export const checkMobile = p => http.post('/base/checkMobile',p) 
