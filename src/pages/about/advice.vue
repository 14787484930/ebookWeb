<template>
  <div class="content">
    <div style=" margin: 20% 20px 0;">
      <!--用户建议（跳转）-->
      <div class="adviceWrap">
        <h1 class="adviceTitle">用户建议</h1>
        <div class="adviceTips">感谢您使用<em>西林易市</em>，若你在使用中有疑虑，或者有对于此产品的建议，请在下面输入，我们将在24小时内回复您！</div>
      </div>
      <div class="textarea-wrapper">
        <cube-textarea v-model="userAdvice.des" :maxlength="wordNum" placeholder="在此输入建议！"
                       @input="hasContent()"></cube-textarea>
      </div>
      <div class="btnWrap">
        <cube-button :disabled="disabled" @click="subAdvice()">提交</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'userAdvice',
    data() {
      return {
        userAdvice: {
          des: ''
        },
        wordNum: 150,
        disabled: true
      };
    },
    methods: {
      hasContent() {
        this.disabled = !(this.userAdvice.des.trim() && this.userAdvice.des)
      },
      subAdvice() {
        this.$post('/useradvice/save', this.userAdvice, (req) => {
          if (req.status === 200) {
            this.$createDialog({
              type: 'confirm',
              icon: 'cubeic-alert',
              title: '已经提交成功了！',
              content: '是否继续输入建议？',
              confirmBtn: {
                text: '是',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '否',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {
                this.userAdvice.des = ''
              },
              onCancel: () => {
                history.back()
              }
            }).show()
          }
        })
      }
    }

  }
</script>

<style scoped>
  .content {
    position: absolute;
    top: -73px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 2020;
    padding-top: 1.95rem;
    height: 111vh;
  }

  .adviceWrap {
    margin-bottom: 30px;
    color: #333;
  }

  .adviceTips, .adviceTips > em {
    font-family: '宋体';
  }

  .adviceTips {
    font-size: 12px;
    line-height: 1.5
  }

  .adviceTips > em {
    font-weight: bold;
  }

  .adviceTitle {
    text-align: center;
    font-size: 22px;
    margin-bottom: 30px;
  }

  .cube-textarea-wrapper {
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .cube-textarea_expanded {
    height: 180px;
  }

  .btnWrap {
    margin: 15px 0;
  }
</style>
