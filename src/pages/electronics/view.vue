<template>
  <div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <slider :pic-urls="urls"></slider>
        <template>
          <div class="listHead">
            <div class="relPrice"><i class="priceTip">出售价</i><strong>￥{{electronics.presentPrice}}</strong>
            </div>
            <div class="defaultPrice">原价：<span>￥{{electronics.originalPrice}}</span></div>
          </div>
          <ul class="list">
            <li class="item item-input">
              <span>品名：</span>
              <strong>{{electronics.electronicsName}}</strong>
            </li>

            <li class="item item-input">
              <span>电子类型：</span>
              <span>{{electronics.electronicsType}}</span>
            </li>

            <li class="item item-input">
              <span>购买日期：</span>
              <span>{{electronics.buyDate}}</span>
            </li>
            <li class="item item-input">
              <span>是否有发票：</span>
              <span v-if="electronics.hasInvoice">有发票</span>
            </li>
            <li class="item item-input" v-if="power">
              <span>联系电话：</span>
              <span>{{electronics.phone}}</span>
            </li>
            <li class="item item-input" v-if="power">
              <span>微信：</span>
              <span>{{electronics.weiXin}}</span>
            </li>
            <li class="item item-desc">
              <span>描述：</span>
              <span>{{electronics.des}}</span>
            </li>
          </ul>
        </template>
        <router-link class="report-style" v-if="!powerFlag"
                     :to="{path:'/report', query:{productId: electronics.id ,
                                productName: electronics.electronicsName,productType: 2}}">举报
        </router-link>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import storage from '../../assets/storage/index'
  import slider from '../../components/slider'
  import $ from 'jquery';

  let _that;
  export default {
    components: {
      slider
    },
    // name: "view",
    data() {
      return {
        // 获取详细信息
        electronics: {
          electronicsName: '',
          electronicsType: '',
          originalPrice: '20',
          presentPrice: '15',
          buyDate: '2013-12-12',
          hasInvoice: '1',
          electronicsPic: '',
          weiXin: '',
          phone: '',
          des: ''
        },

        // 图片地址轮播
        urls: []
      }
    },
    created() {
      _that = this;
      this.electronics.id = this.$route.query.id;
      if ((this.electronics.id).length > 1) {
        this.initData()
      } else {
        console.log('[error]选择的物品id为0，请检查物品id是否正确!');
      }
    },
    computed: {
      power() {
        return this.$store.getters.power;
      },
      powerFlag() {
        return this.$store.getters.powerFlag;
      }
    },
    methods: {
      initData() {
        this.$http.post('/electronics/getById/' + this.electronics.id).then((res) => {
          _that.electronics = res.data.page.info;
          _that.electronics.buyDate = _that.$toDate(_that.electronics.buyDate);
          _that.electronics.electronicsType = _that.getElectronicTypeName(_that.electronics.electronicsType);
          const arr = _that.electronics.electronicsPic.split(',');
          $.each(arr, (index, item) => {
            _that.urls.push({ image: _that.$file(item) });
          })
        });
      },
      /*
       * 将类型由数字改为字符串
       * @param typeNum
       * @returns {*}
       */
      getElectronicTypeName(typeNum) {
        const key = 'electronicsType';
        const aValue = storage.getSession(key);
        let value = aValue[typeNum - 1].text;
        if (typeof value === undefined) {
          value = '未知';
          console.error('ElectronicView getElectronicTypeName: value error')
        }
        return value;
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

  /*滚动的页面的高度 -by gpj*/
  .item-desc {
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }

  .report-style {
    float: right;
    font-size: 13px;
    margin-right: 20px;
    margin-bottom: 40px;
  }

  ul li {
    font-size: 15px;
    border: 0;
    line-height: 20px;
  }

  div {
    border: 0;
  }
</style>
