const http = uni.$u.http

// 返回所有药物
export const getDrug = () => http.get('/drug/all')


