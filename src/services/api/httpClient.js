import { apiClient } from './config'

export function makeRequest({
  url = '/',
  method = 'get',
  headers,
  params,
  data,
  responseType = 'json',
}) {
  return apiClient({
    url,
    method,
    responseType,
    headers,
    params,
    data,
    paramsSerializer: { indexes: null },
    withCredentials: false,
  })
}

export default makeRequest
