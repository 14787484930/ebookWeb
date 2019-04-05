<!--弹框组件-->
<template>
    <div>
        <button @click="show" class="report-btn">举报</button>
        <div v-if=panelShow>
            <div class="module-dialog" style="display: block; opacity: 1">
                <div class="dialog-panel">
                    <header class="dialog-tit">
                        <h4>举报</h4>
                        <span @click="close"></span>
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
            showAlert() {
                this.$createDialog({
                    type: 'alert',
                    title: '举报成功',
                    content: '感谢您的举报，我们会尽快处理',
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
                        this.showAlert('myPopup');
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
    .report-btn {
        float: right;
        background-color: #5bc0de;
        color: #0f0f0f;
        display: inline-block;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px 20px;
        margin: 10px;
    }
    .module-dialog {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1001;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .module-dialog:after {
        content: '';
        height: 100%;
        margin-left: -.25em;
        background-color: #2aabd2;
    }

    .module-dialog .dialog-panel,
    .module-dialog:after {
        display: inline-block;
        vertical-align: middle;
    }

    .module-dialog .dialog-panel {
        position: relative;
        width: 250px;
        min-width: 100px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, .14);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 1);
        text-align: left;
    }

    .module-dialog .dialog-tit {
        height: 40px;
        padding: 0 15px;
        border-radius: 8px 8px 0 0;
        border-bottom: 1px solid #d4d4d4;
        box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
        background: linear-gradient(#fbfbfb, #ececec);
        line-height: 40px;
    }

    .module-dialog .dialog-tit h4 {
        float: left;
        padding-left: 15px;
        font-size: 18px;
        font-weight: 400;
        color: #333;
    }

    .module-dialog .confirm-msg {
        margin: 10px auto;
        min-height: 150px;
        max-height: 350px;
        text-align: center;
        font-size: 16px;
        overflow-y: scroll;
    }

    .dialog-btn-wrap {
        overflow: auto;
    }
    .dialog-btn-wrap button {
        color: #0f0f0f;
        font-size: 15px;
        padding: 10px 20px;
        margin: 10px;
        border-radius: 15px;
        display: inline-block;
    }
    .dialog-btn-wrap .cancel{
        background-color: #6c6c6c;
        float: left;
    }

    .dialog-btn-wrap .confirm{
        background-color: #5bc0de;
        float: right;
    }

</style>
