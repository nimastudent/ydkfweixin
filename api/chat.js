const http = uni.$u.http

// 获取医生端或患者端的通讯列表
export const getChatObj = () => http.get('/webSocket/getList')

// 根据toUid得到通讯内容
export const getChatById = (params) => http.get(`/webSocket/getMessage?toUid=${params}`)