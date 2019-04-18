<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <input type="search" placeholder="搜索" v-model="queryList.electronicsName" @change="searchSub">
                    <i class="icon ion-ios-search placeholder-icon" @click="searchSub"></i>
                </label>
                <router-link v-if="power_flag" :to="{path:'/electronicsAdd',query:{id:0}}" class="button button-small button-positive">
                    <i class="icon ion-plus"></i>
                </router-link>
            </div>
            <div style="text-align: center">
                <button  @click="intelSearch" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    筛选
                </button>
            </div>
            <div title="搜索"  v-show="isShow" class="weui-cells">
                <ul>
                    <li class="cube-index-list-item">
                        <div class="weui-cell weui-cell_access"  @click="$picker.show()">
                            <div class="weui-cell__bd">
                                电子类型:
                                <span class="book-name">{{typeName}}</span>
                            </div>
                            <div class="weui-cell__ft" >
                            </div>
                        </div>
                    </li>
                    <li class="cube-index-list-item">
                        <div class="weui-cell weui-cell_access"  >
                            <div class="weui-cell__bd">
                                日期:
                            </div>
                            <input type="text"  readonly="readonly" v-model="queryList.startTime" @click="$picker.showDate()"  class="time-input" placeholder="请选择开始日期" >
                            <span class="line-span"></span>
                            <input type="text"  readonly="readonly" v-model="queryList.endTime" @click="endTime()"  class="time-input" placeholder="请选择结束日期" >
                        </div>
                    </li>
                    <li class="cube-index-list-item">
                        <div class="weui-cell weui-cell_access" @click="$picker.showDialog()" >
                            <div class="weui-cell__bd">
                                价格:
                                <span class="book-name">￥{{queryList.startPrice}}至￥{{queryList.endPrice}}</span>
                            </div>
                            <div class="weui-cell__ft"  >
                            </div>
                        </div>
                    </li>
                    <li class="cube-index-list-item">
                        <cube-button :light="true" @click="searchClear">重置</cube-button>
                        <cube-button :light="true" @click="searchSub">搜索</cube-button>
                    </li>
                </ul>
            </div>
        </div>

        <grid-view :grid="grid" url="/electronics/electronics" :load="load"></grid-view>
    </div>
</template>

<script>
    import $config from "../../webserver/serve/config";
    let  that;
    export default {
        name: 'Electronics',
        data() {
            return {
                msg: '电子',
                grid:{},
                load:0,
                electronicsTypes: [],
                queryList: {
                    electronicsName: '',
                    electronicsType: '1',
                    startTime:'',
                    endTime:'',
                    startPrice:'',
                    endPrice:'',
                },
                isShow:false,
                typeName:''
            }
        },
        computed:{
            power(){
                return this.$store.getters.power;
            },
            power_flag(){
                return this.$store.getters.power_flag;
            }
        },
        created() {
           that=this;
            this.initType();
            this.initGrid();
        },
        methods: {
            initGrid(){
                this.grid={
                    img:'electronicsPic',
                    query:this.queryList,
                    view:this.view,
                    del:this.del,
                    edit:this.update,
                    columns:[
                        {title:"名称",key:'electronicsName'},
                        {title:"型号",key:'electronicsType'},
                        {title:"价格",key:'presentPrice',format:this.setPrice},
                    ],
                };
            },
            setPrice(row){
                return "￥"+ row.presentPrice;
            },
            view(row){
                this.$router.push({path: '/electronicsView', query: {id: row.id}});
            },
            del(row){
                let para = {id: row.id};
                this.$post('/electronics/delete',para);
            },
            update(row){
                this.$router.push({path: '/electronicsAdd', query: {id: row.id}})
            },
            endTime() {
                if (!this.datePicker) {
                    this.datePicker = this.$createDatePicker({
                        title: 'Date Picker',
                        min: new Date(1980, 1, 1),
                        max: new Date(new Date().getFullYear(), 12, 12),
                        value: new Date(),
                        onSelect: this.selectHandle,
                    })
                }
                this.datePicker.show()
            },
            selectHandle(val, index,text) {
                that.queryList.endTime=index.join('-');
            },
            initType() {
                this.$picker.electronicType((val, index,text)=>{
                    that.queryList.electronicsType=val['0'];
                    that.typeName=text['0'];
                });
                this.$picker.datePicker((val, index,text)=>{
                    that.queryList.bookType=val['0'];
                    that.bookTypeName=text['0'];
                });
                this.$picker.datePicker((val, index,text)=>{
                    that.queryList.startTime=index.join('-');
                });
                this.$picker.dialogPicker((val, index)=>{
                    that.queryList.startPrice=val;
                    that.queryList.endPrice=index;
                })
            },
            searchSub() {
                this.isShow =false;//搜索下拉隐藏
                let query = {};
                query['electronicsName'] = this.queryList.electronicsName;
                query['pageSize'] = Number($config.pageSize);
                query['pageNumber'] = 5;
                this.$post('/electronics/electronics', query, (msg) => {
                    this.tables = msg.data.page.pageInfo.list;
                });
            },
            searchClear(){
                that.queryList={
                    electronicsName: '',
                        electronicsType: '1',
                        startTime:'',
                        endTime:'',
                        startPrice:'',
                        endPrice:'',
                },
                that.typeName=''
            },
            intelSearch(){
                this.isShow = !this.isShow
            }
        }
    }
</script>

