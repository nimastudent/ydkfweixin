const http = uni.$u.http

// 用户查看饮食指导记录（返回id、date、title）
export const getFoodType = () => http.get('/food/all')