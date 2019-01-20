<template>
    <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
            <template>
                <div class="list">
                    <label class="form-group item item-input ">
                        <span>电子名称：</span>
                        <input type="text" v-model="electronics.electronicsName">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电子类型：</span>
                        <input type="text" v-model="electronics.electronicsType">
                    </label>
                    <label class="form-group item item-input ">
                        <span>官方价格：</span>
                        <input type="text" v-model="electronics.originalPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格：</span>
                        <input type="text" v-model="electronics.presentPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>购买日期：</span>
                        <input type="text" v-model="electronics.buyDate">
                    </label>
                    <label class="form-group item item-input ">
                        <span>是否有发票：</span>
                        <input type="text" v-model="electronics.hasInvoice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系方式：</span>
                        <input type="text" v-model="electronics.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input type="text" v-model="electronics.des">
                    </label>
                    <file-com ref="refFiles"></file-com>
                    <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import FileCom from '../common/FileCom'
    import $ from 'jquery'
    let _that;
    export default {
        name: "add",
        data() {
            return {
                electronics: {
                    electronicsName: '笔记本',
                    electronicsType: '1',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    electronicsPic: '',
                    weiXin: '15288369144',
                    phone: '15288369144',
                    des: '九成新，完美屏幕，撩妹神器，你值得拥有',
                },
                urls:[],
            }
        },
        components: {
            'file-com': FileCom,
        },
        created(){
            _that=this;
            this.electronics.id=this.$route.query.id;
            if(parseInt(this.electronics.id)!==0)
                this.initData();
        },
        mounted() {
            this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },
        methods:{
            initData(){
                this.$http.post('/electronics/getById/'+this.electronics.id).then((res)=>{
                    _that.electronics=res.data.page.info;
                    _that.electronics.electronicsType=1;//先不做处理后面要删除
                    var arr=_that.electronics.electronicsPic.split(',');
                    $.each(arr,(index,item)=>{
                        _that.urls.push({url:_that.$file(item)});
                    })
                })
            },
            saveData(){
                let  url='/electronics/save';
                if(this.electronics.id!==0)
                    url='/electronics/update';
                this.$save(url,this.electronics,this.$refs.refFiles.files,(msg)=>{
                    console.log(msg);
                })
            }
        }
    }
</script>


