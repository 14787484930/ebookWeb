<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper searchBox">
                    <input class="search-btn" type="search" placeholder="搜索" v-model="queryList.name" @change="search">
                    <i class="search-btn icon ion-ios-search placeholder-icon" @click="search"></i>
                </label>
                <router-link v-if="power_flag" :to="{path:'/teachAdd', query:{id:0}}"
                             class="button button-small button-positive">
                    <i class="icon ion-plus"></i>
                </router-link>
            </div>
            <div style="text-align: center;background-color: #fff;">
                <button @click="intelSearch" class="button  button-light icon-right  ion-android-arrow-dropdown">
                    筛选
                </button>
            </div>
            <div title="搜索" v-show="isShow" class="search-cells">
                <ul>
                    <li class="cube-index-list-item">
                        <div class="search-cell search-cell_access" @click="$picker.showDialog()">
                            <div class="search-cell__bd">
                                价格:
                                <span class="book-name">
                                    <span class="green">￥{{queryList.startPrice}}</span>&nbsp;&nbsp;至&nbsp;&nbsp;<span
                                        class="green">￥{{queryList.endPrice}}</span>
                                </span>
                            </div>
                            <div class="search-cell__ft">
                            </div>
                        </div>
                    </li>
                    <li class="cube-index-list-item">
                        <div class="search-cell search-cell_access" @click="$picker.show()">
                            <div class="search-cell__bd">
                                类型:
                                <span class="book-name green">{{teachShowName}}</span>
                            </div>
                            <div class="search-cell__ft">
                            </div>
                        </div>
                    </li>
                    <li class="cube-index-list-item">
                        <div class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                日期:
                            </div>
                            <input type="text" readonly="readonly" v-model="queryList.startTime"
                                   @click="$picker.showTime('type')" class="time-input" placeholder="请选择开始时间">
                            <span class="line-span">——</span>
                            <input type="text" readonly="readonly" v-model="queryList.endTime"
                                   @click="$picker.showEndTime()"
                                   class="time-input" placeholder="请选择结束时间">
                        </div>
                    </li>

                    <li class="cube-index-list-item">
                        <cube-button style="width: 50%" :light="true" @click="searchClear">重置</cube-button>
                        <cube-button style="width: 50%" :light="true" @click="search">搜索</cube-button>
                    </li>
                </ul>
            </div>
        </div>
        <grid-view :grid="grid" url="/tutoring/tutorings" :load="load"></grid-view>
    </div>
</template>

<script>
    let that;
    import gridView from '../../components/gridView'
    export default {
        name: 'Teach',
        components: {
            gridView,
        },
        data() {
            return {
                queryList: {
                    type: '',
                    name: '',
                    startPrice: '',
                    endPrice: '',
                    startTime: '',
                    endTime: ''
                },
                teachShowName: '',
                isShow: false,
                grid: {},
                load: 0,
            }
        },
        computed: {
            power() {
                return this.$store.getters.power;
            },
            power_flag() {
                return this.$store.getters.power_flag;
            }
        },
        created() {
            that = this;
            this.initGrid();
            this.initType();
        },
        methods: {
            initGrid() {
                this.grid = {
                    query: this.queryList,
                    del: this.del,
                    view: (row) => that.$router.push({path: '/teachView', query: {id: row.id}}),
                    edit: (row) => that.$router.push({path: '/teachAdd', query: {id: row.id}}),
                    columns: [
                        {title: "名称", key: 'name'},
                        {title: "报酬", key: 'price', format: (row) => "￥" + row.price},
                        {title: "类型", key: 'type', format: (row) => row.type == 0 ? '辅导' : '讲座'},
                        {title: "日期", key: 'Time', format: (row) => that.$toDate(row.startTime)},
                    ],
                };
            },
            del(row, callback) {
                let para = {id: row.id};
                that.$post('/tutoring/delete', para, (msg) => {
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '删除成功 ',
                        icon: 'cubeic-right',
                        onConfirm: () => {
                            callback(msg.data.code);
                        }
                    }).show()
                });
            },
            search() {
                this.load++;
                // console.log(this.load);
                let query = this.queryList;
                // console.log(query);
                this.isShow = false;//搜索下拉隐藏
                this.initGrid();
            },
            searchClear() {
                Object.keys(that.queryList).forEach((key) => {
                    that.queryList[key] = '';
                });
                that.teachShowName = ''
            },
            initType() {
                this.$picker.teachTypes((val, index, text) => {
                    that.queryList.type = val['0'];
                    that.teachShowName = text['0'];
                });
                this.$picker.timePicker((val, index, text) => {
                    let value = that.$toDate(val, "yyyy-MM-dd HH:mm")
                    that.queryList.startTime = value;
                });
                this.$picker.timeEndPicker((val, index, text) => {
                    let value = that.$toDate(val, "yyyy-MM-dd HH:mm")
                    that.queryList.endTime = value;
                });
                this.$picker.dialogPicker((val, index) => {
                    that.queryList.startPrice = val;
                    that.queryList.endPrice = index;
                })
            },
            intelSearch() {
                this.isShow = !this.isShow
            }
        }
    }
</script>

