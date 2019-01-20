<template>
    <div>
        {{id}}
    </div>
</template>

<script>
    export default {
        name: "view",
        data(){
            return{
                id:0,
            }
        },
        created(){
            console.log(this.$route)
            this.id=this.$route.query.id;
        }
    }
</script>

<style scoped>

</style>
