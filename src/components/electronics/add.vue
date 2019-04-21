<template>
    <div class="scroll-list-wrap addWrap">
        <cube-scroll ref="scroll">
            <template>
                <div class="list">
                    <h1>填写清单</h1>
                    <label class="form-group item item-input ">
                        <span>电子名称：</span>
                        <input type="text" class="isnull" v-model="electronics.electronicsName" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电子类型：</span>
                        <!--<p>下拉列表来显示</p>-->
                        <!--<input type="text" v-model="electronics.electronicsType">-->
                        <!--在这里可否用键值对？？？-->
                        <cube-select
                                     v-model="value"
                                :options="options"
                                @change="change">
                        </cube-select>
                    </label>
                    <label class="form-group item item-input ">
                        <span>官方价格：</span>
                        <input placeholder="点此填写" type="text" class="isnull"  v-model="electronics.originalPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格(元)：</span>
                        <input placeholder="点此填写" type="text" class="isnull"  v-model="electronics.presentPrice">
                    </label>
                    <label class="form-group item">
                        <span>购买日期：</span>
                        <Date v-model="electronics.buyDate"></Date>
                    </label>
                    <label class="form-group item item-input ">
                        <span>是否有发票：</span>
                        <cube-switch v-model="isInvoice"  v-on:change="hasInvoice"></cube-switch>
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系电话：</span>
                        <input placeholder="点此填写" type="text" class="isnull tel"  v-model="electronics.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input placeholder="点此填写" type="text" class="isnull" v-model="electronics.weiXin">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input placeholder="点此填写" type="text" v-model="electronics.des">
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
    import Date from "../common/date";
    let _that;
    export default {
        name: "add",
        data: function () {
            return {
                isInvoice: true,
                options: ['手机/配件', '电脑/配件', '移动存储', '网络设备','游戏设备', '音响/耳机', '摄影摄像','吹风/风扇','其他'],
                // options:[1,2,3,4,5,6,7,8,9,10],
                value: '',
                electronics: {
                    electronicsName: '',
                    electronicsType: '1',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    electronicsPic: '',
                    phone:this.$store.getters.getUser.phone,
                    weiXin:this.$store.getters.getUser.weiXin,
                    des: '',
                },
                urls: [],
            }
        },
        components: {
            Date,
            'file-com': FileCom,
        },
        created(){
            _that=this;
            this.electronics.id=this.$route.query.id;
            if(parseInt(this.electronics.id)!==0)
                this.initData();
        },
        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },
        methods:{
            initData(){
                this.$http.post('/electronics/getById/'+this.electronics.id).then((res)=>{
                    //_that.electronics=res.data.page.Info;
                    for(let i in this.electronics){
                        _that.electronics[i] = res.data.page.info[i];
                    }
                    _that.electronics.buyDate=_that.$toDate(_that.electronics.buyDate);
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
                {
                    _that.electronics["electronicsPic"] = "";
                    url='/electronics/update';
                }

                this.$save(url,this.electronics,this.$refs.refFiles.files,(msg)=>{
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm:()=>{
                            this.$router.push({path: '/electronics'})
                        }
                    }).show()
                })
            },
            hasInvoice(){
                if (this.value){
                    this.electronics.hasInvoice='1';
                } else{
                    this.electronics.hasInvoice='0';
                }
            },
            //类型选择
            change(value, index) {
                this.electronics.electronicsType = index + 1;
            }
        }
    }
</script>


