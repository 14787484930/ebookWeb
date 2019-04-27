<template>
<div class="file-img">
    <input type="file" id="upload-file"  @change="showImg" multiple="multiple" style="display:none" accept="image/*" />
    <div class="row-boder" style="text-align: center;margin:0 auto">
            <img  class="img-responsive"  @click="bindEven"  src="./css/img/upload.png"/>
        <i @click="delAll()" v-if="showDel" class="icon ion-close-circled" style="color:lightcoral "></i>
            <img  class="img-responsive"  v-if="curls.length===0"  src="./css/img/noImg.png"/>
        <template v-for="item in curls"  >
            <img  v-press="fShowDel"  class="img-responsive"  @click="showImagePreview(item[ckey])"   :src="item[ckey]"/>
            <i @click="delImg(item)" v-if="showDel"  class="icon ion-close-circled"></i>
        </template>
    </div>



</div>
</template>
<script>
    import  axios from  'axios'
    import lrz from 'lrz'
    var _that='';
    export default {
        name: "FileCom",
        props: ['urls','urlkey'],
        data(){
            return{
                showDel:false,
                curls:[],
                ckey:'url',
                files:[],
            }
        },
        created(){
            _that=this;
            this.initParams();
        },
        watch: {
            'urls': function(){
                this.changeUrlToBlob(this.urls)
            },

        },
        methods: {
            fShowDel(e) {
                this.showDel = true;
                console.log(e)
                e.target.stopPropagation();
            },
            initParams() {
                //this.curls = this.urls != undefined ? this.urls : [];
                this.curls = [];
                this.ckey = this.urlkey != undefined ? this.urlkey : 'url';
            },
            showImg: function (e) {
                $.each(e.target.files, (index, item) => {
                    _that.readFile(item);
                });
            },
            delAll() {
                this.files = [];
                this.curls = [];
            },
            readFile: function (file) {
                if (file.size > 5242880) {
                    alert("照片不能大于5M")
                    return
                }
                _that.files.push(file);
                let data = {
                    FileName: file.name.substr(0, file.name.lastIndexOf('.')),
                };
                lrz(file).then(function (rst) {
                    data[_that.ckey] = rst.base64;
                    _that.curls.push(data);
                }).catch(function (error) {
                    var reader = new FileReader();
                    reader.vue = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        data[_that.ckey] = this.result;
                        _that.curls.push(data);
                    }
                })

            },
            showImagePreview: function (url) {
                this.$createImagePreview({
                    imgs: [url]
                }).show()
            },
            delImg(item) {
                let _index = this.curls.indexOf(item);
                this.curls.splice(_index, 1);
                this.files.splice(_index, 1);
            },
            bindEven() {
                $("#upload-file").click();
            },
            //将img中url改为blob格式
            changeUrlToBlob(url) {
                for(let i=0; i<url.length; i++){
                    this.loadImageToBlob(url[i].url, blobFile => {
/*                        if (!blobFile) return false;
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(blobFile);
                        fileReader.onload = function() {
                            //这里输出的数据放到url里能生成图片
                            console.log(this.result);
                            //新建对象

                            //console.log(obj);
                        };*/
                    });
                }

            },
            loadImageToBlob(url, callback) {
                if (!url || !callback)
                    return false;
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    // 注意这里的this.response 是一个blob对象 就是文件对象
                    //blob对象转file对象
                    let FileName = 'abc.jpg';
                    let contentType = this.response.type;
                    let file = new File([this.response], FileName, {type: contentType, lastModified: Date.now()});
                    _that.readFile(file);
                    //callback(Number(this.status) === 200 ? this.response : false);
                }
                xhr.open('get', url, true);
                xhr.send();
                return true;
            }
        }
    }
</script>

<style>
    .file-img img{
        margin: 4px 4px;
        float: left;
        height :80px;
        width :80px;
        object-fit: cover;
        border: 1px solid #c9e2b3;
    }
    .file-img i{
        float: left;color:#0a9dc7 ;
        margin-left: -10px;
        margin-top: -8px;
    }
</style>
