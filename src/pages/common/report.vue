<!--弹框组件-->
<template>
  <div class="container">
    <header>选择举报原因举报</header>
    <ul>
      <li v-for="(item, index) in options" :key="index" @click.stop="reportMsg(item.id)">{{item.name}}</li>
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
    name: 'Report',
    data() {
      return {
        product: {
          productId: String,  // 产品id
          productName: String, // 产品name
          productType: String // 产品类型 {1：图书，2：电子，3：其他}
        },
        selectOther: false,  // 是否选择其他按钮，选中显示输入框
        selected: 0,       // 举报类型
        options: [],
        value: '',       // 其他类型描述
        disabled: true
      }
    },
    created() {
      // 获取举报类型
      this.getReportType();
      // 初始化接受的数据
      this.product.productId = this.$route.query.productId;
      this.product.productName = this.$route.query.productName;
      this.product.productType = this.$route.query.productType;
    },
    methods: {
      /*
       * 获取举报类型
       * @returns {null}
       */
      getReportType() {
        if (this.options.length !== 0) {
          return
        }
        this.$http.post('/reporttype/reporttypeinfo').then((res) => {
          if (Number(res.data.code) === 100) {
            this.options = res.data.page.pageinfo
          } else {
            // 上传错误信息
          }
        })
      },
      /*
       * 提交举报信息（不包括‘其他’类型）
       * @param index
       */
      reportMsg(index) {
        if (parseInt(index) === 1) {
          this.selectOther = true
        } else {
          this.selectOther = false
          this.product['des'] = '';
          this.product['reportType'] = index;
          this.showAlert('确认举报吗？', '平台将根据《e书平台公约》进行相关处理');
        }
      },
      /*
       * 提交举报信息（‘其他’类型）
       * */
      reportOtherMsg() {
        this.selectOther = true
        this.product['des'] = this.value;
        this.product['reportType'] = 1;  // 类型为1表示其他类型
        this.showAlert('确认举报吗？', '平台将根据《e书平台公约》进行相关处理');
      },
      showAlert(title, content) {
        const _that = this
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
            _that.$post('/reportproduct/save', this.product, () => {
              // 跳转回原页面
              _that.$router.go(-1)
            })
          },
          onCancel: () => {
          }
        }).show()
      },
      /*
       * 判断输入框是否为空
       * */
      hasContent() {
        this.disabled = !(this.value.trim() && this.value);
      }
    },
    watch: {
      'selected': function () {
        this.selectOther = Number(this.selected) === 1;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 20px;
    font-size: 16px;
    text-align: center;
    header {
      font-size: 18px;
      color: #767676;
    }
    div > * {
      margin-top: 10px;
    }
    ul {
      li {
        text-align: left;
        border-bottom: #eeeeee solid 1px;
        margin-top: 20px;
        &:last-child {
          border: 0;
        }
      }
    }
  }
</style>
