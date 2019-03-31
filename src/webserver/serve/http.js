import  Vue from  'vue'
import  axios from  'axios'
import  store from  './store'
import VueAxios from 'vue-axios'
import  $ from 'jquery'
import  $config from './config'
import  $format from  './format'
import  dialog from '../../components/common/dialog'
import  $valid from './valid'
axios.defaults.baseURL = $config.baseUrl;
axios.defaults.timeout = 30000
const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':'123'
    }
}
const $myHttp = {
    post(url,params={},callback) {
        let form = new FormData();
        dialog.loading.open();
        $.each(params, (key, item) => {
            form.append(key, item);
        })
        axios.post(url, form, config)
            .then(function (data) {
                dialog.loading.close();
                callback(data);
            })
            .catch(function (error) {
                dialog.loading.close();
                return {msg: error};
            });
    },
    save(url,params={},files,callback)
        {
            if(!$valid.submit())  return;//验证

            let form = new FormData();
            dialog.loading.open();
            $.each(files, (key, item) => {
                form.append('files', item);
            })
            $.each(params, (key, item) => {
                form.append(key, item);
            })
            axios.post(url, form, config)
                .then(function (data) {
                    dialog.loading.close();
                    callback(data);
                })
                .catch(function (error) {
                    dialog.loading.close();
                    return {msg: error};
                });
    },
    getTable(url,queryList,callback){
        let form=new FormData();
        queryList.pageSize= $config.pageSize;
        queryList.pageNumber=$format.toInt(queryList.pageNumber);
        $.each(queryList,(key,item)=>{
            form.append(key,item);
        })
<<<<<<< HEAD
        //dialog.loading.open();
        axios.post(url,form,config).then(function (res) {
            console.log(res)
            store.commit('setUser',res.data.page.userInfo);
=======
       // dialog.loading.open();
        axios.post(url,form,config).then(function (res) {
         //   dialog.loading.close();
>>>>>>> c9867764fd540aba7cedb74acdc811e243cfb38e
            callback(res.data.page.pageInfo);
        })
    },
    //文件配置完整路径
    getFile:(url)=>{
        let length=url.indexOf(',');
        if(length!=-1)
            url=url.substr(0,length);
        return $config.baseUrl+url
    }
}
Vue.prototype.$file=$myHttp.getFile;
Vue.prototype.$table=$myHttp.getTable;
Vue.prototype.$post=$myHttp.post;
Vue.prototype.$save=$myHttp.save;
Vue.use(VueAxios, axios)
export  default  $myHttp
