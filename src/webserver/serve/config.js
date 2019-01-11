import  Vue from  'vue'
import  axios from  'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.common['Authorization'] = '*';
const $myHttp = {
    get(url,params={}) {
        console.log(window)
        axios.get(url,params)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return {msg:error};
            });
    },
    post(url,params) {
        axios.post(url,params)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return {msg:error};
            });
    }
}
export  default  $myHttp
