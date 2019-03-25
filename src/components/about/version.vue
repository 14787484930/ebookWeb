<template>

    <div align="center" style="margin-top: 50%">
        <div style="margin-top: 30%" class="bar bar-header">
            <div class="h1 title">{{version.title}}</div>
        </div>
            <div class="card">
                <div class="item item-text-wrap">
                    {{version.des}}
                </div>
            </div>


    </div>
</template>

<script>
    export default {
        name: "version",
        data(){
            return{
                version:{
                    title:"关于我们",
                    des:"二手贸易平台，版本号是1.0.0"
                }
            }
        }
    }
</script>

<style scoped>

</style>