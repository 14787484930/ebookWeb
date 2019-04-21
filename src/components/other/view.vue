<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <cube-slide ref="slide" :data="urls" align="center">
                    <cube-slide-item v-for="(item, index) in urls" :key="index">
                        <img border="0" :src="item.image"  @click="showImagePreview(item.image)" height="200px">
                    </cube-slide-item>
                </cube-slide>
                <template>
                    <div class="listHead">
                        <div class="relPrice"><i class="priceTip">出售价</i><strong>￥{{other.presentPrice}}</strong></div>
                        <div class="defaultPrice">原价：<span>￥{{other.originalPrice}}</span></div>
                    </div>
                    <ul class="list">
                        <li class="item">
                            <span>物品名称：</span>
                            <span>{{other.otherName}}</span>
                        </li>
                        <li class="item">
                            <span>官方价格(元)：</span>
                            <span>{{other.originalPrice}}</span>
                        </li>
                        <li class="item">
                            <span>出售价格(元)：</span>
                            <span>{{other.presentPrice}}</span>
                        </li>
                        <li class="item">
                            <span>购买日期：</span>
                            <span>{{other.buyDate}}</span>
                        </li>
                        <li class="item">
                            <span>是否有发票：</span>
                            <span>{{other.hasInvoice}}</span>
                        </li>
                        <li class="item" v-if="power">
                            <span>联系电话：</span>
                            <span>{{other.phone}}</span>
                        </li>
                        <li class="item" v-if="power">
                            <span>微信：</span>
                            <span>{{other.weiXin}}</span>
                        </li>
                        <li class="item item-desc">
                            <span>描述：</span>
                            {{other.des}}
                        </li>
                    </ul>
                </template>
                <report-button :product="{productId: other.id ,
         productName: other.otherName,
         productType: other.otherType}">
                </report-button>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import reportButton from '../common/report'
    import $ from 'jquery';
    let _that;

    export default {
        components: {
            reportButton
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
        created(){
            _that=this;
            this.other.id=this.$route.query.id;
            if(parseInt(this.other.id)!=0)
                this.initData();
            //else
               // console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },
        computed:{
            power(){
                return this.$store.getters.power;
            }
        },

        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData(){
                this.$http.post('/other/getById/'+this.other.id).then((res)=>{
                    _that.other=res.data.page.info;
                    _that.other.buyDate=_that.$toDate(_that.other.buyDate);
                    _that.other.otherType=1;//先不做处理后面要删除
                    var arr=_that.other.otherPic.split(',');
                    $.each(arr,(index,item)=>{
                        _that.urls.push({image:_that.$file(item)});
                    })
                });
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
    .scroll-list-wrap{ height: 16.4rem;}
</style>
