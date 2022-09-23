const http = uni.$u.http


// 用户查看饮食指导记录（返回id、date、title）
export const getFoodType = () => http.get('/food/all')

// 根据id查看饮食具体内容
export const getFoodById = (data) => http.get('/food/getById?id='+data)

// 用户汇报
export const reportFood = (data) => http.post('/food/submit',data)

// 用户查看公告
export const checkNotice = () => http.get('/notice/allforUser')