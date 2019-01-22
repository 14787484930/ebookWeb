<template>
    <div class="scroll-list-wrap"  >
        <cube-scroll
                ref="scroll"
        >
            <template>
                <div  class="list">
                    <label class="form-group item item-input">
                        <cube-select style="width: inherit"
                                     v-model="value"
                                     :options="options">
                        </cube-select>
                    </label>
                    <label class="form-group item item-input ">
                        <span>辅导名称：</span>
                        <input type="text" v-model="teach.name">
                    </label>
                    <label class="form-group item item-input ">
                        <span>发布者：</span>
                        <input type="text" v-model="teach.createUser">
                    </label>

                    <label class="form-group item item-input ">
                        <span>发布日期：</span>
                        <input type="text" v-model="teach.createTime">
                    </label>
                    <label class="form-group item item-input ">
                        <span>结束日期：</span>
                        <input type="text" v-model="teach.endDate">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input type="text" v-model="teach.weiXin">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电话：</span>
                        <input type="text" v-model="teach.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>辅导地点：</span>
                        <input type="text" v-model="teach.place">
                    </label>
                    <label class="form-group item item-input ">
                        <span>定价：</span>
                        <input type="text" v-model="teach.price">
                    </label>
                    <label class="form-group item item-input ">
                        <span>备注：</span>
                        <input type="text" v-model="teach.des">
                    </label>

                    <button style="width: 100%" class="button button-positive"  @click="saveData">发布</button>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>

    export default {
        name: "addTeach",
        data(){
            return{
                options: ['辅导', '讲座'],
                value: '辅导',
                teach:{
                    id:0,
                    name:'',
                    type:'0',
                    price:'10',
                    startTime:'2018-12-01 15:52:46',
                    endTime:'2018-12-08 15:52:51',
                    endDate:'2018-12-09 15:52:56',
                    place:'A栋',
                    weiXin:'ZXL690345407',
                    phone:'14787484930',
                    des:'123',
                    viewTimes:10,
                    orderUser:"vxiao",
                    createTime:'2018-12-01 15:53:38',
                    updateTime:'',
                    createUser:'ea0b33ba3b65429f976a6514ae9296e8',
                    updateUser:'',
                    checkCode:'',
                    dataStatus:'',
                    isScore:''
                },
                urls:[],
            }
        },
        components: {

        },
        created(){
            _that=this;
            this.teach.id=this.$route.teach.id;
            if(parseInt(this.teach.id)!=0)
                this.initData();
        },
        mounted() {
            this.$(".scroll-list-wrap").height(screen.availHeight-this.$(".tabs-icon-top",window.parent.parent.document).height())+80;
        },
        methods:{
            initData(){
                this.$http.post('/tutoring/getById'+this.teach.id).then((res)=>{
                    _that.teach=res.data.page.info;
                    _that.teach.type=1;//先不做处理后面要删除

                })
            },
            saveData(){
                let  url='/tutoring/save';
                if(this.teach.id==0)
                    url='/tutoring/update';
                this.$save(url,this.teach,(msg)=>{
                    console.log(msg);
                })
            }
        }
    }
</script>
<style>
    .myclass{
        border: 20px solid blue;
    }
</style>
