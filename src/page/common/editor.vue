<template>
    <div class="content">
        <h1>富文本编辑器</h1>
        <vue-html5-editor :content="content" :height="400"
                          @change="updateData">
        </vue-html5-editor>
        <Button>完成</Button>
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

