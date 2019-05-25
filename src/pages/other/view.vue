<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <slider :pic-urls="urls"></slider>
                <template>
                    <div class="listHead">
                        <div class="relPrice"><i class="priceTip">出售价</i><strong>￥{{other.presentPrice}}</strong></div>
                        <div class="defaultPrice">原价：<span>￥{{other.originalPrice}}</span></div>
                    </div>
                    <ul class="list">
                        <li class="item item-input">
                            <span>物品名称：</span>
                            <span>{{other.otherName}}</span>
                        </li>
                        <li class="item item-input">
                            <span>官方价格(元)：</span>
                            <span>{{other.originalPrice}}</span>
                        </li>
                        <li class="item item-input">
                            <span>出售价格(元)：</span>
                            <span>{{other.presentPrice}}</span>
                        </li>
                        <li class="item item-input">
                            <span>购买日期：</span>
                            <span>{{other.buyDate}}</span>
                        </li>
                        <li class="item item-input">
                            <span>是否有发票：</span>
                            <span>{{other.hasInvoice}}</span>
                        </li>
                        <li class="item item-input" v-if="power">
                            <span>联系电话：</span>
                            <span>{{other.phone}}</span>
                        </li>
                        <li class="item item-input" v-if="power">
                            <span>微信：</span>
                            <span>{{other.weiXin}}</span>
                        </li>
                        <li class="item item-desc">
                            <span>描述：</span>
                            <span>{{other.des}}</span>
                        </li>
                    </ul>
                </template>
                <router-link class="report-style" v-if="!power_flag"
                             :to="{path:'/report', query:{productId: other.id ,
                               productName: other.otherName,productType: 3}}">举报
                </router-link>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import slider from '../../components/slider'
    import $ from 'jquery';

    let _that;

    export default {
        components: {
            slider
        },
        data() {
            return {
                //获取详细信息
                other: {
                    otherName: '',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    otherPic: '',
                    weiXin: '',
                    phone: '',
                    des: '',
                },

                //图片地址轮播
                urls: [],
            }
        },
        created() {
            _that = this;
            this.other.id = this.$route.query.id;
            if ((this.other.id).length > 0)
                this.initData();
            //else
            // console.log('[error]选择的物品id为0，请检查物品id是否正确!');
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
                this.$http.post('/other/getById/' + this.other.id).then((res) => {
                    _that.other = res.data.page.info;
                    _that.other.buyDate = _that.$toDate(_that.other.buyDate);
                    _that.other.otherType = 1;//先不做处理后面要删除
                    var arr = _that.other.otherPic.split(',');
                    $.each(arr, (index, item) => {
                        _that.urls.push({image: _that.$file(item)});
                    })
                });
            }
        },
    }

</script>

<style scoped>
    .scroll-list-wrap {
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

    /*滚动的页面的高度 -by gpj*/
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
