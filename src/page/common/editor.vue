<template>
    <div class="content">
        <h1>h1哈哈</h1>
        <b>哈哈</b>
        <vue-html5-editor :content="content" :height="400"
                          @change="updateData">
        </vue-html5-editor>
    </div>
</template>

<script>
    import initRichText  from '../../frame/initHTMLEditor'
    initRichText()
    export default {
        data() {
            return {content: '请输入文章内容'}
        },
        methods: {
            updateData(e = '') {
                this.content = e;
                console.info(e);
            }
        }
    }
</script>

<style scoped>

</style>

