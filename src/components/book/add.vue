<template>
    <div>
        <div class="scroll-list-wrap addWrap">
            <cube-scroll ref="scroll">
                <template>
                    <div class="list">
                        <h1>填写清单</h1>
                        <label class="form-group item item-input ">
                            <span>图书名称：</span>
                            <input type="text" class="isnull" v-model="book.bookName" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input ">
                            <span>图书类型：</span>
                            <cube-select
                                    v-model="value"
                                    :options="options"
                                    @change="change">
                            </cube-select>
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
                            <input type="text" readonly="readonly"
                                   v-model="book.pubDate"
                                   @click="$picker.showDate('type')"
                                   placeholder="请选择出版日期">
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

                        <button id='submit' style="width: 100%" class="button button-positive" @click="saveData">发布
                        </button>
                    </div>

                </template>

            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import FileCom from '../common/FileCom'
    import storage from '../../assets/storage/index'
    import inputEditor from '../common/inputEditor'

    let _that;
    export default {
        name: "add",
        data() {
            return {
                content: '<p></p>',
                result: '',
                options: [],  //下拉选择框
                value: '',
                book: {
                    id: 0,
                    bookName: '',
                    bookType: '',
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
            inputEditor,
        },
        created() {
            _that = this;
            this.initBookTypeSelect();
            this.initDateType();
            this.book.id = this.$route.query.id;
            if ((this.book.id).length > 1)
                this.initData();
        },
        mounted() {
            /* $(".scroll-list-wrap").height(screen.availHeight - $(".tabs-icon-top", window.parent.parent.document).height()) + 180;
             $(".ql-blank").attr("data-placeholder", "备注")*/
        },
        methods: {
            updateData() {
            },
            //初始化出版日期选择
            initDateType(){
                this.$picker.datePicker((val, index, text)=>{
                    _that.book.pubDate=index.join('-');
                });
            },
            //初始化图书类型下拉框
            initBookTypeSelect() {
                let value = storage.getSession("bookType");
                this.options = value.map((item) => {
                    return item.text;
                });
            },
            initData() {
                this.$http.post('/book/getById/' + this.book.id).then((res) => {
                    _that.book = res.data.page.info;
                    _that.book.bookType = 1;//先不做处理后面要删除
                    _that.book.pubDate = _that.$toDate(_that.book.pubDate);
                    let arr = _that.book.bookPic.split(',');
                    $.each(arr, (index, item) => {
                        _that.urls.push({url: _that.$file(item)});
                    })
                })
            },
            saveData() {
                let url = '/book/save';
                if (parseInt(this.book.id) !== 0)
                    url = '/book/update';
                this.$save(url, this.book, this.$refs.refFiles.files, (msg) => {
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm: () => {
                            this.$router.push({path: '/book', query: {flag: 1}})
                        }
                    }).show()
                })
            },
            //类型选择
            change(value, index) {
                this.book.bookType = index + 1;
            }
        }
    }
</script>
<style scoped>
    .scroll-list-wrap {
        height: 94vh;
    }

    .scroll-list-wrap #submit {
        margin-bottom: 20px;
    }

    /*滚动的页面的高度 -by gpj*/
</style>
