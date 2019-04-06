<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <i class="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="搜索" v-model="queryList.otherName">
                </label>
                <router-link v-if="power" :to="{path:'/otherAdd',query:{id:0}}" class="button button-small button-positive">
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
                    价格(元)
                </button>
                <router-link :to="{path:'/verify'}" class="button button-small button-positive">
                    <i class="icon ion-log-in"></i>
                </router-link>
            </div>
        </div>
        <grid-view :grid="grid" url="/other/others" :load="load"></grid-view>
    </div>
</template>

<script>
    let  that;
    export default {
        name: 'Other',
        data() {
            return {
                msg: '其他',
                queryList: {
                    otherName: '',
                    otherType: '1',
                },
                grid:{},
                load:0,
            }
        },
        computed:{
            power(){
                return this.$store.getters.power;
            }
        },
        created() {
            that=this;
            this.initGrid();
        },
        methods: {
            initGrid(){
                this.grid={
                    img:'otherPic',
                    query:this.queryList,
                    view:(row)=>that.$router.push({path: '/otherView', query: {id: row.id}}),
                    del:(row)=> that.$post('/book/delete',row),
                    edit:(row)=>that.$router.push({path: '/otherAdd', query: {id: row.id}}),
                    columns:[
                        {title:"名称",key:'otherName'},
                        {title:"价格",key:'presentPrice',format:(row)=>"￥"+ row.presentPrice},
                    ],
                };
            },
        }
    }
</script>

