<template>
    <div  class="aboutWrap">
       <div class="logoWrap">
        <div class="logo"><img src="../../assets/logo.png"></div>
        <h1 class="logoTitle">{{version.title}}</h1>
       </div>

        <div class="aboutTxt">
            <p>{{version.des}}</p>
            <p class="telWrap">
                <small>服务电话：14787484930</small><br>
                <small>服务QQ：690345407</small>
            </p>
        </div>
        <div class="areaWrap">
            <img src="../../assets/images/areaImg.png" alt="">
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
   .logoTitle,.areaWrap,.logo>img{margin:10px auto;}
   .logoTitle{text-align: center;font-size:22px;position:relative;}
   .aboutWrap{margin:15% 30px;}
   .logo{}
   .logo>img{display:block;width:64px;height:64px;}
   .logoWrap{margin-bottom:30px;}
   .aboutTxt{text-align: justify;font-size:14px;border-bottom: 1px dashed #ccc;border-top: 1px dashed #ccc;padding: 10px 0;}
   .aboutTxt>p:nth-of-type(1){line-height: 1.5; text-indent: 2em;}
   .aboutTxt>p:nth-of-type(2){line-height: 1.2}
   .areaWrap{}
   .areaWrap>img{display:block;max-width:100%;}
   .telWrap{margin-bottom:0;margin-top:10px;}
</style>
