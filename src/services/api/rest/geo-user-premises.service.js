import makeRequest from "../httpClient"

export const GeoUserPremisesService = {
  getAll(params) {
    return makeRequest({
      url: '/geo/v2.0/user-premises/',
      method: 'GET',
      params
    })
  },
}