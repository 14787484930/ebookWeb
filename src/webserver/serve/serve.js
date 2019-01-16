import  Vue from  'vue'
import  $http from  './http'
const serve={
    bookTypes:(back)=>$http.post('/booktype/booktypes',{},data=>back(data)),
};
Vue.prototype.$serve=serve;
