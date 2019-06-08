<!--学生身份校验模块-->
<template>
  <div class='container'>
    <div class='back_bg_self'>
      <header class='header'>学生身份验证</header>
    </div>
    <div class='l_logo' align='center'>
      <img :src='logoImg'>
    </div>

    <cube-form :model='model' @validate='validateHandler' @submit='submitHandler'>
      <cube-form-group>
        <cube-form-item :field='fields[0]'></cube-form-item>
        <cube-form-item :field='fields[1]'></cube-form-item>
        <div>
          <cube-form-item :field='fields[2]'></cube-form-item>
          <img class='verify-img' @click='freshCode()' :src='checkCode'>
        </div>
        <cube-form-item :field='fields[3]'></cube-form-item>
        <cube-form-item :field='fields[4]'></cube-form-item>
      </cube-form-group>
      <cube-button class='stud-submit'>验证</cube-button>
    </cube-form>
  </div>
</template>

<script>
  export default {
    name: 'verify',
    data() {
      return {
        url: '',
        sessionString: '',
        logoImg: '',
        checkCode: '',
        validity: {},
        valid: undefined,
        model: {
          schoolNo: '西南林业大学',
          studNo: '',
          studPassword: '',
          validCode: '',
          email: '123@qq.com'
        },
        fields: [
          {
            type: 'select',
            modelKey: 'schoolNo',
            label: '学校',
            props: {
              options: ['请选择学校', '西南林业大学', '云南大学', '云南理工大学']
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'studNo',
            label: '学号',
            props: {
              placeholder: '请输入学号'

            },
            rules: {
              pattern: /^[1-9]\d*$/,
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'studPassword',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: {
                open: false,
                reverse: false
              }
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'validCode',
            label: '验证码',
            props: {
              placeholder: '请输入验证码'
            },
            rules: {
              pattern: /^[1-9]\d*$/,
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'email',
            label: '邮箱',
            props: {
              placeholder: '请输入邮箱地址'
            },
            rules: {
              pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
              required: true
            }
          }
        ]
      }
    },
    created() {
      this.getSessionString()
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
      // 请求session字符串
      getSessionString() {
        this.$http.post('/user/getKey').then((res) => {
          this.sessionString = res.data.page.location
          if (Number(res.data.code) === 200) {
            alert('获取session失败')
          } else {
            this.url = 'http://202.203.132.204:8019/' + this.sessionString + '/default2.aspx';
            this.logoImg = 'http://202.203.132.204:8019/' + this.sessionString + '/logo/logo_school.png';
            this.checkCode = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx';
          }
        })
      },
      // 点击刷新验证码
      freshCode() {
        this.checkCode = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx?' + Math.random();
      },
      // 提交数据
      submitHandler(e) {
        const query = {}
        query['schoolNo'] = this.model.schoolNo
        query['studNo'] = this.model.studNo
        query['password'] = this.model.studPassword
        query['validCode'] = this.model.validCode
        query['email'] = this.model.email
        query['url'] = this.url

        this.$post('user/authentication', query, (msg) => {
          if (Number(msg.data.code) === 200) {
            this.showAlert('登陆验证', msg.data.page.errors)
            this.freshCode()
          } else {
            this.showAlert('登陆验证', '验证成功')
            this.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            // this.$router.push('/book')
          }
        });
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    .back_bg_self {
      height: 15%;
      background-color: #4a4c5b;
      font-size: 0.8em;
      padding: 15px 0;
      position: relative;
      .header {
        text-align: center;
        color: #FFF;
        margin: 0 auto;
      }
    }
    .l_logo {
      margin: 10% 0;
      img {
        width: 100%;
        padding: 0 10%;
      }
    }

    .verify-img {
      height: 2em;
      display: inline-block;
      float: right;
      margin-top: 0.4em;
      margin-right: 1em;
    }

    .stud-submit {
      width: 90%;
      margin: 20px;
    }
  }


</style>
