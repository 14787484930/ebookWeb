<template>
    <div class="scroll-list-wrap addWrap">
        <cube-scroll ref="scroll">
            <template>
                <label class="form-group item item-input teach-tabs">
                    <!-- <cube-select style="width: inherit" v-model="value" :options="options" @change="change"></cube-select> -->
                    <li
                            class="teach-tab"
                            v-for="(item, index) in options"
                            :key="item.index"
                            @click="changeTab(index)"
                    >{{ item }}</li>
                </label>
                <div>
                    <div class="list" v-if="!flag">
                        <label class="form-group item item-input">
                            <span>辅导名称：</span>
                            <input type="text" class="isnull" v-model="teach.name" placeholder="点此填写">
                        </label>
                        <label class="form-group item">
                            <span>辅导截止时间：</span>
                            <Date v-model="teach.startTime" type="time"></Date>
                        </label>
                        <label class="form-group item item-input">
                            <span>辅导地点：</span>
                            <input type="text" class="isnull" v-model="teach.place" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>辅导价格：</span>
                            <input type="text" class="isnull" v-model="teach.price" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>电话：</span>
                            <input type="text" class="isnull tel" v-model="teach.phone" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>微信：</span>
                            <input type="text" v-model="teach.weiXin" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>描述：</span>
                            <input type="text" v-model="teach.des" placeholder="点此填写">
                        </label>

                        <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                    </div>
                    <div class="list" v-else>
                        <label class="form-group item item-input">
                            <span>名称：</span>
                            <input type="text" class="isnull" v-model="teach.name" placeholder="点此填写">
                        </label>
                        <label class="form-group item">
                            <span>开始时间：</span>
                            <Date v-model="teach.startTime" type="time"></Date>
                        </label>
                        <label class="form-group item">
                            <span>结束时间：</span>
                            <Date v-model="teach.endTime" type="time"></Date>
                        </label>
                        <label class="form-group item item-input">
                            <span>讲座地点：</span>
                            <input type="text" class="isnull" v-model="teach.place" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>报酬(元)：</span>
                            <input type="text" class="isnull" v-model="teach.price" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>电话：</span>
                            <input type="text" class="isnull tel" v-model="teach.phone" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>微信：</span>
                            <input type="text" v-model="teach.weiXin" placeholder="点此填写">
                        </label>
                        <label class="form-group item item-input">
                            <span>描述：</span>
                            <input type="text" v-model="teach.des" placeholder="点此填写">
                        </label>

                        <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                    </div>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    let _that;
    import Date from "../common/date";

    export default {
        name: "addTeach",
        data() {
            return {
                options: ["辅导", "讲座"],
                value: "",
                flag: false,
                current: 1,
                teach: {
                    id: "",
                    name: "",
                    type: "1", //0：辅导  1：讲座
                    price: "10",
                    startTime: "2019-01-30 15:52",
                    endTime: "2019-12-30 15:52",
                    place: "A栋", //讲座地点
                    phone: this.$store.getters.getUser.phone,
                    weiXin: this.$store.getters.getUser.weiXin,
                    des: "帅气男学渣求女学霸辅导，男女搭配学习不累"
                }
            };
        },
        components: {
            Date
        },
        created() {
            _that = this;
            this.teach.id = this.$route.query.id;
            if ((this.teach.id).length > 1) this.initData();
        },
        mounted() {
            //this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
            this.changeTab(0);
        },
        methods: {
            initData() {
                this.$http.post("/tutoring/getById/" + this.teach.id).then(res => {
                    //_that.teach = res.data.page.info;
                    for (let i in this.teach) {
                        _that.teach[i] = res.data.page.info[i];
                    }
                    _that.teach.startTime = _that.$toDate(
                        _that.teach.startTime,
                        "yyyy-MM-dd HH:mm"
                    );
                    _that.teach.endTime = _that.$toDate(
                        _that.teach.endTime,
                        "yyyy-MM-dd HH:mm"
                    );
                    _that.teach.type = 1; //先不做处理后面要删除
                });
            },
            saveData() {
                let url = "/tutoring/save";
                if (this.teach.id !== 0) url = "/tutoring/update";
                this.$save(url, this.teach,'' ,msg => {
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm:()=>{
                            this.$router.push({path: '/teach',query: {flag: 1}})
                        }
                    }).show()
                });
            },
            //类型选择
            changeTab(index) {
                var teachTab = document.getElementsByClassName("teach-tab");
                this.flag = index;
                if (index != this.current) {
                    teachTab[index].classList.add("active");
                    teachTab[this.current].classList.remove("active");
                    this.current = index;
                    this.teach.type = index;
                }
            }
        }
    };
</script>
<style scoped>
    .scroll-list-wrap{height: 94vh;}/*滚动的页面的高度 -by gpj*/
    .teach-tabs.item-input {
        display: flex;
        height: 70px;
        padding: 0 2rem;
        justify-content: space-between;
    }
    .teach-tab {
        font-size: 19px;
    }
    .active {
        color: #387ef5;
    }
</style>
