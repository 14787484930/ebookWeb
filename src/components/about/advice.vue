<template>
    <div align="center" style="margin-top: 35%">
        <!--用户建议（跳转）-->
    <!--<p>    输入框</p>-->
        <div class="textarea-wrapper">
            <cube-textarea v-model="userAdvice.des"></cube-textarea>
        </div>
        <div class="padding">
            <cube-button icon="cubeic-right" :disabled=false @click="subAdvice()">提交</cube-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "userAdvice",
        data(){
            return {
                userAdvice:{
                    des:""
                }
            };
        },
        methods:{
            subAdvice(){

                this.$save("/useradvice/save",this.userAdvice,(msg)=>{
                    console.log(msg);
                })
            },
        }

    }
</script>

<style scoped>

</style>