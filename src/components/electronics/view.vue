<template>
    <div>
        <cube-slide ref="slide" :data="urls" align="center">
            <cube-slide-item v-for="(item, index) in urls" :key="index">
                <img :src="item.image" @click="showImagePreview(item.image)" height="200px">
            </cube-slide-item>
        </cube-slide>

        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <template>
                    <div class="list">
                        <label class="form-group item item-input ">
                            <span>电子名称：</span>
                            <span>{{electronics.electronicsName}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>电子类型：</span>
                            <span>{{electronics.electronicsType}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>官方价格(元)：</span>
                            <span>{{electronics.originalPrice}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>出售价格(元)：</span>
                            <span>{{electronics.presentPrice}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>购买日期：</span>
                            <span>{{electronics.buyDate}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>是否有发票：</span>
                            <span v-if="electronics.hasInvoice" >有发票</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>联系方式：</span>
                            <span>{{electronics.phone}}</span>
                        </label>
                        <label class="form-group item item-input ">
                            <span>描述：</span>
                            {{electronics.des}}
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
            if(parseInt(this.electronics.id)!=0)
                this.initData();
            else
                console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },

        mounted() {
           // this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData(){
                this.$http.post('/electronics/getById/'+this.electronics.id).then((res)=>{
                    _that.electronics=res.data.page.info;
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

</style>
