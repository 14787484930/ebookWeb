<template>
  <section class="container">
    <div class="content">
      <div class="title">基本信息</div>
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <cube-form-item :field="fields[2]"></cube-form-item>
          <cube-form-item :field="fields[3]"></cube-form-item>
        </cube-form-group>
      </cube-form>
      <cube-button class="stud-submit">验证</cube-button>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'mycenter',
    data() {
      return {
        model: {
          NickName: '巴拉巴拉',
          PhoneNumber: '14787461136',
          Email: '14787484930@163.com',
          Address: '1栋二单元110室'
        },
        fields: [
          {
            type: 'input',
            modelKey: 'NickName',
            label: '昵称:',
            props: {
              placeholder: '巴拉巴拉',
              readonly: true
            }
          },
          {
            type: 'input',
            modelKey: 'PhoneNumber',
            label: '手机号：',
            props: {
              placeholder: '请输入手机号'

            },
            rules: {
              pattern: /^[0](13|15)[0-9]{9}$/,
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'Email',
            label: '邮箱',
            props: {
              placeholder: '请输入邮箱地址'
            },
            rules: {
              pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
              required: true
            }
          },
          {
            type: 'select',
            modelKey: 'Address',
            label: '地址',
            props: {
              options: ['请选择', '1栋二单元110室', '1栋二单元110室', '1栋二单元110室']
            },
            rules: {
              required: true
            }
          }
        ]
      }
    },
    created() {
    },
    methods: {
      // 提交数据
      submitHandler() {
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    background-color: #f5f5f5;
    height: 100vh;
    transform: rotate(0deg);
    overflow: hidden;
    .content {
      margin: 20px;
      overflow: hidden;
      .title {
        font-size: 18px;
        margin: 15px 0;
        text-align: center;
        color: #767676;
      }
      .stud-submit {
        margin-top: 20px;
      }
    }
  }
</style>
