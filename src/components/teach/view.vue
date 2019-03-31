<template>
    <div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll">
                <template>
                    <div class="list">
                        <label class="form-group item item-input ">
                            <span>名称：</span>
                            <input type="text" v-model="teach.name">
                        </label>
                        <label class="form-group item item-input ">
                            <span>开始时间：</span>
                            <input type="text" v-model="teach.startTime">
                        </label>
                        <label class="form-group item item-input ">
                            <span>结束时间：</span>
                            <input type="text" v-model="teach.endTime">
                        </label>
                        <label class="form-group item item-input ">
                            <span>电话：</span>
                            <input type="text" v-model="teach.phone">
                        </label>
                        <label class="form-group item item-input ">
                            <span>微信号：</span>
                            <input type="text" v-model="teach.weiXin">
                        </label>
                        <label class="form-group item item-input ">
                            <span>辅导地点：</span>
                            <input type="text" v-model="teach.place">
                        </label>
                        <label class="form-group item item-input ">
                            <span>定价(元)：</span>
                            <input type="text" v-model="teach.price">
                        </label>
                        <label class="form-group item item-input ">
                            <span>描述：</span>
                            <input type="text" v-model="teach.des">
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

        mounted() {
            //this.$(".scroll-list-wrap").height = this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },

        methods: {
            initData() {
                this.$http.post('/tutoring/getById/' + this.teach.id).then((res) => {
                    _that.teach = res.data.page.info;
                    _that.teach.teachType = 1;//先不做处理后面要删除
                });
                console.log(_that.teach);
            },
        },
    }

</script>

<style scoped>

</style>
