<template>
    <div>
        <p>我的中心</p>
        <div>

            <!--<router-link :to="{path:'/advice'}"> <p>反馈</p> </router-link>-->
            <cube-button @click="showPrompt" >用户建议</cube-button>

            <!--<router-link :to="{path:'/version'}"><p>关于我们</p></router-link>-->
            <cube-button @click="showAlert">关于我们</cube-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mycenter",
        data(){
            return {
                advice:{
                    des:"",
                    createUser:"",
                    createTime:"2018-12-01 15:52:46",
                },
                version:{
                    title:"关于我们的标题",
                    msg:"关于我们的信息显示,开发版本1.01",
                }

            }
        },
        created(){
            this.getMsg();
        },
        methods:{
            showAlert() {
                this.$createDialog({
                    type: 'alert',
                    title: '关于我们',
                    content: "版本号是1.0.0",
                    icon: 'cubeic-alert'
                }).show()
            },
            showPrompt() {
                this.dialog = this.$createDialog({
                    type: 'prompt',
                    title: '反馈',
                    prompt: {
                        value: "",
                        placeholder: '请输入你的建议'
                    },
                    onConfirm: (e, promptValue) => {
                        this.$createToast({
                            type: 'warn',
                            time: 1000,
                            txt: `提示: ${promptValue || ''}`
                        }).show()
                    }
                }).show()
            },
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

</style>