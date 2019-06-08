<template>
    <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :scroll-events="['scroll']" :options="options" @scroll="onScrollHandle"
                     @pulling-up="refresh">
            <cube-swipe>
                <template>
                    <div class="list">
                        <transition-group name="swipe" tag="ul">
                            <div v-for="(item,index) in tables" :key="item.id">
                                <cube-swipe-item v-if="power_flag" ref="reftables" :btns="editorBtns" :index="index" @btn-click="updateOrDeleteItem">
                                    <div @click="config.view(item)">
                                        <div class="item item-thumbnail-left" href="#">
                                            <img v-if="showImg" :src="$file(item[config.img])" @load="onImgLoad">
                                            <p :class="'grid-showimg-'+showImg" v-for="(row,key) in config.columns "
                                               :key="key">{{row.title}}：{{item|filter(item,row)}}</p>
                                        </div>
                                    </div>
                                </cube-swipe-item>
                                <div @click="config.view(item)" v-else>
                                    <div class="item item-thumbnail-left" href="#">
                                        <img v-if="showImg" :src="$file(item[config.img])" @load="onImgLoad">
                                        <p :class="'grid-showimg-'+showImg" v-for="(row,key) in config.columns"
                                           :key="key">{{row.title}}：{{item|filter(item,row)}}</p>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </template>
            </cube-swipe>
        </cube-scroll>
    </div>
</template>

<script>
    import storage from '../assets/storage/index'
    import $ from 'jquery'
    export default {
        name: "gridView",
        props: ["url", "rows", "grid", "load"],
        filters: {
            filter(sourc, item, row) {
                if (row.format !== undefined) {
                    return row.format(item);
                } else {
                    const key = row.key;
                    return item[key];
                }
            }
        },
        computed: {
            power_flag() {
                return this.$store.getters.power_flag;
            }
        },
        watch: {
            load() {
                this.tables = [];
                this.isLastPage = false;
                this.initTables();
            }
        },
        data() {
            return {
                tables: [],
                isLastPage: false,
                editorBtns: [
                    {
                        action: "edit",
                        text: "编辑",
                        color: "#6495ed"
                    },
                    {
                        action: "del",
                        text: "删除",
                        color: "#ff3a32"
                    }
                ],
                config: {},
                showImg: true,

                options: {
                    pullUpLoad: {
                        threshold: 60,
                        stop: 40,
                        txt: "更新成功"
                    }
                }
            };
        },
        created() {
            this.initParam();
        },
        methods: {
            onScrollHandle(pos) {
            },
            refresh(e) {
                if (this.$toInt(this.config.query.pageNumber) < 1)
                    this.config.query.pageNumber = 1;
                this.config.query.pageNumber++;
                this.initTables();
            },
            initParam() {
                if (typeof(this.grid) === "undefined") {
                    console.error("配置错误，请检查");
                    return;
                }
                //将地址转化为String类型，如果不存在返回空字符串
                this.url = this.$toStr(this.url);
                //初始化配置
                this.initConfig();
                if (typeof(this.rows) === "undefined") {
                    this.initTables();
                } else {
                    this.tables = this.rows;
                }
            },
            initTables() {
                let that = this;
                if (that.isLastPage) {
                    this.options.pullUpLoad = false;
                    return;
                }
                //请求数据
                this.$table(this.url, this.config.query, function (data) {
                    //将data.list中的类型由数字改为字符串
                    that.productTypeNumToString(that.url, data.list);
                    //从服务器返回判断是否还有数据
                    that.isLastPage = data.isLastPage;
                    $.each(data.list, function (i, val) {
                        const arr = that.tables.filter(function (cval, ci) {
                           // console.log(ci)
                            return parseInt(cval.id) === parseInt(val.id);
                        });
                        if (arr.length === 0) {
                            that.tables.push(val);
                        }
                    });
                  /*  that.$nextTick(function () {
                        that.$refs.scroll.refresh();
                        that.$refs.scroll.forceUpdate();
                    });
                    setTimeout(function () {
                        that.$refs.scroll.refresh();
                        that.$refs.scroll.forceUpdate();
                    });*/
                });
            },
            initConfig() {
                this.config = this.grid;
                if (typeof(this.grid.editorBtns) === "undefined") {
                    this.grid.editorBtns = this.editorBtns;
                }
                this.config.query = this.$toArray(this.grid.query);
                if (typeof(this.config.img) === "undefined") {
                    this.showImg = false;
                }
            },
            updateOrDeleteItem(btn, index) {
                //删除或更新数据
                let that = this;
                const row = this.tables[index];
                if (btn.action === "del") {
                    //执行父组件的del方法
                    this.config.del(row, (code) => {
                        //移除删除的元素
                        if (Number(code) === 100)
                            that.tables.splice(index, 1);
                    });
                } else this.config.edit(row);
            },
            onImgLoad() {
                let that = this;
                that.$nextTick(function () {
                    that.$refs.scroll.refresh();
                    that.$refs.scroll.forceUpdate();
                });
                setTimeout(function () {
                    that.$refs.scroll.refresh();
                    that.$refs.scroll.forceUpdate();
                });
                this.$refs.scroll.refresh();
            },
            /**
             * 产品类型由数字转变为字符串
             * @param url
             * @param list
             * @constructor
             * by gpj 2019年4月28日
             */
            productTypeNumToString(url, list) {
                let item;
                let key;  //缓存的键，具体是什么要看存储的时候存的是什么
                switch (url) {
                    case "/book/books": {
                        key = "bookType";
                        let aValue = storage.getSession(key);
                        if (aValue === null)
                            return
                        for (item of list) {
                            let num = item.bookType;
                            item.bookType = aValue[num - 1].text;
                        }
                        break;
                    }
                    case "/electronics/electronics": {
                        key = "electronicsType";
                        let aValue = storage.getSession(key);
                        if (aValue === null)
                        for (item of list) {
                            let num = item.electronicsType;
                            item.electronicsType = aValue[num - 1].text;
                        }
                        break;
                    }
                    case "/tutoring/tutorings": {
                        break;
                    }
                    case "/other/others": {
                        break;
                    }
                    default : {
                        break;
                    }
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .scroll-list-wrap {
        height: 80.5vh;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
        overflow: hidden;
    }

    .grid-showimg-false {
        margin-left: -50px;
    }
</style>
