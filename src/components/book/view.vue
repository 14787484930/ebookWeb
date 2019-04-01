<template>
    <div>
        <div class="scroll-list-wrap" he>
            <cube-scroll ref="scroll">
                <cube-slide ref="slide" :data="urls" >
                    <cube-slide-item v-for="(item, index) in urls" :key="index">
                        <img :src="item.image" @click="showImagePreview(item.image)" class="book-imgs" >
                    </cube-slide-item>
                </cube-slide>
                <template>
                    <div class="list">
                        <label class="form-group item item-input ">
                            <span>图书名称：</span>
                            <span>{{book.bookName}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>作者：</span>
                            <span>{{book.author}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>出售价格：</span>
                            <span>{{book.bookPrice}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>出版日期：</span>
                            <span>{{book.pubDate}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>出版社：</span>
                            <span>{{book.bookPub}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>联系方式：</span>
                            <span>{{book.phone}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>发布日期：</span>
                            <span>{{book.pubDate}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>描述：</span>
                            {{book.des}}
                        </label>
                    </div>
                </template>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import { Dialog } from 'cube-ui'
    export default {
        //name: "view",
        data() {
            return {
                //获取详细信息
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

                //图片地址轮播
                urls: [],
            }
        },
        created(){
            this.book.id=this.$route.query.id;
            if(parseInt(this.book.id)!=0)
                this.initData();
            else
                console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },
        mounted() {
            console.log(123);
           // this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData(){
                var _that=this;
                const toast = this.$createToast({
                    time: 0,
                    txt: '加载中...'
                });
                toast.show();
                this.$http.post('/book/getById/'+this.book.id).then((res)=>{
                    toast.hide();
                    _that.book=res.data.page.info;
                    _that.book.bookType=1;//先不做处理后面要删除
                    var arr=_that.book.bookPic.split(',');
                    $.each(arr,(index,item)=>{
                        _that.urls.push({image:_that.$file(item)});
                    })
                });
                console.log(_that.book);
            },
             showImagePreview(src) {
                this.$createImagePreview({
                    imgs:[src],
                }).show()
             }
        },
    }

</script>
<style scoped>
.scroll-list-wrap{ height: 15.3rem;}
.cube-slide-item{ text-align: center;}
.book-imgs{padding: 0 .05rem 0 .04rem; height: 5.34rem;max-width: 100%;}
</style>
