<template>
  <div>
    <div class="scroll-list-wrap addWrap">
      <cube-scroll ref="scroll">
        <template>
          <div class="list">
            <h1>填写清单</h1>
            <label class="form-group item item-input ">
              <span>零食名称：</span>
              <input type="text" class="isnull" v-model="goods.goodName" placeholder="点此填写">
            </label>
            <label class="form-group item item-input ">
              <span>出售价格(元)：</span>
              <input type="number" class="isnull" v-model="goods.goodPrice" placeholder="点此填写">
            </label>
            <label class="form-group item item-input ">
              <span>描述：</span>
              <input type="text" v-model="goods.des" placeholder="点此填写">
            </label>
            <file-com ref="refFiles" :urls="urls"></file-com>
            <button id='submit' :disabled="btnFlag" style="width: 100%" class="button button-positive"
                    @click="saveData">发布
            </button>
          </div>
        </template>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import FileCom from '../../../components/FileCom'
  import storage from '../../../assets/storage/index'

  let _that
  export default {
    name: 'goodsDeal',
    data() {
      return {
        goods: {
          id: 0,
          goodName: '',
          goodPrice: '',
          des: ''
        },
        urls: [],
        btnFlag: false  // 发布按钮是否能点击
      }
    },
    components: {
      FileCom
    },
    created() {
      _that = this
      this.goods.id = this.$route.query.id
      if (this.goods.id !== 0) {
        this.initData()
      }
    },
    methods: {
      initData() {
        this.$http.post('/good/getById/' + this.goods.id).then((res) => {
          _that.goods.id = res.data.page.info.id
          _that.goods.goodName = res.data.page.info.goodName
          _that.goods.goodPrice = res.data.page.info.goodPrice
          _that.goods.des = res.data.page.info.des
          const arr = _that.goods.goodPic.split(',')
          $.each(arr, (index, item) => {
            _that.urls.push({ url: _that.$file(item) })
          })
        })
      },
      saveData() {
        let url = '/good/save'
        if (parseInt(this.goods.id) !== 0) {
          url = '/good/update'
        }
        this.btnFlag = true;  // 设置提交按钮为不能点击状态
        this.$save(url, this.goods, this.$refs.refFiles.files, (msg) => {
          _that.btnFlag = false; // 设置提交按钮为可以点击状态
          this.$createDialog({
            type: 'alert',
            title: '信息',
            content: '保存成功 ',
            icon: 'cubeic-right',
            onConfirm: () => {
              this.$router.push({ path: '/goods'})
            }
          }).show()
        })
      }
    }
  }
</script>
<style scoped>
  .scroll-list-wrap {
    position: absolute;
    top: -73px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 10;
    padding-top: 1.95rem;
    height: 111vh;
  }

  .scroll-list-wrap #submit {
    margin-bottom: 20px;
  }
</style>
