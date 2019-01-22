<template>
    <div class="scroll-list-wrap"  >
        <cube-scroll
                ref="scroll"
        >
            <template>
       <div  class="list">
                <label class="form-group item item-input ">
                    <span>图书名称：</span>
                    <input type="text" v-model="book.bookName">
                </label>
                <label class="form-group item item-input ">
                    <span>作者：</span>
                    <input type="text" v-model="book.author">
                </label>
                <label class="form-group item item-input ">
                    <span>出售价格：</span>
                    <input type="text" v-model="book.bookPrice">
                </label>
                <label class="form-group item item-input ">
                    <span>出版日期：</span>
                    <input type="text" v-model="book.pubDate">
                </label>
                <label class="form-group item item-input ">
                    <span>出版社：</span>
                    <input type="text" v-model="book.bookPub">
                </label>
                <label class="form-group item item-input ">
                    <span>联系方式：</span>
                    <input type="text" v-model="book.phone">
                </label>
                <label class="form-group item item-input ">
                    <span>发布日期：</span>
                    <input type="text" v-model="book.pubDate">
                </label>
                <label class="form-group item item-input ">
                    <span>描述：</span>
                    <input type="text" v-model="book.des">
                </label>
               <file-com ref="refFiles" :urls="urls" ></file-com>
                <button style="width: 100%" class="button button-positive"  @click="saveData">发布</button>
    </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import $ from  'jquery'
    import  FileCom from '../common/FileCom'
    var _that;
    export default {
        name: "add",
        data(){
            return{
                book:{
                    id:0,
                    bookName:'',
                    bookType:'1',
                    author:'',
                    bookPrice:'20',
                    pubDate:'2013-12-12',
                    bookPub:'',
                    bookPic:'',
                    weiXin:'',
                    phone:'',
                    des:'',
                },
                urls:[],
            }
        },
        components: {
            'file-com': FileCom,
        },
        created(){
            _that=this;
            this.book.id=this.$route.query.id;
            if(parseInt(this.book.id)!=0)
                this.initData();
        },
        mounted() {
           this.$(".scroll-list-wrap").height(screen.availHeight-this.$(".tabs-icon-top",window.parent.parent.document).height())+80;
        },
        methods:{
            initData(){
                this.$http.post('/book/getById/'+this.book.id).then((res)=>{
                    _that.book=res.data.page.info;
                    _that.book.bookType=1;//先不做处理后面要删除
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


