import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'https://dev.moydomonline.ru/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
