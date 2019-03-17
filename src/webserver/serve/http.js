import  Vue from  'vue'
import  axios from  'axios'
import VueAxios from 'vue-axios'
import  $ from 'jquery'
import  $config from './config'
import  $format from  './format'
axios.defaults.baseURL = $config.baseUrl;

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':'123'
    }
}
const $myHttp = {
    post(url,params={},callback) {
        let form = new FormData();
        $.each(params, (key, item) => {
            form.append(key, item);
        })
        axios.post(url, form, config)
            .then(function (data) {
                callback(data);
            })
            .catch(function (error) {
                return {msg: error};
            });
    },
    save(url,params={},files,callback)
        {
            let form = new FormData();
            $.each(files, (key, item) => {
                form.append('files', item);
            })
            $.each(params, (key, item) => {
                form.append(key, item);
            })
            axios.post(url, form, config)
                .then(function (data) {
                    callback(data);
                })
                .catch(function (error) {
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
        axios.post(url,form,config).then(function (res) {
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
