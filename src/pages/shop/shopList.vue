<template>
    <div>
        <h1 style="text-align: center; height: 60px; vertical-align: middle">商店列表</h1>
        <grid-view :grid="grid" url="/book/books" :load="load"></grid-view>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import gridView from '../../components/gridView'

    export default {
        name: 'Shop',
        components: {
            gridView,
        },
        data() {
            return {
                msg: '商店',
                grid: {},
                load: 0,
                queryList: {
                    bookName: '',
                    bookType: '',
                    startPrice: '',
                    endPrice: '',
                    startTime: '',
                    endTime: ''
                },
            }
        },
        created() {
            this.queryList.flag = this.$toInt(this.$route.query.flag);
            this.$store.commit('setFlag', this.$toInt(this.$route.query.flag));
            this.initType();
            this.initGrid();
        },
        methods: {
            initGrid() {
                this.grid = {
                    img: 'bookPic',
                    query: this.queryList,
                    view: this.view,
                    del: this.del,
                    edit: this.update,
                    columns: [
                        {title: "名称", key: 'bookName'},
                        {title: "出版社", key: 'bookPub'},
                        {title: "价格", key: 'bookPrice', format: this.setPrice},
                    ],
                };
            },
            setPrice(row) {
                return "￥" + row.bookPrice;
            },
            view(row) {
                this.$router.push({name: 'bookView', query: {id: row.id}});
            },
            del(row, callback) {
                let para = {id: row.id};
                this.$post('/book/delete', para, (msg) => {
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
            update(row) {
                this.$router.push({name: 'bookAdd', query: {id: row.id}})
            },
            initType() {
                let that = this;
                this.$picker.datePicker((val, index, text) => {
                    that.queryList.startTime = index.join('-');
                });
                this.$picker.dateEndPicker((val, index, text) => {
                    that.queryList.endTime = index.join('-');
                });
            },
        }
    }
</script>

<style>

</style>
