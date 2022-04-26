const http = uni.$u.http

export const postUserCode = (data) => http.post('weChat/login',data)

export const login = (data) => http.post('user/login',data)

export const getUserInfo = () => http.get('patient/my')