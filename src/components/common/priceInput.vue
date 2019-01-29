<template>
    <div>
        <div class="list">

            <div class="item item-input-inset">
                <label class="item-input-wrapper">
                    <input type="number" placeholder="最低价" v-model="low" @change="changePrice" style="width: 50px">
                </label>
                至
                <label class="item-input-wrapper">
                    <input type="number" placeholder="最高价" v-model="up" @change="changePrice"  style="width: 50px">
                </label>
            </div>

        </div>
    </div>
</template>

<script>
    import $format from '../../webserver/serve/format'
    export default {
        name: "priceInput",
        data () {
            return {
                low:0,
                up:0,
            }
        },
        methods:{
            changePrice(){
                let data=[];
                if($format.toFloat(this.up)>=$format.toFloat(this.low))
                    data=[this.low,this.up]
                else
                    data=[this.up,this.low]
                this.$emit('change',data);
            }
        }
    }
</script>

<style scoped>

</style>
