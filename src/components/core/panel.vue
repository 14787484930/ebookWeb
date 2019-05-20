<template>
    <section :class="[panelClass, cname]">
        <h4 v-if="title">{{title}}</h4>
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: {
        cname: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    data(){
        return {
            panelClass: "panel",
        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/element";
    .panel{
        @include panel;
        /*
        >h4{
            //panel的h4标题下添加横向
            border-bottom: 1px solid #ddd;
        }*/
    }
</style>
