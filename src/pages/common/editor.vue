<template>
    <div class="content">
        <vue-html5-editor :content="content" :height="1000"
                          @change="updateData">
        </vue-html5-editor>
    </div>
</template>

<script>
    import initRichText from '../../frame/initHTMLEditor'
    initRichText()
    export default {
        data() {
            return {content: '11'}
        },
        methods: {
            updateData(e = '') {
                let c1 = e.replace(/<img width="100%"/g, '<img');
                let c2 = c1.replace(/<img/g, '<img width="100%"');
                this.content = c2;

                console.info(e);
            }
        }
    }
</script>

<style scoped>

</style>

