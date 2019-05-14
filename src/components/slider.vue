<template>
    <cube-slide ref="slide" :data="urls">
        <cube-slide-item v-for="(item, index) in urls" :key="index" class="slider-item">
            <img :src="item.image" @click="showImagePreview(item.image)" class="slider-imgs">
        </cube-slide-item>
    </cube-slide>
</template>

<script>
    export default {
        name: 'Slider',
        props: {
            picUrls: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        data() {
            return {
                urls: [],
            }
        },
        created() {
            //console.log(this.picUrls)
            this.urls = this.picUrls;
        },
        methods: {
            showImagePreview(src) {
                this.$createImagePreview({
                    imgs: [src],
                }).show()
            }
        }


    }
</script>

<style>
    .slider-item {
        text-align: center;
    }

    .slider-imgs {
        /* padding: 0 .05rem 0 .04rem;*/
        height: 5.34rem;
        max-width: 100%;
        vertical-align: middle;
    }
</style>
