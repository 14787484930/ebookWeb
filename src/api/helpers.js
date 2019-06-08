import axios from 'axios'

const urlMap = {
  development: '/',
  production: 'http://ebook.zhangxinhua.xin/sell/'
}
//const baseUrl = urlMap[process.env.NODE_ENV]
const baseUrl = 'http://192.168.0.104:8080/'
const ERR_OK = 0

export function get(url) {
  return function(params = {}) {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const {errno, data} = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
        console.log(e)
    })
  }
}
