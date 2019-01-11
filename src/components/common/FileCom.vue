<template>
<div class="file-img">
    <input type="file" id="upload-file"  @change="showImg" multiple="multiple" style="display:none" accept="image/*" />
    <div class="row-boder">
            <img  class="img-responsive" @click="bindEven"  src="./css/img/upload.png"/>
            <img  v-if="curls.length==0"  src="./css/img/noImg.png"/>
            <img  @click="showImagePreview(item[ckey])"  v-for="item in curls"   :src="item[ckey]"/>
    </div>



</div>
</template>

<script>
    var _that='';
    export default {
        name: "FileCom",
        props: ['urls','urlkey'],
        data(){
            return{
                curls:[],
                ckey:'url',
                form:new FormData(),
            }
        },
        created(){
            _that=this;
            this.initParams();
        },
        methods:{
            initParams(){
                this.curls=this.urls!=undefined?this.urls:[];
                this.ckey=this.urlkey!=undefined?this.urlkey:'url';
            },
            showImg: function (e) {
                this.$.each(e.target.files, (index, item) => _that.readFile(item));
            },
            readFile: function (file) {
                _that.form.append('files', file);
                var reader = new FileReader();
                reader.vue = this;
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var data = {
                        FileName: file.name.substr(0, file.name.lastIndexOf('.')),
                    };
                    data[_that.ckey]=this.result;

                   _that.curls.push(data);
                }
            },
            showImagePreview:function(url){
                this.$createImagePreview({
                    imgs: [url]
                }).show()
            },
            bindEven() {
                this.$("#upload-file").click();
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
        border: 1px solid #c9e2b3;
    }
</style>
