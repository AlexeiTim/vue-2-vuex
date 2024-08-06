import makeRequest from "../httpClient"

export const GeoApartmentsService = {
  getAll(params) {
    return makeRequest({
      url: '/geo/v1.0/apartments/',
      method: 'GET',
      params
    })
  }
}