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
      return { content: '11' }
    },
    methods: {
      updateData(e = '') {
        const c1 = e.replace(/<img width="100%"/g, '<img');
        this.content = c1.replace(/<img/g, '<img width="100%"');
        console.info(e);
      }
    }
  }
</script>

<style scoped>

</style>

