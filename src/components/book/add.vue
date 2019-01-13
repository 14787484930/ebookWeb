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
               <file-com ref="refFiles"></file-com>
                <button style="width: 100%" class="button button-positive"  @click="saveData">发布</button>
    </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import  FileCom from '../common/FileCom'
    import  $ from  'jquery'
    export default {
        name: "add",
        data(){
            return{
                book:{
                    bookName:'童年三部曲',
                    bookType:'1',
                    author:'高尔基',
                    bookPrice:'20',
                    pubDate:'2013-12-12',
                    bookPub:'西南林业大学出版社',
                    bookPic:'',
                    weiXin:'15288369144',
                    phone:'15288369144',
                    des:'俄罗斯作家世界名著',
                }
            }
        },
        components: {
            'file-com': FileCom,
        },
        mounted() {
           this.$(".scroll-list-wrap").height(screen.availHeight-this.$(".tabs-icon-top",window.parent.parent.document).height())+80;
        },
        methods:{
            saveData(){
                console.log(this.$refs.refFiles.form);
                let form=new FormData();
                form=this.$refs.refFiles.form;
                form.append('book',JSON.stringify(this.book));
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization':'123'
                    }
                }
                $.each(this.book,(key,item)=>{
                    form.append(key,item);
                })
                this.$http.post('/book/save',form,config).then(function (res) {
                    if (res.status === 200) {
                        /*这里做处理*/
                    }})
            }
        }
    }
</script>


