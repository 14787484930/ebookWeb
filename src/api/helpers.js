import axios from 'axios'

const urlMap = {
  // development: 'http://192.168.0.104:8080/',
  development: 'http://ebook.zhangxinhua.xin:8080/',
  production: 'http://ebook.zhangxinhua.xin/sell/',
  test: 'http://192.168.0.104:8080/'
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
        return page.pageInfo.list
      }
      return null
    }).catch((e) => {
      console.log(e)
    })
  }
}
