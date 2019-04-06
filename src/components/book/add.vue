<template>
    <div class="scroll-list-wrap"  >
        <cube-scroll
                ref="scroll"
        >
            <template>
       <div  class="list">
                <label class="form-group item item-input ">
                    <span>图书名称：</span>
                    <input type="text" class="isnull"  v-model="book.bookName">
                </label>
                <label class="form-group item item-input ">
                    <span>作者：</span>
                    <input type="text" class="isnull" v-model="book.author">
                </label>
                <label class="form-group item item-input ">
                    <span>出售价格(元)：</span>
                    <input type="number" class="isnull" v-model="book.bookPrice">
                </label>
                <label class="form-group item item-input ">
                    <span>出版日期：</span>
                    <date v-model="book.pubDate"></date>
                </label>
                <label class="form-group item item-input ">
                    <span>出版社：</span>
                    <input type="text" v-model="book.bookPub">
                </label>
                <label class="form-group item item-input ">
                    <span>联系电话：</span>
                    <input type="text" class="tel isnull" v-model="book.phone">
                </label>
               <label class="form-group item item-input ">
                   <span>微信：</span>
                   <input type="text" v-model="book.weiXin">
               </label>
           <label class="form-group item item-input " style="padding-left: 0px">
               <quill-editor class="quill-editor"
                    v-model="book.des">
               </quill-editor>
           </label>
                    <file-com ref="refFiles" :urls="urls" ></file-com>
                <button style="width: 100%" class="button button-positive"  @click="saveData">发布</button>
    </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import  FileCom from '../common/FileCom'
    import  date from  '../common/date'
    var _that;
    export default {
        name: "add",
        data(){
            return{
                result:'',
                book:{
                    id:0,
                    bookName:'',
                    bookType:'1',
                    author:'',
                    bookPrice:'20',
                    pubDate:'2013-12-12',
                    bookPub:'',
                    bookPic:'',
                    phone:this.$store.getters.getUser.phone,
                    weiXin:this.$store.getters.getUser.weiXin,
                    des:'',
                },
                urls:[],
            }
        },
        components: {
            FileCom,
            date,
        },
        created(){
            _that=this;
            this.book.id=this.$route.query.id;
            if(parseInt(this.book.id)!=0)
                this.initData();
        },
        mounted() {
           $(".scroll-list-wrap").height(screen.availHeight-$(".tabs-icon-top",window.parent.parent.document).height())+180;
           $(".ql-blank").attr("data-placeholder","备注")
           },
        methods:{
            updateData(){},
            initData(){
                this.$http.post('/book/getById/'+this.book.id).then((res)=>{
                    _that.book=res.data.page.info;
                    _that.book.bookType=1;//先不做处理后面要删除
                    _that.book.pubDate=_that.$toDate(_that.book.pubDate);
                    var arr=_that.book.bookPic.split(',');
                    $.each(arr,(index,item)=>{
                        _that.urls.push({url:_that.$file(item)});
                    })
                })
            },
            saveData(){
                let  url='/book/save';
                if(this.book.id!=0)
                    url='/book/update';
                this.$save(url,this.book,this.$refs.refFiles.files,(msg)=>{
                    console.log(msg);
                })
            }
        }
    }
</script>

<style>
    .editor {
        line-height: normal !important;
        height: 800px;
    }
    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }
    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
        content: '衬线字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
        content: '等宽字体';
    }
</style>
