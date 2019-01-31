<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <i class="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="搜索">
                </label>
                <router-link :to="{path:'/teachAdd', query:{id:0}}" class="button button-small button-positive">
                    <i class="icon ion-plus"></i>
                </router-link>
            </div>
            <div style="text-align: center">
                <button  @click="$picker.show()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    图书类型
                </button>
                <button  @click="$picker.showDate()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                    日期
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
                                    <cube-swipe-item
                                            ref="reftables"
                                            v-bind:btns="btns"
                                            :index="index"
                                            @btn-click="updateTeach"
                                    >
                                        <router-link :to="{path:'/teachView',query:{id:item.id}}">
                                            <a class="item item-thumbnail-right" href="#">
                                                <p>名称：{{item.name}}</p>
                                                <p>报酬：￥{{item.price}}</p>
                                                <p>时间：{{item.startTime}}--{{item.endTime}}</p>
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
    import DropDown from '../common/dropDown'

    export default {
        name: 'Teach',
        components: {
            DropDown,
        },
        data() {
            return {
                queryList: {
                    teachType: 0,
                    teachName: '',
                },
                tables: [],
                btns: [
                    {
                        action: 'edit',
                        text: '编辑',
                        color: 'cornflowerblue'
                    },
                    {
                        action: 'del',
                        text: '删除',
                        color: '#ff3a32'
                    }
                ],
                dropCconfig: [],
                bookTypes: [],
                columns: [],
            }
        },

        computed: {},
        created() {
            this.initDropCconfig();
            this.initTables();
        },
        mounted() {
            $(".scroll-list-wrap").height(screen.availHeight - $("#head").height()
                - $(".tabs-icon-top", window.parent.parent.document).height());
        },
        methods: {
            updateTeach(btn, index) {
                let id = this.tables[index].id;
                //删除数据
                if (btn.action == 'del') {
                    let arr = {id: id};//删除时传输的id
                    this.$post('/tutoring/delete', arr, (msg) => {
                        console.log(msg);
                    })
                }
                else
                {
                    this.$router.push({path: '/teachAdd', query: {id: id}});
                }

            },
            initTables() {
                let _that = this;
                // 请求地址，携带参数，返回的数据
                this.$table('/tutoring/tutorings', this.queryList, data => {
                    _that.tables = data.list;
                    console.log(data.list);
                })
            },
            initDropCconfig() {
                this.dropCconfig = [
                    {
                        title: '类型选择',
                        list: [{text: '讲座', value: '讲座'},
                            {text: '辅导', value: '辅导'}],
                        onSelect: (val, index, text) => {
                            console.log(val);
                            console.log(index);
                            console.log(text);
                        }
                    },
                    {
                        title: '日期', dateDrop: true, onSelect: (date, val, text) => {
                            console.log(date);
                            console.log(val);
                            console.log(text);
                        }
                    },
                    {
                        title: '价格', list: [{text: '10', value: 10}, {text: '20', value: 20}],
                        onSelect: (val, index, text) => {
                            console.log(val);
                            console.log(index);
                            console.log(text);
                        }
                    }
                ];
            },
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .scroll-list-wrap {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
        overflow: hidden;
    }
</style>
