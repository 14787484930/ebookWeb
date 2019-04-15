<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <input type="search" placeholder="搜索" v-model="queryList.otherName"  @change="search">
                    <i class="search-btn icon ion-ios-search placeholder-icon" @click="search"></i>
                </label>
                <router-link v-if="power_flag" :to="{path:'/otherAdd',query:{id:0}}" class="button button-small button-positive">
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
                        <div class="weui-cell weui-cell_access"   @click="$picker.show()">
                            <div class="weui-cell__bd">
                                类型:
                                <span class="book-name">{{otherShowName}}</span>
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
                            <input type="text" readonly="readonly"  v-model="queryList.startTime" @click="$picker.showDate('type')"  class="time-input" placeholder="请选择开始日期" >
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
                        <cube-button :light="true" @click="search">搜索</cube-button>
                    </li>
                </ul>
            </div>
        </div>
        <grid-view :grid="grid" url="/other/others" :load="load"></grid-view>
    </div>
</template>

<script>
    let  that;
    export default {
        name: 'Other',
        data() {
            return {
                msg: '其他',
                queryList: {
                    otherName: '',
                    otherType: '1',
                    startPrice:'',
                    endPrice:'',
                    startTime:'',
                    endTime:''
                },
                grid:{},
                load:0,
                otherShowName:'',
                isShow:false,
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
            this.initGrid();
            this.initType();
        },
        methods: {
            initGrid(){
                this.grid={
                    img:'otherPic',
                    query:this.queryList,
                    view:(row)=>that.$router.push({path: '/otherView', query: {id: row.id}}),
                    del:(row)=> that.$post('/book/delete',row),
                    edit:(row)=>that.$router.push({path: '/otherAdd', query: {id: row.id}}),
                    columns:[
                        {title:"名称",key:'otherName'},
                        {title:"价格",key:'presentPrice',format:(row)=>"￥"+ row.presentPrice},
                    ],
                };
            },
            search(){
                this.load++;
                console.log(this.load);
                let query =this.queryList;
                console.log(query);
                this.isShow =false;//搜索下拉隐藏
                this.initGrid();
            },
            searchClear(){
                that.queryList={
                    bookName:'',
                    bookType:'',
                    startPrice:'',
                    endPrice:'',
                    startTime:'',
                    endTime:''
                }
                that.bookTypeName=''
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
            initType(){
                this.$picker.teachTypes((val, index,text)=>{
                    that.queryList.teachType=val['0'];
                    that.otherShowName=text['0'];
                });
                this.$picker.datePicker((val, index,text)=>{
                    that.queryList.startTime=index.join('-');
                });
                this.$picker.dialogPicker((val, index)=>{
                    that.queryList.startPrice=val;
                    that.queryList.endPrice=index;
                })
            },
            intelSearch(){
                this.isShow = !this.isShow
            }
        }
    }
</script>

