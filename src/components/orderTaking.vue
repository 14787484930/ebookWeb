<!--接单相关模块-->
<template>
  <div>
    <section v-if='btnNumber===1'>
      <button v-if='orderQuery.btnFlag' @click='show' class='report-btn'>{{orderQuery.orderQueryName}}</button>
      <div v-if='panelShow' class='module-dialog' style='display: block'>
        <div class='dialog-panel'>
          <header class='dialog-tit'>
            <h4>{{orderQuery.orderQueryName}}</h4>
            <span @click='close' class='cubeic-close'></span>
          </header>
          <article class='confirm-msg'>
            <cube-input v-model='orderQuery.text' placeholder='请输入订单码'></cube-input>
            <cube-validator v-model='orderQuery.valid' ref='validator0'
                            :model='orderQuery.text'
                            :rules='orderQuery.rules'
                            :messages='orderQuery.messages'>
            </cube-validator>
          </article>
          <footer class='dialog-btn-wrap'>
            <button class='cancel' @click='close'>取消</button>
            <button class='confirm' @click='getOrder'>确定</button>
          </footer>
        </div>
      </div>
    </section>

    <section v-if='btnNumber===2'>
      <button v-if='orderCancel.btnFlag' @click='show' class='report-btn'>{{orderCancel.orderCancelName}}</button>
      <div v-if=panelShow class='module-dialog' style='display: block'>
        <div class='dialog-panel'>
          <header class='dialog-tit'>
            <h4>{{orderCancel.orderCancelName}}</h4>
            <span @click='close' class='cubeic-close'></span>
          </header>
          <article class='confirm-msg'>
            <h3>{{orderCancel.reconfirm}}</h3>
          </article>
          <footer class='dialog-btn-wrap'>
            <button class='cancel' @click='close'>取消</button>
            <button class='confirm' @click='cancelOrder'>确定</button>
          </footer>
        </div>
      </div>
    </section>

    <section v-if='btnNumber===3'>
      <button v-if='orderUser.btnFlag' @click='getOrderPersonMsg' class='report-btn'>{{orderUser.nickname}}
      </button>
      <div v-if=panelShow class='module-dialog' style='display: block'>
        <div class='dialog-panel'>
          <article class='confirm-msg'>
            <h4><span>昵称:</span>{{orderUser.nickname}}</h4>
            <h4><span>评分:</span>{{orderUser.score}}</h4>
            <h4><span>微信:</span>{{orderUser.weiXin}}</h4>
            <h4><span>邮箱:</span>{{orderUser.email}}</h4>
          </article>
          <footer class='dialog-btn-wrap'>
            <button class='cancel' @click='close'>取消</button>
            <button class='confirm' @click='close'>确定</button>
          </footer>
        </div>
      </div>
    </section>

    <section v-if='btnNumber===4'>
      <button v-if='giveMark.btnFlag' @click='show' class='report-btn'>{{giveMark.giveMarkName}}</button>
      <div v-if=panelShow class='module-dialog' style='display: block'>
        <div class='dialog-panel'>
          <header class='dialog-tit'>
            <h4>{{giveMark.giveMarkName}}</h4>
            <span @click='close' class='cubeic-close'></span>
          </header>
          <article class='confirm-msg'>
            <cube-rate v-model='giveMark.value'
                       :disabled='giveMark.disabled'
                       :max='giveMark.max'
                       :justify='giveMark.justify'>
            </cube-rate>
            <cube-checkbox v-model='checked' position='right' shape='square' :hollow-style='true'>
              举报用户
            </cube-checkbox>
            <cube-textarea v-model='value' v-if='options.disabled'></cube-textarea>
            <div v-if='!this.value && this.checked' style='color: red'>举报内容不能为空</div>
          </article>
          <footer class='dialog-btn-wrap'>
            <button class='cancel' @click='close'>取消</button>
            <button class='confirm' @click='reportUser'>确定</button>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      btnNumber: Number,         // {1:接单，2：撤销接单，3：查询接单人信息, 4：评分}
      id: String,                // 产品id
      orderUserId: String       // 接单人id
    },
    data() {
      return {
        orderQuery: {
          orderQueryName: '接单',
          text: '',
          valid: undefined,
          rules: {
            required: true,
            pattern: /^[A-Za-z0-9]{1,6}$/
          },
          messages: {
            pattern: '验证码格式有误'
          },
          btnFlag: true   // 是否显示按钮
        },
        orderCancel: {
          orderCancelName: '撤销接单',
          reconfirm: '是否撤销接单？',
          btnFlag: true   // 是否显示按钮
        },
        orderUser: {
          nickname: '接单人',
          weiXin: '',
          score: 0,
          studNo: '',
          email: '',
          btnFlag: true   // 是否显示按钮
        },
        giveMark: {
          giveMarkName: '评分',
          disabled: false,
          max: 10,
          value: 0,
          justify: false,
          btnFlag: true   // 是否显示按钮
        },
        panelShow: false,       // 是否显示弹框
        checked: false,
        options: {
          label: 'Option Checkbox',
          value: 'optionValue',
          disabled: false
        },
        value: ''             // 其他类型描述
      }
    },
    watch: {
      'checked': function () {
        this.options.disabled = this.checked;
        if (this.checked === false) {
          this.value = '';
        }
      }
    },
    methods: {
      showAlert(title, content) {
        this.$createDialog({
          type: 'alert',
          title: title,
          content: content,
          icon: 'cubeic-alert'
        }).show()
      },
      getOrder() { // 接单
        this.panelShow = false;
        const props = { id: this.id, checkCode: this.orderQuery.text };
        this.$post('/tutoring/getOrder', props, (msg) => {
          switch (Number(msg.data.code)) {
            case 200: {
              // 失败
              if (Number(msg.data.page.code) === 101) {
                // 没有学生认证，跳转到学生认证
                this.$router.push('/verify')
              } else {
                // 其他原因
                this.showAlert('接单', msg.data.page.msg)
              }
              break
            }
            case 100: {
              // 成功
              this.showAlert('接单', msg.data.page.msg)
              this.orderQuery.btnFlag = false; // 隐藏接单按钮
              break
            }
            default : {
              this.showAlert('接单', msg.data.page.msg)
              break
            }
          }
        })
      },
      getOrderPersonMsg() { // 查看接单人信息
        this.$post('/user/getById/' + this.orderUserId, '', (msg) => {
          if (Number(msg.data.code) === 200) {
            this.showAlert('获取信息失败', '******')
          } else {
            this.orderUser.nickname = msg.data.page.info.nickname
            this.orderUser.weiXin = msg.data.page.info.weiXin
            this.orderUser.studNo = msg.data.page.info.studNo
            this.orderUser.score = msg.data.page.info.score
            this.orderUser.email = msg.data.page.info.email
          }
        });
        this.panelShow = true
      },
      cancelOrder() { // 撤销接单
        this.panelShow = false
        const props = { id: this.id }
        this.$post('/tutoring/delOrder', props, (msg) => {
          switch (Number(msg.data.code)) {
            case 100: {
              // 成功
              this.showAlert('撤销接单', msg.data.msgs.msg)
              // 隐藏接单人和撤销接单按钮
              break;
            }
            default : {
              this.showAlert('撤销接单', msg.data.msgs.msg)
            }
          }
        })
      },
      reportUser() { // 举报接单人
        const props = {
          orderUser: this.orderUserId, id: this.id, score: this.giveMark.value,
          flag: Number(this.checked), des: this.value
        }
        if (props.flag === 1 && props.des === '') {
          return;
        }
        this.panelShow = false;
        this.$post('/tutoring/updateScore', props, (msg) => {
          if (Number(msg.data.code) === 200) {
            this.showAlert('评分', msg.data.msgs.msg)
          } else {
            this.showAlert('评分', msg.data.msgs.msg)
            this.orderCancel.btnFlag = false
            this.giveMark.btnFlag = false
          }
        })
      },
      show() {
        this.panelShow = true;
      },
      close() {
        this.panelShow = false;
      }
    }
  }
</script>
