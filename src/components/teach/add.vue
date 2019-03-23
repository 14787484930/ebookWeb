<template>
    <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
            <template>
                <label class="form-group item item-input">
                    <cube-select style="width: inherit"
                                 v-model="value"
                                 :options="options"
                                 @change="change">
                    </cube-select>
                </label>
                <div class="list">
                    <label class="form-group item item-input ">
                        <span>名称：</span>
                        <input type="text"  class="isnull" v-model="teach.name">
                    </label>
                    <label class="form-group item ">
                        <span>开始时间：</span>
                        <Date v-model="teach.startTime"  type="time"></Date>
                    </label>
                    <label class="form-group item ">
                        <span>结束时间：</span>
                        <Date v-model="teach.endTime" type="time"></Date>
                    </label>
                    <label class="form-group item item-input ">
                        <span>辅导地点：</span>
                        <input type="text"  class="isnull" v-model="teach.place">
                    </label>
                    <label class="form-group item item-input ">
                        <span>定价：</span>
                        <input type="text"  class="isnull" v-model="teach.price">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电话：</span>
                        <input type="text"  class="isnull tel" v-model="teach.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input type="text" v-model="teach.weiXin">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input type="text" v-model="teach.des">
                    </label>

                    <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
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
                options: ['辅导', '讲座'],
                value:'',
                teach: {
                    id: '',
                    name: '',
                    type: '0',    //0：辅导  1：讲座
                    price: '10',
                    startTime: '2019-01-30 15:52:46',
                    endTime: '2019-12-30 15:52:51',
                    place: 'A栋', //讲座地点
                    weiXin: 'weiXin',
                    phone: '14787461136',
                    des: '帅气男学渣求女学霸辅导，男女搭配学习不累',
                },
            }
        },
        components: {
            Date,
        },
        created() {
            _that = this;
            this.teach.id = this.$route.query.id;
            if (parseInt(this.teach.id) != 0)
                this.initData();
        },
        mounted() {
            //this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },
        methods: {
            initData() {
                this.$http.post('/tutoring/getById/' + this.teach.id).then((res) => {
                    //_that.teach = res.data.page.info;
                    for(let i in this.teach){
                        _that.teach[i] = res.data.page.info[i];
                    }
                    _that.teach.startTime=_that.$toDate(_that.teach.startTime,'yyyy-MM-dd HH:mm');
                    _that.teach.endTime=_that.$toDate(_that.teach.endTime,'yyyy-MM-dd HH:mm');
                    _that.teach.type = 1;//先不做处理后面要删除
                })
            },
            saveData() {
                let url = '/tutoring/save';
                if (this.teach.id != 0)
                    url = '/tutoring/update';
                this.$save(url, this.teach, (msg) => {
                    console.log(msg);
                })
            },
            //类型选择
            change(value, index) {
                this.teach.type = index;
            }
        },
    }
</script>
<style>

</style>
