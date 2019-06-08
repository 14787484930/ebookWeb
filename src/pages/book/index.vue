<template>
  <div>
    <div id="head">
      <div class="bar bar-header item-input-inset">
        <label class="item-input-wrapper searchBox">
          <input class="search-btn" type="search" placeholder="搜索" v-model="queryList.bookName"
                 @change="search">
          <i class="search-btn icon ion-ios-search placeholder-icon" @click="search"></i>
        </label>
        <router-link v-if="powerFlag" :to="{name:'bookAdd',query:{id:0}}"
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
                <span>价格:</span>
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
                <span>图书类型:</span>
                <span class="book-name green">{{bookTypeName}}</span>
              </div>
              <div class="search-cell__ft">
              </div>
            </div>
          </li>
          <li class="cube-index-list-item">
            <div class="search-cell search-cell_access">
              <div class="search-cell__bd">
                <span>日期:</span>
              </div>
              <input type="text" readonly="readonly"
                     v-model="queryList.startTime"
                     @click="$picker.showDate('type')"
                     class="time-input" placeholder="请选择开始日期">
              <span class="line-span">——</span>
              <input type="text" readonly="readonly"
                     v-model="queryList.endTime"
                     @click="$picker.showDateEnd('type')"
                     class="time-input" placeholder="请选择结束日期">
            </div>
          </li>
          <li class="cube-index-list-item">
            <cube-button style="width: 50%" :light="true" @click="searchClear">重置</cube-button>
            <cube-button style="width: 50%; background-color:#379be9;" :light="true" @click="search">搜索
            </cube-button>
          </li>
        </ul>
      </div>
    </div>
    <grid-view :grid="grid" url="/book/books" :load="load"></grid-view>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  let that
  import gridView from '../../components/gridView'

  export default {
    name: 'Book',
    components: {
      gridView
    },
    data() {
      return {
        msg: '图书',
        grid: {},
        load: 0,
        queryList: {
          bookName: '',
          bookType: '',
          startPrice: '',
          endPrice: '',
          startTime: '',
          endTime: ''
        },
        bookTypeName: '',
        isShow: false
      }
    },
    created() {
      that = this;
      this.queryList.flag = this.$toInt(this.$route.query.flag);
      this.$store.commit('setFlag', this.$toInt(this.$route.query.flag));
      this.initType();
      this.initGrid();
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
      search() {
        this.load++;
        this.isShow = false;// 搜索下拉隐藏
        this.initGrid();
      },
      searchClear() {
        Object.keys(that.queryList).forEach((key) => {
          that.queryList[key] = '';
        })
        that.bookTypeName = ''
      },
      initGrid() {
        // console.log("this.grid",this.queryList)
        this.grid = {
          img: 'bookPic',
          query: this.queryList,
          view: this.view,
          del: this.del,
          edit: this.update,
          columns: [
            { title: '名称', key: 'bookName' },
            { title: '出版社', key: 'bookPub' },
            { title: '价格', key: 'bookPrice', format: this.setPrice }
          ]
        };
      },
      setPrice(row) {
        return '￥' + row.bookPrice;
      },
      view(row) {
        this.$router.push({ name: 'bookView', query: { id: row.id }});
      },
      del(row, callback) {
        const para = { id: row.id }
        this.$post('/book/delete', para, (msg) => {
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
        this.$router.push({ name: 'bookAdd', query: { id: row.id }})
      },
      initType() {
        this.$picker.bookTypes((val, index, text) => {
          that.queryList.bookType = val['0']
          that.bookTypeName = text['0']
        });
        this.$picker.datePicker((val, index, text) => {
          that.queryList.startTime = index.join('-')
        });
        this.$picker.dateEndPicker((val, index, text) => {
          that.queryList.endTime = index.join('-')
        });
        this.$picker.dialogPicker((val, index) => {
          that.queryList.startPrice = val
          that.queryList.endPrice = index
        })
      },
      intelSearch() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style>

</style>

