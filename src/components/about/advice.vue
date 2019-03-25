<template>
    <div align="center" style="margin-top: 35%">
        <!--用户建议（跳转）-->
    <!--<p>    输入框</p>-->
        <div class="textarea-wrapper">
            <div class="cube-textarea-wrapper" width="274px" height="100px">
		<textarea  placeholder="建议和反馈" maxlength="60" indicator="[object Object]" class="cube-textarea">

		</textarea>
                <span class="cube-textarea-indicator" style="display: none;">
		        60
	            </span>
            </div>
        </div>
        <div class="padding">
            <button  onclick="alert('123')" class="button button-block button-positive">提交</button>
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
                    createUser:"vxiao",
                    createTime:"2019-01-02 22:52:46",
                    dataStatus:1,
                }
            };
        },
        methods:{

            }

    }
</script>

<style scoped>

</style>