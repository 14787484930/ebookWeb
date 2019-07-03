<template>
  <cube-scroll class="list-content">
    <cube-form
        :model="model"
        :schema="schema"
        :immediate-validate="false"
        :options="options"
        @validate="validateHandler"
        @submit="submitHandler"
        @reset="resetHandler"></cube-form>
  </cube-scroll>
</template>

<script>
  import { postRegeditSellerTest } from '../../../api'

  export default {
    data() {
      return {
        validity: {},
        valid: undefined,
        model: {
          inputShopName: '',
          inputBuildingNumber: '',
          inputRoom: '',
          rateValue: 0,
          selectValue: 2018
        },
        schema: {
          groups: [
            {
              legend: '商铺注册信息',
              fields: [
                {
                  type: 'input',
                  modelKey: 'inputShopName',
                  label: '商铺名称',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                  // validating when blur
                  trigger: 'blur'
                },
                {
                  type: 'input',
                  modelKey: 'inputBuildingNumber',
                  label: '楼栋',
                  props: {
                    placeholder: '如1号寝楼..'
                  },
                  rules: {
                    required: true
                  },
                  // validating when blur
                  trigger: 'blur'
                },
                {
                  type: 'select',
                  modelKey: '入学时间',
                  label: 'Select',
                  props: {
                    options: [2015, 2016, 2017, 2018, 2019, 2020]
                  },
                  rules: {
                    required: true
                  }
                },
                {
                  type: 'input',
                  modelKey: 'inputRoom',
                  label: '寝室',
                  props: {
                    placeholder: '请输入'
                  },
                  rules: {
                    required: true
                  },
                  // validating when blur
                  trigger: 'blur'
                }
              ]
            },
            // {
            //   legend: '选填',
            //   fields: [
            //     {
            //       type: 'rate',
            //       modelKey: 'rateValue',
            //       label: 'Rate',
            //       rules: {
            //         required: true
            //       }
            //     }
            //   ]
            // },
            {
              fields: [
                {
                  type: 'submit',
                  label: '提交'
                },
                {
                  type: 'reset',
                  label: '重置'
                }
              ]
            }
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'standard' // classic fresh
        }
      }
    },
    computed: {
      userId: function () {
        return this.$store.getters.getUserId
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault()
        const fd = new FormData()
        fd.append('id', this.userId)
        fd.append('buildingNumber', this.model.inputBuildingNumber)
        fd.append('superMarketName', this.model.inputShopName)
        postRegeditSellerTest(fd).then((res) => {
          console.log(res)
        })
        console.log('submit', e)
      },
      validateHandler(result) {
        this.validity = result.validity
        this.valid = result.valid
      },
      resetHandler(e) {
        console.log('reset', e)
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .list-content
    overflow: hidden

</style>