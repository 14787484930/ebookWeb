<template>
    <div class="scroll-list-wrap addWrap">
        <cube-scroll ref="scroll">
            <template>
                <div class="list">
                    <h1>填写清单</h1>
                    <label class="form-group item item-input ">
                        <span>物品名称：</span>
                        <input type="text" class="isnull" v-model="other.otherName" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>官方价格(元)：</span>
                        <input type="text"  v-model="other.originalPrice" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格(元)：</span>
                        <input type="text"  class="isnull" v-model="other.presentPrice" placeholder="点此填写">
                    </label>
                    <label class="form-group item ">
                        <span>购买日期：</span>
                        <date v-model="other.buyDate"></date>
                    </label>
                    <label class="form-group item item-input ">
                        <span>是否有发票：</span>
                        <!--<input type="text" v-model="other.hasInvoice">-->
                        <cube-switch v-model="value" v-on:change="hasInvoice">
                            <!--是否有发票-->
                        </cube-switch>
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系方式：</span>
                        <input type="text"  class="isnull tel" v-model="other.phone" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input type="text" class="isnull" v-model="other.weiXin" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input type="text" v-model="other.des">
                    </label>
                    <file-com ref="refFiles" :urls="urls" ></file-com>
                    <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import FileCom from '../common/FileCom'
    import $ from 'jquery'
    import Date from  '../common/date'
    let _that;
    export default {
        name: "add",
        data() {
            return {
                value: true,
                other: {
                    otherName: '',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    otherPic: '',
                    phone:this.$store.getters.getUser.phone,
                    weiXin:this.$store.getters.getUser.weiXin,
                    des: '',
                },
                urls:[],
            }
        },
        components: {
            'file-com': FileCom,
            Date,
        },
        created(){
            _that=this;
            this.other.id=this.$route.query.id;
            if(parseInt(this.other.id)!==0)
                this.initData();
        },
        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },
        methods:{
            initData(){
                this.$http.post('/other/getById/'+this.other.id).then((res)=>{
                    //_that.other=res.data.page.info;
                    for(let i in this.other){
                        _that.other[i] = res.data.page.info[i];
                    }
                    _that.other.buyDate=_that.$toDate(_that.other.buyDate);
                    _that.other.otherType=1;//先不做处理后面要删除
                    var arr=_that.other.otherPic.split(',');
                    $.each(arr,(index,item)=>{
                        _that.urls.push({url:_that.$file(item)});
                    })
                })
            },
            saveData(){
                let  url='/other/save';
                if(this.other.id!=0)
                {
                    _that.other["otherPic"] = "";
                    url='/other/update';
                }
                this.$save(url,this.other,this.$refs.refFiles.files,(msg)=>{
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm:()=>{
                            this.$router.push({path: '/other'})
                        }
                    }).show()
                })
            },
            hasInvoice(){
                if (this.value){
                    this.other.hasInvoice='1';
                } else{
                    this.other.hasInvoice='0';
                }
            },
        }
    }
</script>

<style scoped>
.scroll-list-wrap{height: 94vh;}/*滚动的页面的高度 -by gpj*/
</style>
