import makeRequest from "../httpClient"

export const AuthService = {
  login(data) {
    return makeRequest({
      url: '/auth/login/',
      data,
      method: 'POST'
    })
  }
}
