<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <i class="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="搜索" v-model="queryList.electronicsName" @keypress="searchSub">
                </label>
                <router-link v-if="power" :to="{path:'/electronicsAdd',query:{id:0}}" class="button button-small button-positive">
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

        <grid-view :grid="grid" url="/electronics/electronics" :load="load"></grid-view>
    </div>
</template>

<script>
    import $config from "../../webserver/serve/config";
    export default {
        name: 'Electronics',
        data() {
            return {
                msg: '电子',
                grid:{},
                load:0,
                electronicsTypes: [],
                queryList: {
                    electronicsName: '',
                    electronicsType: '1',
                },
            }
        },
        computed:{
            power(){
                return this.$store.getters.power;
            }
        },
        created() {
            this.initType();
            this.initGrid();
        },
        methods: {
            initGrid(){
                this.grid={
                    img:'electronicsPic',
                    query:this.queryList,
                    view:this.view,
                    del:this.del,
                    edit:this.update,
                    columns:[
                        {title:"名称",key:'electronicsName'},
                        {title:"型号",key:'electronicsType'},
                        {title:"价格",key:'presentPrice',format:this.setPrice},
                    ],
                };
            },
            setPrice(row){
                return "￥"+ row.presentPrice;
            },
            view(row){
                this.$router.push({path: '/electronicsView', query: {id: row.id}});
            },
            del(row){
                this.$post('/electronics/delete',row);
            },
            update(row){
                this.$router.push({path: '/electronicsAdd', query: {id: row.id}})
            },

            initType() {
                this.$picker.electronicType();
                this.$picker.datePicker();
                this.$picker.dialogPicker()
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

