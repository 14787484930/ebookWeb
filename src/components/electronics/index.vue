<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <i class="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="搜索" v-model="queryList.electronicsName" @keypress="searchSub">
                </label>
                <router-link :to="{path:'/electronicsAdd',query:{id:0}}" class="button button-small button-positive">
                    <i class="icon ion-plus"></i>
                </router-link>
            </div>
            <div style="text-align: center">
                <button  @click="$picker.show()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    电子类型
                </button>
                <button  @click="$picker.showDate()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    购买日期
                </button>
                <button  @click="$picker.showDialog()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    价格
                </button>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <cube-swipe>
                    <template>
                        <div class="list">
                            <transition-group name="swipe" tag="ul">
                                <span v-for="(item,index) in tables" :key="item.id">
                                    <cube-swipe-item ref="reftables" v-bind:btns="btns" :index="index"
                                                     @btn-click="updateElectronics">
                                        <router-link :to="{path:'/electronicsView',query:{id:item.id}}">
                                            <a class="item item-thumbnail-left" href="#">
                                                <img :src="$file(item.electronicsPic)">
                                                <p>名称：{{item.electronicsName}}</p>
                                                <p>型号：</p>
                                                <p>价格：￥{{item.presentPrice}}</p>
                                            </a>
                                        </router-link>
                                    </cube-swipe-item>
                                </span>
                            </transition-group>
                        </div>
                    </template>
                </cube-swipe>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import $config from "../../webserver/serve/config";

    export default {
        name: 'Electronics',
        data() {
            return {
                msg: '电子',
                btns: [
                    {
                        action: 'edit',
                        text: '编辑',
                        color: '#223a32'
                    },
                    {
                        action: 'del',
                        text: '删除',
                        color: '#ff3a32'
                    }
                ],
                electronicsTypes: [],
                columns: [],
                queryList: {
                    electronicsName: '',
                    electronicsType: '1',
                },
                tables: [],
            }
        },

        computed: {
            /*options() {
                return {
                    scrollbar:{ fade: true } ,//或false
                    startY: 0
                }
            },*/
        },
        created() {
            this.initType();
            this.initTables();
        },
        mounted() {
            $(".scroll-list-wrap").height(screen.availHeight - $("#head").height() - $(".tabs-icon-top", window.parent.parent.document).height());
        },
        methods: {
            updateElectronics(btn, index) {
                let id = this.tables[index].id;
                //删除数据
                if (btn.action === 'del') {
                    this.$post('/electronics/delete', this.tables[index], (msg) => {
                        console.log(msg);
                    })
                }
                else
                    this.$router.push({path: '/electronicsAdd', query: {id: id}})
            },
            initTables() {
                let _that = this;
                this.$table('/electronics/electronics', this.queryList, data => {
                    _that.tables = data.list;
                    console.log(data.list);
                })
            },
            initType() {
                this.$picker.electronicType((val, index, text)=>{
                    that.queryList.electronicsType=val;
                    that.initTables();
                });
                this.$picker.datePicker((val, index,text)=>{
                    console.log(val);
                    console.log(index);
                    console.log(text);
                });
                this.$picker.dialogPicker((low,up)=>{
                    console.log(low);
                    console.log(up);
                })
            },
            searchSub() {
                let query = {};
                query['electronicsName'] = this.queryList.electronicsName;
                query['pageSize'] = Number($config.pageSize);
                query['pageNumber'] = 5;
                this.$post('/electronics/electronics', query, (msg) => {
                    this.tables = msg.data.page.pageInfo.list;
                });
            },
        }
    }
</script>

