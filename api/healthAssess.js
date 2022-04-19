const http = uni.$u.http

export const getAllType = () => http.get('health/type')


export const getUserHealth = () => http.get('health/user',)