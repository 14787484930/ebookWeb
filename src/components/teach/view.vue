<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <template>
                    <div class="list">
                        <label class="form-group item item-input ">
                            <span>名称：</span>
                            <input type="text" v-model="teach.name" readonly="true">
                        </label>
                        <label class="form-group item item-input ">
                            <span>{{ type?"开始时间：":"辅导截止时间：" }}</span>
                            <input type="text" v-model="teach.startTime" readonly="true">
                        </label>
                        <label class="form-group item item-input " v-if="type">
                            <span>结束时间：</span>
                            <input type="text" v-model="teach.endTime" readonly="true">
                        </label>
                        <label class="form-group item item-input " v-if="power">
                            <span>电话：</span>
                            <input type="text" v-model="teach.phone" readonly="true">
                        </label>
                        <label class="form-group item item-input " v-if="power">
                            <span>微信号：</span>
                            <input type="text" v-model="teach.weiXin" readonly="true">
                        </label>
                        <label class="form-group item item-input ">
                            <span>{{ type?"讲座地点：":"辅导地点：" }}</span>
                            <input type="text" v-model="teach.place" readonly="true">
                        </label>
                        <label class="form-group item item-input ">
                            <span>{{ type?"报酬(元)：":"辅导价格：" }}</span>
                            <input type="text" v-model="teach.price" readonly="true">
                        </label>
                        <label class="form-group item item-input ">
                            <span>描述：</span>
                            <input type="text" v-model="teach.des" readonly="true">
                        </label>
                    </div>
                </template>
            </cube-scroll>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    let _that;

    export default {
        //name: "view",
        data() {
            return {
                //获取详细信息
                teach: {
                    id: 0,
                    name: '',
                    type: '0',
                    price: '10',
                    startTime: '2018-12-01 15:52:46',
                    endTime: '2018-12-08 15:52:51',
                    place: 'A栋',
                    phone: '14787484930',
                    weiXin: '',
                    des: '123',
                },
            }
        },
        created() {
            _that = this;
            this.teach.id = this.$route.query.id;
            if (parseInt(this.teach.id) != 0)
                this.initData();
            else
                console.log('[error]选择的物品id为0，请检查物品id是否正确!');
        },
        computed:{
            power(){
                return this.$store.getters.power;
            },
            type() {
                return parseInt(this.teach.type);
            }
        },
        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData() {
                this.$http.post('/tutoring/getById/' + this.teach.id).then((res) => {
                    _that.teach = res.data.page.info;
                    _that.teach.startTime=_that.$toDate(_that.teach.startTime,'yyyy-MM-dd HH:mm');
                    _that.teach.endTime=_that.$toDate(_that.teach.endTime,'yyyy-MM-dd HH:mm');
                    _that.teach.teachType = 1;//先不做处理后面要删除
                });
                console.log(_that.teach);
            },
        },
    }

</script>

<style scoped>

</style>
