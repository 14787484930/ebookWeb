import  Vue from  'vue'
import  $http from  './config'
const serve={
    bookTypes:$http.get('/booktype/booktypes',{},data=>data),
};
Vue.prototype.$myhttp=$http;
Vue.prototype.$serve=serve;
