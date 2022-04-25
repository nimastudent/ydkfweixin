const http = uni.$u.http


// 获取运动类型
export const getSportType = () => http.get('/action/getType')

// 根据运动处方的类型获取运动名称
export const gerNameByType = (params) => http.get('/action/getName',params)

// 根据运动处方的名称获取具体的运动处方
export const getChuFangByName = (params) => http.get('/action/getPrescribe',params)

// 根据运动处方的id返回具体的信息
export const getChuFangById = (params) => http.get('/action/getById',params)