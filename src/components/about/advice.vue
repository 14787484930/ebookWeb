<template>
    <div align="center" style="margin-top: 35%">
        <!--用户建议（跳转）-->
    <!--<p>    输入框</p>-->
        <div class="textarea-wrapper">
            <div class="cube-textarea-wrapper" width="274px" height="100px">
		<textarea v-model="advice.des" placeholder="建议和反馈" maxlength="60" indicator="[object Object]" class="cube-textarea">

		</textarea>
                <span class="cube-textarea-indicator" style="display: none;">
		        60
	            </span>
            </div>
        </div>
        <div class="padding">
            <button  @click="subAdvice" class="button button-block button-positive">提交</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "advice",
        data(){
            return {
                advice:{
                    des:"",
                }
            };
        },
        methods:{
            subAdvice(){
                console.log(this.advice.des);
                this.$http.post("/useradvice/save?des="+
                    this.advice.des).then(
                    (res)=>{
                        let ms = res.data;
                        //根据返回的值做后续的判断
                        console.log(ms);
                    }
                );
            },
        }

    }
</script>

<style scoped>

</style>