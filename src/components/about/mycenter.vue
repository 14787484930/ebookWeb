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
        methods:{
            showAlert() {
                this.$createDialog({
                    type: 'alert',
                    title: '关于我们',
                    content: "版本号是1.01",
                    icon: 'cubeic-alert'
                }).show()
            },
            showPrompt() {
                this.dialog = this.$createDialog({
                    type: 'prompt',
                    title: '反馈',
                    prompt: {
                        value: "",
                        placeholder: '请输入'
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
        },

    }
</script>

<style scoped>

</style>