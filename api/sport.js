const http = uni.$u.http


// 获取运动处方数据
export const getAllSportData = () => http.get('/action/getAction')

// 根据运动处方的名称获取具体的运动处方
export const getChuFangByName = (params) => http.get('/action/getPrescribe', params)

// 根据运动处方的id返回具体的信息
export const getChuFangById = (params) => http.get('/action/getById', params)

// 用户上传反馈
export const reportSport = (data) => http.post('/action/submit', data)
