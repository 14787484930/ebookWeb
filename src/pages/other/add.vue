<template>
  <div class="scroll-list-wrap addWrap">
    <cube-scroll ref="scroll">
      <template>
        <div class="list">
          <h1>填写清单</h1>
          <label class="form-group item item-input ">
            <span>物品名称：</span>
            <input type="text" class="isnull" v-model="other.otherName" placeholder="点此填写">
          </label>
          <label class="form-group item item-input ">
            <span>官方价格(元)：</span>
            <input type="text" v-model="other.originalPrice" placeholder="点此填写">
          </label>
          <label class="form-group item item-input ">
            <span>出售价格(元)：</span>
            <input type="text" class="isnull" v-model="other.presentPrice" placeholder="点此填写">
          </label>
          <label class="form-group item item-input ">
            <span>购买日期：</span>
            <input type="text" readonly="readonly"
                   v-model="other.buyDate"
                   @click="$picker.showDate('type')"
                   placeholder="购买日期">
          </label>
          <label class="form-group item item-input ">
            <span>是否有发票：</span>
            <!--<input type="text" v-model="other.hasInvoice">-->
            <cube-switch v-model="value" v-on:change="hasInvoice">
              <!--是否有发票-->
            </cube-switch>
          </label>
          <label class="form-group item item-input ">
            <span>联系方式：</span>
            <input type="text" class="isnull tel" v-model="other.phone" placeholder="点此填写">
          </label>
          <label class="form-group item item-input ">
            <span>微信：</span>
            <input type="text" class="isnull" v-model="other.weiXin" placeholder="点此填写">
          </label>
          <label class="form-group item item-input ">
            <span>描述：</span>
            <input type="text" v-model="other.des">
          </label>
          <file-com ref="refFiles" :urls="urls"></file-com>
          <button id="submit" :disabled="submitBtn" style="width: 100%" class="button button-positive"
                  @click="saveData">发布
          </button>
        </div>
      </template>
    </cube-scroll>
  </div>
</template>

<script>
  import FileCom from '../../components/FileCom'
  import $ from 'jquery'

  let _that;
  export default {
    name: 'add',
    data() {
      return {
        value: true,
        other: {
          otherName: '',
          originalPrice: '20',
          presentPrice: '15',
          buyDate: '2013-12-12',
          hasInvoice: '1',
          otherPic: '',
          phone: this.$store.getters.getUser.phone,
          weiXin: this.$store.getters.getUser.weiXin,
          des: ''
        },
        urls: [],
        submitBtn: false
      }
    },
    components: {
      'file-com': FileCom
    },
    created() {
      _that = this;
      this.initDateType();
      this.other.id = this.$route.query.id;
      if (parseInt(this.other.id) !== 0) {
        this.initData();
      }
    },
    methods: {
      // 初始化出版日期选择
      initDateType() {
        this.$picker.datePicker((val, index, text) => {
          _that.other.buyDate = index.join('-');
        });
      },
      initData() {
        this.$http.post('/other/getById/' + this.other.id).then((res) => {
          for (const i in this.other) {
            _that.other[i] = res.data.page.info[i];
          }
          _that.other.buyDate = _that.$toDate(_that.other.buyDate);
          _that.other.otherType = 1;// 先不做处理后面要删除
          var arr = _that.other.otherPic.split(',');
          $.each(arr, (index, item) => {
            _that.urls.push({ url: _that.$file(item) });
          })
        })
      },
      saveData() {
        let url = '/other/save';
        if ((this.other.id).length > 1) {
          _that.other['otherPic'] = '';
          url = '/other/update';
        }
        this.submitBtn = true;
        this.$save(url, this.other, this.$refs.refFiles.files, (msg) => {
          _that.submitBtn = false;
          this.$createDialog({
            type: 'alert',
            title: '信息',
            content: '保存成功 ',
            icon: 'cubeic-right',
            onConfirm: () => {
              this.$router.push({ path: '/other' })
            }
          }).show()
        })
      },
      hasInvoice() {
        if (this.value) {
          this.other.hasInvoice = '1';
        } else {
          this.other.hasInvoice = '0';
        }
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

  /*滚动的页面的高度 -by gpj*/
</style>
