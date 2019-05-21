<!--轮播图模块-->
<template>
    <cube-slide ref="slide" :data="urls">
        <cube-slide-item v-for="(img, index) in urls" :key="index" class="slider-item">
            <img :src="img.image" @click="handleImgsClick(index)" class="slider-imgs">
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
                initialIndex: 0,
                urls: [],
            }
        },
        created() {
            //console.log(this.picUrls)
            this.urls = this.picUrls;
        },
        methods: {
            handleImgsClick(index) {
                let imgArr = [];
                for (let i in this.urls) {
                    imgArr.push(this.urls[i].image)
                }
                this.initialIndex = index
                const params = {
                    $props: {
                        imgs: imgArr,
                        initialIndex: 'initialIndex', // 响应式数据的key名
                        loop: false
                    },
                    $events: {
                        change: (i) => {
                            // 必须更新 initialIndex
                            this.initialIndex = i
                        }
                    }
                }
                this.$createImagePreview({...params}).show()
            }

        }
    }
</script>

<style>
    .slider-item {
        text-align: center;
    }

    .slider-imgs {
        height: 5.34rem;
        max-width: 100%;
        vertical-align: middle;
    }
</style>
