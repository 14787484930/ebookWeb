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
                  type: 'select',
                  modelKey: '入学时间',
                  label: 'Select',
                  props: {
                    options: ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋']
                  },
                  rules: {
                    required: true
                  }
                },
                {
                  type: 'input',
                  modelKey: 'inputBuildingNumber',
                  label: '寝室号',
                  props: {
                    placeholder: '如1号寝楼..'
                  },
                  rules: {
                    required: true
                  },
                  // validating when blur
                  trigger: 'blur'
                }
              ]
            },
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
        fd.append('buildingNumber', this.inputBuildingNumber)
        fd.append('superMarketName', this.inputShopName)
        postRegeditSellerTest(fd)
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