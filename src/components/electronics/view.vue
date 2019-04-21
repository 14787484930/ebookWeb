<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <cube-slide ref="slide" :data="urls" align="center">
                    <cube-slide-item v-for="(item, index) in urls" :key="index">
                        <img :src="item.image" @click="showImagePreview(item.image)" height="200px">
                    </cube-slide-item>
                </cube-slide>
                <template>
                    <div class="listHead">
                        <div class="relPrice"><i class="priceTip">出售价</i><strong>￥{{electronics.presentPrice}}</strong></div>
                        <div class="defaultPrice">原价：<span>￥{{electronics.originalPrice}}</span></div>
                    </div>
                    <ul class="list">
                        <li class="item">
                            <span>品名：</span>
                            <strong>{{electronics.electronicsName}}</strong>
                        </li>

                        <li class="item">
                            <span>电子类型：</span>
                            <span>{{electronics.electronicsType}}</span>
                        </li>

                        <li class="item">
                            <span>购买日期：</span>
                            <span>{{electronics.buyDate}}</span>
                        </li>
                        <li class="item">
                            <span>是否有发票：</span>
                            <span v-if="electronics.hasInvoice" >有发票</span>
                        </li>
                        <li class="item" v-if="power">
                            <span>联系电话：</span>
                            <span>{{electronics.phone}}</span>
                        </li>
                        <li class="item" v-if="power">
                            <span>微信：</span>
                            <span>{{electronics.weiXin}}</span>
                        </li>
                        <li class="item item-desc">
                            <span>描述：</span>
                            <span>{{electronics.des}}</span>
                        </li>
                    </ul>
                </template>
                <report-button :product="{productId: electronics.id ,
         productName: electronics.electronicsName,
         productType: electronics.electronicsType}">
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
          reportButton,
        },
        //name: "view",
        data() {
            return {
                //获取详细信息
                electronics: {
                    electronicsName: '',
                    electronicsType: '1',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    electronicsPic: '',
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
            this.electronics.id=this.$route.query.id;
            if((this.electronics.id).length!==0)
                this.initData();
            else
                console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },
        computed:{
            power(){
                return this.$store.getters.power;
            }
        },
        mounted() {
           // this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData(){
                this.$http.post('/electronics/getById/'+this.electronics.id).then((res)=>{
                    _that.electronics=res.data.page.info;
                    _that.electronics.buyDate=_that.$toDate(_that.electronics.buyDate);
                    _that.electronics.electronicsType=1;//先不做处理后面要删除
                    var arr=_that.electronics.electronicsPic.split(',');
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
    .scroll-list-wrap{height: 93vh;}
</style>
