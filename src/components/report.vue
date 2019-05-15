<!--弹框组件-->
<template>
    <div class="container">
        <h5>选择举报原因举报</h5>
        <ul>
            <li v-for="(item, index) in options" :key="index" @click.stop="reportMsg(item.id)">{{item.name}}
            </li>
        </ul>
        <div v-if="selectOther">
            <cube-textarea v-model="value" @input="hasContent()"></cube-textarea>
            <div class="btnWrap">
                <cube-button :disabled="disabled" @click="reportOtherMsg()">提交</cube-button>
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
                selected: 0,       //举报类型
                options: [],
                value: "",       //其他类型描述
                disabled: true,
            }
        },
        created() {
            //获取举报类型
            this.getReportType();
        },
        methods: {
            /**
             * 获取举报类型
             * @returns {null}
             */
            getReportType() {
                if (this.options.length !== 0)
                    return null;

                this.$http.post('/reporttype/reporttypeinfo').then((res) => {
                    if (Number(res.data.code) === 100) {
                        this.options = res.data.page.pageinfo
                    } else {
                        //上传错误信息
                    }
                });
            },
            /**
             *
             * @param index
             */
            reportMsg(index) {
                if (parseInt(index) === 1)
                    this.selectOther = true
                else {
                    this.selectOther = false
                    console.log(this.product)
                    this.product['des'] = '';
                    this.product['reportType'] = index;

                    this.showAlert('确认举报吗？', '平台将根据《e书平台公约》进行相关处理');
                }
            },
            reportOtherMsg() {
                this.selectOther = true
                this.product['des'] = this.value;
                this.product['reportType'] = 1;  //类型为1表示其他类型
                this.showAlert('确认举报吗？', '平台将根据《e书平台公约》进行相关处理');
            },
            showAlert(title, content) {
                let _that = this
                this.$createDialog({
                    type: 'confirm',
                    icon: 'cubeic-alert',
                    title: title,
                    content: content,
                    confirmBtn: {
                        text: '确定',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        _that.$post('/reportproduct/save', this.product, (msg) => {
                            //跳转回原页面
                        });
                    },
                    onCancel: () => {
                    }
                }).show()
            },
            /**
             * 判断输入框是否为空
             * */
            hasContent() {
                this.disabled = !(this.value.trim() && this.value);
            },

        },
        watch: {
            'selected': function () {
                this.selectOther = Number(this.selected) === 1;
            }
        }
    }
</script>

<style scoped>
    .container {
        text-align: center;
        margin-top: 10px;
        font-size: 17px;
    }

    li {
        text-align: left;
        border-bottom: #eeeeee solid 1px;
        margin-top: 20px;
    }

    li:last-child {
        border: 0;
    }
</style>
