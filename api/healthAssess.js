const http = uni.$u.http

export const getAllType = () => http.get('health/type')

export const getUserHealth = () => http.get('health/user')

// 用户上传血糖
export const xueTangReport = (params) => http.get(`health/upload/mySweet?sweet=`+params)

// 用户上传血压
export const xueYaReport = (params) => http.get('/health/upload/myBlood?blood='+params)

// 用户查看血糖记录
export const getXueTangHistroy = () => http.get('/health/mySweet')

// 用户查看血压记录
export const getXueYaHistroy = () => http.get('/health/myBlood')

// 疾病汇报
export const diseaseReportPost = (data) => http.post('/disease/report',data)