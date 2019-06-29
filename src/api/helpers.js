import axios from 'axios'
import url from '../webserver/serve/config.js'

const urlMap = {
  development: url.baseUrl,
  production: 'http://ebook.zhangxinhua.xin:8080/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 100

export function get(url) {
  return function (params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { code, page } = res.data
      if (code === ERR_OK) {
        return page
      }
      return null
    }).catch((e) => {
      console.log(e)
    })
  }
}

export function post(url) {
  return function (data) {
    return axios.post(baseUrl + url, data, {
      dataType: 'json',
      'Content-Type': 'application/json; charset=UTF-8'
    }).then((res) => {
      console.log(res)
      const {code, msgs} = res.data
      if (code === ERR_OK) {
        return msgs
      }
      return null
    }).catch((e) => {
      console.log(e)
    })
  }
}