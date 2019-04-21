<template>
    <div class="scroll-list-wrap">
        <cube-scroll
                ref="scroll"
                :scroll-events="['scroll']"
                :options="options"
                @scroll="onScrollHandle"
                @pulling-up="refresh">
            <cube-swipe>
                <template>
                    <div class="list">
                        <transition-group name="swipe" tag="ul">
              <span v-for="(item,index) in tables" :key="item.id">
                <cube-swipe-item
                        v-if="power_flag"
                        ref="reftables"
                        v-bind:btns="btns"
                        :index="index"
                        @btn-click="updateBook"
                >
                  <div @click="config.view(item)">
                    <a class="item item-thumbnail-left" href="#">
                      <img v-if="showImg" :src="$file(item[config.img])" @load="onImgLoad">

                      <p
                              :class="'grid-showimg-'+showImg"
                              v-for="(row,key) in config.columns "
                              :key="key"
                      >{{row.title}}：{{item|filter(item,row)}}</p>
                    </a>
                  </div>
                </cube-swipe-item>
                <div @click="config.view(item)" v-else>
                  <a class="item item-thumbnail-left" href="#">
                    <img v-if="showImg" :src="$file(item[config.img])" @load="onImgLoad">

                    <p
                            :class="'grid-showimg-'+showImg"
                            v-for="(row,key) in config.columns "
                            :key="key"
                    >{{row.title}}：{{item|filter(item,row)}}</p>
                  </a>
                </div>
              </span>
                        </transition-group>
                    </div>
                </template>
            </cube-swipe>
        </cube-scroll>
        >
    </div>
</template>

<script>
    export default {
        name: "gridView",
        props: ["url", "rows", "grid", "load"],
        filters: {
            filter(sourc, item, row) {
                if (row.format != undefined) {
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
                this.tables=[];
                this.isLastPage = false;
                this.initTables();
            }
        },
        mounted() {
            /*$(".scroll-list-wrap").height(
                screen.availHeight -
                $("#head").height() -
                $(".tabs-icon-top", window.parent.parent.document).height()
            );*/
        },
        data() {
            return {
                tables: [],
                isLastPage: false,
                btns: [
                    {
                        action: "edit",
                        text: "编辑",
                        color: "cornflowerblue"
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
                if (this.grid == undefined) {
                    return;
                    console.error("配置错误，请检查");
                }
                this.url = this.$toStr(this.url);
                this.initConfig();
                if (this.rows == undefined) {
                    this.initTables();
                } else {
                    this.tables = this.rows;
                }
            },
            initTables() {
                var that = this;
                if (that.isLastPage) {
                    this.options.pullUpLoad = false;
                    return;
                }
                this.$table(this.url, this.config.query, function (data) {
                    that.isLastPage = data.isLastPage;
                    $.each(data.list, function (i, val) {
                        const arr = that.tables.filter(function (cval, ci) {
                            return cval.id == val.id;
                        });
                        if (arr.length == 0) {
                            that.tables.push(val);
                        }
                    });
                    that.$nextTick(function () {
                        that.$refs.scroll.refresh();
                        that.$refs.scroll.forceUpdate();
                    });
                    setTimeout(function () {
                        that.$refs.scroll.refresh();
                        that.$refs.scroll.forceUpdate();
                    });
                });
            },
            initConfig() {
                this.config = this.grid;
                if (this.grid.btns == undefined) {
                    this.grid.btns = this.btns;
                }
                this.config.query = this.$toArray(this.grid.query);
                if (this.config.img == undefined) {
                    this.showImg = false;
                }
            },

            updateBook(btn, index) {
                //删除数据
                const row = this.tables[index];
                if (btn.action == "del") {
                    this.config.del(row);
                } else this.config.edit(row);
            },
            onImgLoad() {
                var that = this;
                that.$nextTick(function () {
                    that.$refs.scroll.refresh();
                    that.$refs.scroll.forceUpdate();
                });
                setTimeout(function () {
                    that.$refs.scroll.refresh();
                    that.$refs.scroll.forceUpdate();
                });
                this.$refs.scroll.refresh();
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
