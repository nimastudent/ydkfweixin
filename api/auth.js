const http = uni.$u.http

// 微信登录
export const weChatLogin = (data) => http.post('weChat/login',data)

// 正常登录
export const login = (data) => http.post('user/login',data)

// 获取用户信息
export const getUserInfo = () => http.get('patient/my')