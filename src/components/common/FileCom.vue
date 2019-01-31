<template>
<div class="file-img">
    <input type="file" id="upload-file"  @change="showImg" multiple="multiple" style="display:none" accept="image/*" />
    <div class="row-boder" style="text-align: center;margin:0 auto">
            <img  class="img-responsive"  @click="bindEven"  src="./css/img/upload.png"/>
        <i @click="delAll()" v-if="showDel" class="icon ion-close-circled" style="color:lightcoral "></i>
            <img  class="img-responsive"  v-if="curls.length==0"  src="./css/img/noImg.png"/>
        <template v-for="item in curls"  >
            <img  v-press="fShowDel"  class="img-responsive"  @click="showImagePreview(item[ckey])"   :src="item[ckey]"/>
            <i @click="delImg(item)" v-if="showDel"  class="icon ion-close-circled"></i>
        </template>
    </div>



</div>
</template>
<script>
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
        methods:{
            fShowDel(e){
                this.showDel=true;
            },
            initParams(){
                this.curls=this.urls!=undefined?this.urls:[];
                this.ckey=this.urlkey!=undefined?this.urlkey:'url';
            },
            showImg: function (e) {
                $.each(e.target.files, (index, item) => _that.readFile(item));
            },
            delAll(){
                this.files=[];
                this.curls=[];
            },
            readFile: function (file) {
                _that.files.push(file);
                var data = {
                    FileName: file.name.substr(0, file.name.lastIndexOf('.')),
                };
                lrz( file).then(function(rst) {
                    console.log(rst)
                        data[_that.ckey]=rst.base64;
                        _that.curls.push(data);
                    }).catch(function(error) {
                    var reader = new FileReader();
                    reader.vue = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        data[_that.ckey]=this.result;
                        _that.curls.push(data);
                    }
                })

            },
            showImagePreview:function(url){
                this.$createImagePreview({
                    imgs: [url]
                }).show()
            },
            delImg(item){
                let _index=this.curls.indexOf(item);
                this.curls.splice(_index,1);
                this.files.splice(_index,1);
            },
            bindEven() {
                $("#upload-file").click();
            },
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
