<!--弹框组件-->
<template>
    <div>
        <button @click="show" class="report-btn reportBtn">举报</button>

        <div v-if="panelShow" class="module-dialog" style="display: block">
            <div class="dialog-panel">
                <header class="dialog-tit">
                    <h4>举报</h4>
                    <span @click="close" class="cubeic-close"></span>
                </header>

                <article class="confirm-msg">
                    <cube-radio-group v-model="selected" :options="options" position="left" :hollow-style="true"/>
                    <cube-textarea v-model="value" v-if=selectOther></cube-textarea>
                </article>

                <footer class="dialog-btn-wrap">
                    <button class="cancel" @click="close">取消</button>
                    <button class="confirm" @click="reportMsg">确定</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                productId: String,  //产品id
                productName: String, //产品name
                productType: String, //产品类型 {1：图书，2：电子，3：其他}
            }
        },
        data() {
            return {
                selectOther: false,  //是否选择其他按钮，选中显示输入框
                panelShow: false, //是否显示弹框
                selected: 0,       //举报类型
                options: [],
                value: "",       //其他类型描述
            }
        },
        computed: {},
        methods: {
            showAlert(title, content) {
                this.$createDialog({
                    type: 'alert',
                    title: title,
                    content: content,
                    icon: 'cubeic-alert'
                }).show()
            },
            getReportType() {
                if (this.options.length !== 0)
                    return null;

                this.$http.post('/reporttype/reporttypeinfo').then((res) => {
                    if (Number(res.data.code) === 100) {
                        this.selected = res.data.page.pageinfo.length;
                        for (let i = 0; i < res.data.page.pageinfo.length; i++) {
                            this.options.push({
                                label: res.data.page.pageinfo[i].name,
                                value: Number(res.data.page.pageinfo[i].id),
                                disabled: false
                            });
                        }
                    } else {
                        //上传错误信息
                    }

                });
            },
            show() {
                //获取举报类型
                this.getReportType();
                this.panelShow = true;
            },
            close() {
                this.panelShow = false;
            },
            reportMsg(e) {
                this.panelShow = false;
                this.product['reportType'] = this.selected;
                this.product['des'] = this.value;
                this.$post('/reportproduct/save', this.product, (msg) => {
                    if (Number(msg.data.code) === 200) {
                        alert("失败")
                    } else {
                        this.showAlert('举报成功', '感谢您的举报，我们会尽快处理');
                    }
                });

                e.preventDefault();
            }
        },
        watch: {
            'selected': function () {
                this.selectOther = Number(this.selected) === 1;
            }
        }
    }
</script>

<style>
    .reportBtn{background-color:#d6d6d6!important;color: #0f0f0f!important;}
</style>
