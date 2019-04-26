<template>
    <div>

    <div class="scroll-list-wrap addWrap">
        <cube-scroll
                ref="scroll"
        >
            <template>
                <div class="list">
                    <h1>填写清单</h1>
                    <label class="form-group item item-input ">
                        <span>图书名称：</span>
                        <input type="text" class="isnull" v-model="book.bookName" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>作者：</span>
                        <input type="text" class="isnull" v-model="book.author" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格(元)：</span>
                        <input type="number" class="isnull" v-model="book.bookPrice" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出版日期：</span>
                        <date v-model="book.pubDate"></date>
                    </label>
                    <label class="form-group item item-input ">
                        <span>出版社：</span>
                        <input type="text" v-model="book.bookPub" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系电话：</span>
                        <input type="text" class="tel isnull" v-model="book.phone" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input type="text" class="isnull" v-model="book.weiXin" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>备注：</span>
                        <input type="text" v-model="book.des" placeholder="点此填写">
                    </label>

                     <file-com ref="refFiles" :urls="urls"></file-com>

                    <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                </div>

            </template>

        </cube-scroll>
    </div>
    </div>
</template>

<script>
    import FileCom from '../common/FileCom'
    import date from '../common/date'
    import inputEditor from '../common/inputEditor'
    var _that;
    export default {
        name: "add",
        data() {
            return {
                content:'<p></p>',
                result: '',
                book: {
                    id: 0,
                    bookName: '',
                    bookType: '1',
                    author: '',
                    bookPrice: '20',
                    pubDate: '2013-12-12',
                    bookPub: '',
                    bookPic: '',
                    phone: this.$store.getters.getUser.phone,
                    weiXin: this.$store.getters.getUser.weiXin,
                    des: '',
                },
                urls: [],
            }
        },
        components: {
            FileCom,
            date,
            inputEditor,
        },
        created() {
            _that = this;
            this.book.id = this.$route.query.id;
            if ((this.book.id).length > 1)
                this.initData();
        },
        mounted() {
            $(".scroll-list-wrap").height(screen.availHeight - $(".tabs-icon-top", window.parent.parent.document).height()) + 180;
            $(".ql-blank").attr("data-placeholder", "备注")
        },
        methods: {
            updateData() {
            },
            initData() {
                this.$http.post('/book/getById/' + this.book.id).then((res) => {
                    _that.book = res.data.page.info;
                    _that.book.bookType = 1;//先不做处理后面要删除
                    _that.book.pubDate = _that.$toDate(_that.book.pubDate);
                    var arr = _that.book.bookPic.split(',');
                    $.each(arr, (index, item) => {
                        _that.urls.push({url: _that.$file(item)});
                    })
                })
            },
            saveData() {
                let url = '/book/save';
                if (this.book.id != 0)
                    url = '/book/update';
                this.$save(url, this.book, this.$refs.refFiles.files, (msg) => {
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm:()=>{
                            this.$router.push({path: '/book',query: {flag: 1}})
                        }
                    }).show()
                })
            }
        }
    }
</script>
<style scoped>
.scroll-list-wrap{height: 94vh;}/*滚动的页面的高度 -by gpj*/
</style>
