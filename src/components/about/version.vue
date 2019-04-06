<template>

    <div align="center" style="margin-top: 50%">
        <div style="margin-top: 30%" class="bar bar-header">
            <div class="h1 title">{{version.title}}</div>
        </div>
            <div class="card">
                <div class="item item-text-wrap">
                    {{version.des}}
                </div>
            </div>


    </div>
</template>

<script>
    export default {
        name: "version",
        data() {
            return {
                version: {
                    title: "",
                    des: "",
                }
            }
        },
        created() {
            this.about();
        },
        methods: {
            about() {
                this.$http.post('/aboutus/us/').then((res) => {
                    this.version.des = res.data.page.pageinfo.des;
                    this.version.title = res.data.page.pageinfo.title;
                })
            }
        }
    }
</script>

<style scoped>

</style>