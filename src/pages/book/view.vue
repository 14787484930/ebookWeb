<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <slider :pic-urls="urls"></slider>
                <template>
                    <div class="listHead">
                        <div class="relPrice"><i class="priceTip">出售价</i><strong>￥{{book.bookPrice}}</strong></div>
                    </div>
                    <ul class="list">
                        <li class="item item-input">
                            <span>图书名称：</span>
                            <p>{{book.bookName}}</p>
                        </li>
                        <li class="item item-input">
                            <span>作者：</span>
                            <p>{{book.author}}</p>
                        </li>
                        <!--<li class="form-group item">
                            <span>出售价格：</span>
                            <span>{{book.bookPrice}}</span>
                        </li>-->
                        <li class="item item-input">
                            <span>出版日期：</span>
                            <p>{{book.pubDate}}</p>
                        </li>
                        <li class="item item-input">
                            <span>出版社：</span>
                            <p>{{book.bookPub}}</p>
                        </li>
                        <li class="item item-input">
                            <span>类型：</span>
                            <p>{{book.bookType}}</p>
                        </li>
                        <li class="item item-input" v-if="power">
                            <span>联系电话：</span>
                            <p>{{book.phone}}</p>
                        </li>
                        <li class="item item-input" v-if="power">
                            <span>微信：</span>
                            <p>{{book.weiXin}}</p>
                        </li>
                        <li class="item item-input">
                            <span>发布日期：</span>
                            <p>{{book.pubDate}}</p>
                        </li>
                    </ul>
                    <div class="item item-desc">
                        <span>描述：</span>
                        <div>{{book.des}}</div>
                    </div>
                </template>
                <router-link class="report-style" v-if="!power_flag"
                             :to="{path:'/report', query:{productId: book.id ,
                              productName: book.bookName,productType: 1}}">举报
                </router-link>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import storage from '../../assets/storage/index'
    import slider from '../../components/slider'
    import $ from 'jquery';

    export default {
        //name: "view",
        components: {
            slider,
        },
        data() {
            return {
                //获取详细信息
                book: {
                    id: 0,
                    bookName: '',
                    bookType: '',
                    author: '',
                    bookPrice: '20',
                    pubDate: '2013-12-12',
                    bookPub: '',
                    bookPic: '',
                    weiXin: '',
                    phone: '',
                    des: '',
                },

                //图片地址轮播
                urls: [],
            }
        },
        created() {
            this.book.id = this.$route.query.id;
            if ((this.book.id).length > 1)
                this.initData();
            else
                console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },
        computed: {
            power() {
                return this.$store.getters.power;
            },
            power_flag() {
                return this.$store.getters.power_flag;
            }
        },
        methods: {
            initData() {
                let _that = this;
                const toast = this.$createToast({
                    time: 0,
                    txt: '加载中...'
                });
                toast.show();
                this.$http.post('/book/getById/' + this.book.id).then((res) => {
                    toast.hide();
                    _that.book = res.data.page.info;
                    _that.book.bookType = _that.getBookTypeName(_that.book.bookType);
                    let arr = _that.book.bookPic.split(',');
                    $.each(arr, (index, item) => {
                        _that.urls.push({image: _that.$file(item)});
                    })
                });
            },
            /**
             * 将类型由数字改为字符串
             * @param typeNum
             * @returns {*}
             */
            getBookTypeName(typeNum) {
                let key = "bookType";
                let aValue = storage.getSession(key);
                let value = aValue[typeNum - 1].text;
                if (typeof value === undefined) {
                    value = "未知";
                    console.error('BookView getBookTypeName: value error')
                }
                return value;
            }
        },
    }

</script>
<style lang="scss" scoped>
    .scroll-list-wrap{
        position: absolute;
        top: -73px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 10;
        padding-top: 1.95rem;
        height: 111vh;
    }

    .cube-slide-item {
        text-align: center;
    }

    .item-desc {
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
    }

    .report-style {
        float: right;
        font-size: 13px;
        margin-right: 20px;
        margin-bottom: 40px;
    }

    ul li {
        font-size: 15px;
        border: 0;
        line-height: 20px;
    }

    div {
        border: 0;
    }

</style>
