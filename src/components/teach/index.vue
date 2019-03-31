<template>
    <div>
        <div id="head">
            <div class="bar bar-header item-input-inset">
                <label class="item-input-wrapper">
                    <i class="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="搜索">
                </label>
                <router-link v-if="power" :to="{path:'/teachAdd', query:{id:0}}" class="button button-small button-positive">
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
            </div>
        </div>

        <grid-view :grid="grid" url="/tutoring/tutorings" :load="load"></grid-view>
    </div>
</template>

<script>
    let  that;
    export default {
        name: 'Teach',
        data() {
            return {
                queryList: {
                    teachType: 0,
                    teachName: '',
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
                    query:this.queryList,
                    view:(row)=>that.$router.push({path: '/teachView', query: {id: row.id}}),
                    del:(row)=> that.$post('/tutoring/delete',row),
                    edit:(row)=>that.$router.push({path: '/teachAdd', query: {id: row.id}}),
                    columns:[
                        {title:"名称",key:'name'},
                        {title:"价格",key:'price',format:(row)=>"￥"+ row.price},
                        {title:"日期",key:'Time',format:(row)=>that.$toDate(row.startTime)+'--'+that.$toDate(row.endTime)},
                    ],
                };
            },
        }
    }
</script>

