const $config={
    //baseUrl:'http://localhost:8080',
    baseUrl:'http://47.106.222.50:8080',
    pageSize:'10',//每次请求列表加载的条数
    //保存时过滤的字段
    saveFilter:'createTime,createUser,dataStatus,updateTime,updateUser,viewTimes',

    /*zxl 2019-04-26 从nginx图片服务器加载图片url*/
    picUrl:'http://47.106.222.50:8083',
    //picUrl:'http://localhost:8083',
}
export default $config

