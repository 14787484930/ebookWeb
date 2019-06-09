import axios from 'axios'

const urlMap = {
  development: 'http://192.168.0.104:8080/',
  // development: '/',
  production: 'http://ebook.zhangxinhua.xin/sell/',
  test: 'http://192.168.0.104:8080/'
}
const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export function get(url) {
  return function (params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
      return null
    }).catch((e) => {
      console.log(e)
    })
  }
}
