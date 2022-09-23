const http = uni.$u.http

// 获取用户是否登录
export const getUserIsLogin = () => http.get('isLogin')

// 微信登录
export const weChatLogin = (data) => http.post('weChat/login',data)

// 获得openid和session_key
export const getCode = (data) => http.get('getOS?code='+data)

//微信获取手机号
export const getPhoneByCode = (data) => http.get('getPhone?code='+data)

// 正常登录
export const login = (data) => http.post('user/login',data,{header:{
	'Content-Type':'application/x-www-form-urlencoded'
}})

// 获取用户信息
export const getUserInfo = () => http.get('patient/my')

// 获取医生
export const getDocInfo = () => http.get('patient/manage/allDoctor')

// 用户注册
export const userRegister = (data) => http.post('register',data)

// 设置医生
export const setDoc = (id) => http.get(`chooseDoctor?did=${id}`)