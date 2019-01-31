<template>
    <input :value="value"  @click="$picker.showDate()"/>
</template>

<script>
    export default {
        props: ["value"],
        name: "date",
        created(){
            var that=this;
            this.$picker.datePicker(val=> that.$emit('input',that.$toDate(val)));
        },

        methods:{
        }
    }
</script>

<style scoped>

</style>
