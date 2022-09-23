const http = uni.$u.http

//获取运动历史汇报列表
export const getActionHistroyList = (pageNum,pageSize) => http.get(`/action/history?pageNum=${pageNum}&pageSize=${pageSize}`)

// 根据id返回具体的运动历史信息
export const getActionHistroyById = (id) => http.get(`/action/getHistoryById?id=${id}`)

// 用户获取饮食历史汇报列表
export const getFoodHistroyList =(pageNum,pageSize)=>  http.get(`/food/history?pageNum=${pageNum}&pageSize=${pageSize}`)

// 根据id返回具体的饮食历史信息
export const getFoodHistroyById = (id) => http.get(`/food/getHistoryById?id=${id}`)

// 用户获取药物历史汇报列表
export const getDrugHistroyList = (pageNum,pageSize) =>  http.get(`/drug/history?pageNum=${pageNum}&pageSize=${pageSize}`)

// 根据id返回具体的药物历史信息
export const getDrugHistroyById = (id) => http.get(`/drug/getHistoryById?id=${id}`)