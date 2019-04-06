<template>
    <input v-if="tpe='time'" :value="value"  @click="showTime"/>
    <input v-else :value="value"  @click="$picker.showDate()"/>
</template>

<script>
    export default {
        props: ["value",'type'],
        name: "date",
        created(){
            var that=this;
            if(this.type!="time"){
                this.$picker.datePicker(val => that.$emit('input', that.$toDate(val)));
            }
        },

        methods:{
            showTime(){
                var that=this;
                this.$createDatePicker({
                    title: '选择时间',
                    min: new Date(2008, 1, 8, 8, 0),
                    max: new Date(2020, 12, 20, 20, 59),
                    value: new Date(),
                    format: {
                        year: 'YY年',
                        month: 'MM月',
                        date: 'D日',
                        hour:"hh时",
                        minute:"mm分",
                    },
                    columnCount: 5,
                    onSelect: function (date, selectedVal, selectedText) {
                         const val=that.$toDate(date,"yyyy-MM-dd HH:mm")
                        that.$emit('input', val)
                    },
                }).show()
            }
        }
    }
</script>

<style scoped>

</style>
