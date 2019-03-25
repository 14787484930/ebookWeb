<template>
    <div >
        <div class="content has-header">

            <div class="list card">

                <div class="item item-avatar">
                    <img src="../../assets/images/timg.jpg">
                    <h2 style="margin-top: 10%">昵称：{{ userinfo.nickName }}</h2>
                    <p></p>
                </div>

                <div class="item item-body" >
                    <div class="weui-cells">
                        <span class="weui-cell weui-cell_access" >
                             <div class="weui-cell__bd">
                                <router-link :to="{path:'/advice' }" >用户建议</router-link>
                             </div>
                            <div class="weui-cell__ft">
                            </div>
                        </span>
                        <span class="weui-cell weui-cell_access" >
                            <div class="weui-cell__bd">
                                  <router-link :to="{path:'/version'}" >关于我们</router-link>
                            </div>
                            <div class="weui-cell__ft">
                            </div>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mycenter",
        data(){
            return {
                userinfo:{
                    nickName:"vxiao",

                },
            }
        },
        created(){
            this.getMsg();
        },
        methods:{

           submitAdvice(){
                this.$post('/useradvice/save',
                    [this.advice.des,this.advice.createUser,this.advice.createTime] ,
                    (msg) => {
                    console.log(msg);
                })
            },
            getMsg(){
                this.$post('/aboutus/us', (msg) => {
                    console.log(msg);
                    this.version.msg=msg;
                })
            }
        },

    }
</script>

<style scoped>
    .add_border{
        border: saddlebrown 1px solid;
    }
    .router-link-active {
        text-decoration: none;
    }

</style>