<template>
    <div>
        <cube-slide ref="slide" :data="urls" align="center">
            <cube-slide-item v-for="(item, index) in urls" :key="index">
                <img border="0" :src="item.image" height="200px">
            </cube-slide-item>
        </cube-slide>

        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <template>
                    <div class="list">
                        <label class="form-group item item-input ">
                            <span>物品名称：</span>
                            <span>{{other.otherName}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>官方价格(元)：</span>
                            <span>{{other.originalPrice}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>出售价格(元)：</span>
                            <span>{{other.presentPrice}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>购买日期：</span>
                            <span>{{other.buyDate}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>是否有发票：</span>
                            <span>{{other.hasInvoice}}</span>
                        </label>
                        <label class="form-group item item-input " v-if="power">
                            <span>联系方式：</span>
                            <span>{{other.phone}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>描述：</span>
                            {{other.des}}
                        </label>
                    </div>
                </template>
            </cube-scroll>
        </div>

    </div>


</template>

<script>
    import $ from 'jquery';
    let _that;

    export default {
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
        },
    }

</script>

<style scoped>

</style>
