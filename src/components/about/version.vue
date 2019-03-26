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
            console.log("created on version");
            this.about();
        },
        methods: {
            about() {
                this.$http.post('/aboutus/getById/' + 3).then((res) => {
                    // console.log("about");
                    let va = res.data;
                    this.version.des = va.page.info.des;
                    this.version.title = va.page.info.title;
                    // console.log(va.page.info.des);
                })
            }
        }
    }
</script>

<style scoped>

</style>