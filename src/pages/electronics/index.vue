<template>
  <div>
    <div id="head">
      <div class="bar bar-header item-input-inset">
        <label class="item-input-wrapper searchBox">
          <input class="search-btn" type="search" placeholder="搜索" v-model="queryList.electronicsName"
                 @change="searchSub">
          <i class="search-btn icon ion-ios-search placeholder-icon" @click="searchSub"></i>
        </label>
        <router-link v-if="powerFlag" :to="{name:'electronicsAdd',query:{id:0}}"
                     class="button button-small button-positive">
          <i class="icon ion-plus"></i>
        </router-link>
      </div>
      <div style="text-align: center; background-color: #fff;">
        <button @click="intelSearch" class="button  button-light icon-right  ion-android-arrow-dropdown">
          筛选
        </button>
      </div>
      <div title="搜索" v-show="isShow" class="search-cells">
        <ul>
          <li class="cube-index-list-item">
            <div class="search-cell search-cell_access" @click="$picker.showDialog()">
              <div class="search-cell__bd">
                价格:
                <span class="book-name">
                                    <span class="green">￥{{queryList.startPrice}}</span>&nbsp;&nbsp;至&nbsp;&nbsp;<span
                    class="green">￥{{queryList.endPrice}}</span>
                                </span>
              </div>
              <div class="search-cell__ft">
              </div>
            </div>
          </li>
          <li class="cube-index-list-item">
            <div class="search-cell search-cell_access" @click="$picker.show()">
              <div class="search-cell__bd">
                电子类型:
                <span class="book-name green">{{typeName}}</span>
              </div>
              <div class="search-cell__ft">
              </div>
            </div>
          </li>
          <!--<li class="cube-index-list-item">-->
          <!--<div class="search-cell search-cell_access"  @click="$picker.selectTypes()">-->
          <!--<div class="search-cell__bd">-->
          <!--发票:-->
          <!--<span class="book-name">{{otherInvoiceName}}</span>-->
          <!--</div>-->
          <!--<div class="search-cell__ft" >-->
          <!--</div>-->
          <!--</div>-->
          <!--</li>-->
          <li class="cube-index-list-item">
            <div class="search-cell search-cell_access">
              <div class="search-cell__bd">
                日期:
              </div>
              <input type="text" readonly="readonly" v-model="queryList.startTime"
                     @click="$picker.showDate()" class="time-input" placeholder="发布日期">
              <span class="line-span">——</span>
              <input type="text" readonly="readonly" v-model="queryList.endTime"
                     @click="$picker.showDateEnd()"
                     class="time-input" placeholder="发布日期">
            </div>
          </li>
          <li class="cube-index-list-item">
            <cube-button style="width: 50%" :light="true" @click="searchClear">重置</cube-button>
            <cube-button style="width: 50%" :light="true" @click="searchSub">搜索</cube-button>
          </li>
        </ul>
      </div>
    </div>
    <grid-view :grid="grid" url="/electronics/electronics" :load="load"></grid-view>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  let that
  import gridView from '../../components/gridView'

  export default {
    name: 'Electronics',
    components: {
      gridView
    },
    data() {
      return {
        msg: '电子',
        grid: {},
        load: 0,
        electronicsTypes: [],
        queryList: {
          electronicsName: '',
          electronicsType: '',
          hasInvoice: '',
          startTime: '',
          endTime: '',
          startPrice: '',
          endPrice: ''
        },
        isShow: false,
        typeName: '',
        otherInvoiceName: ''
      }
    },
    computed: {
      power() {
        return this.$store.getters.power
      },
      powerFlag() {
        return this.$store.getters.powerFlag
      }
    },
    created() {
      that = this
      this.initType()
      this.initGrid()
    },
    methods: {
      initGrid() {
        this.grid = {
          img: 'electronicsPic',
          query: this.queryList,
          view: this.view,
          del: this.del,
          edit: this.update,
          columns: [
            { title: '名称', key: 'electronicsName' },
            { title: '型号', key: 'electronicsType' },
            { title: '价格', key: 'presentPrice', format: this.setPrice }
          ]
        }
      },
      setPrice(row) {
        return '￥' + row.presentPrice;
      },
      view(row) {
        this.$router.push({ name: 'electronicsView', query: { id: row.id }});
      },
      del(row, callback) {
        const para = { id: row.id };
        this.$post('/electronics/delete', para, (msg) => {
          this.$createDialog({
            type: 'alert',
            title: '信息',
            content: '删除成功 ',
            icon: 'cubeic-right',
            onConfirm: () => {
              callback(msg.data.code)
            }
          }).show()
        })
      },
      update(row) {
        this.$router.push({ name: 'electronicsAdd', query: { id: row.id }})
      },
      initType() {
        const list = [{
          'text': '有',
          value: 0
        }, {
          'text': '没有',
          value: 1
        }];
        this.$picker.selectTypes(list, (val, index, text) => {
          that.queryList.hasInvoice = val['0'];
          that.otherInvoiceName = text['0'];
        });
        this.$picker.electronicType((val, index, text) => {
          that.queryList.electronicsType = val['0'];
          that.typeName = text['0'];
        });
        this.$picker.datePicker((val, index, text) => {
          that.queryList.electronicsType = val['0'];
          that.electronicsTypeName = text['0'];
        });
        this.$picker.datePicker((val, index, text) => {
          that.queryList.startTime = index.join('-');
        });
        this.$picker.dateEndPicker((val, index, text) => {
          that.queryList.endTime = index.join('-');
        });
        this.$picker.dialogPicker((val, index) => {
          that.queryList.startPrice = val;
          that.queryList.endPrice = index;
        })
      },
      searchSub() {
        this.load++;
        console.log(this.queryList);
        this.isShow = false;// 搜索下拉隐藏
        // this.initGrid();
      },
      searchClear() {
        Object.keys(that.queryList).forEach((key) => {
          that.queryList[key] = '';
        });
        this.typeName = ''
        this.otherInvoiceName = ''
      },
      intelSearch() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

