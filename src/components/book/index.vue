<template>
 <div>
     <div id="head">
        <div class="bar bar-header item-input-inset">
            <label class="item-input-wrapper">
                <input type="search" placeholder="搜索" v-model="queryList.bookName"  @change="search">
                <i class="search-btn icon ion-ios-search placeholder-icon" @click="search"></i>
            </label>
            <router-link :to="{path:'/bookAdd',query:{id:0}}"  class="button button-small button-positive"><i class="icon ion-plus"></i></router-link>
        </div>
        <div style="text-align: center">
                <button  @click="intelSearch" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                                筛选
                </button>
        </div>
        <div title="搜索"  v-show="isShow" class="weui-cells">
            <ul>
                <li class="cube-index-list-item">
                    <div class="weui-cell weui-cell_access"   @click="$picker.show()">
                             <div class="weui-cell__bd">
                              图书类型:
                                 <span class="book-name">{{bookTypeName}}</span>
                             </div>
                            <div class="weui-cell__ft" >
                            </div>
                        </div>
                </li>
                <li class="cube-index-list-item">
                   <div class="weui-cell weui-cell_access"  >
                            <div class="weui-cell__bd">
                                 日期:
                            </div>
                            <input type="text"  v-model="queryList.startTime" @click="$picker.showDate('type')"  class="time-input" placeholder="请选择开始日期" >
                            <span class="line-span"></span>
                            <input type="text"  v-model="queryList.endTime" @click="endTime()"  class="time-input" placeholder="请选择结束日期" >
                   </div>
                </li>
                <li class="cube-index-list-item">
                   <div class="weui-cell weui-cell_access" @click="$picker.showDialog()" >
                            <div class="weui-cell__bd">
                                  价格:
                                <span class="book-name">￥{{queryList.startPrice}}至￥{{queryList.endPrice}}</span>
                            </div>
                            <div class="weui-cell__ft"  >
                            </div>
                        </div>
                </li>
                <li class="cube-index-list-item">
                     <cube-button :light="true" @click="searchClear">重置</cube-button>
                     <cube-button :light="true" @click="search">搜索</cube-button>
                </li>
            </ul>
        </div>
     </div>
<grid-view :grid="grid" url="/book/books" :load="load"></grid-view>

</div>
</template>

<script>
 let  that;
export default {
name: 'Book',
data () {
 return {
    msg: '图书',
    grid:{},
    load:0,
    queryList:{
       bookName:'',
<<<<<<< HEAD
       bookType:1,
=======
       bookType:'',
>>>>>>> e5507c079daff5244d9bc47cd16eaed9fe715a4d
       startPrice:'',
       endPrice:'',
       startTime:'',
       endTime:''
    },
    bookTypeName:'',
    isShow:false
 }
},
 created(){
   that=this;
   this.queryList.flag=this.$toInt(this.$route.query.flag);
   this.initType();
   this.initGrid();
 },
    computed:{
        power(){
            return this.$store.getters.power;
        }
    },
 methods: {
     search(){
        this.load++;
        let query =this.queryList;
        this.isShow =false;//搜索下拉隐藏
        this.initGrid();
     },
     searchClear(){
         that.queryList={
                     bookName:'',
                         bookType:'',
                         startPrice:'',
                         endPrice:'',
                         startTime:'',
                         endTime:''
                 }
         that.bookTypeName=''
     },
     initGrid(){
         this.grid={
             img:'bookPic',
             query:this.queryList,
             view:this.view,
             del:this.del,
             edit:this.update,
             columns:[
                 {title:"名称",key:'bookName'},
                 {title:"出版社",key:'bookPub'},
                 {title:"价格",key:'bookPrice',format:this.setPrice},
             ],
         };
     },
     setPrice(row){
         return "￥"+ row.bookPrice;
     },
     view(row){
         this.$router.push({path: '/bookView', query: {id: row.id}});
     },
     del(row){
         this.$post('/book/delete',row);
     },
     update(row){
         this.$router.push({path: '/bookAdd', query: {id: row.id}})
     },
     endTime() {
         if (!this.datePicker) {
             this.datePicker = this.$createDatePicker({
                 title: 'Date Picker',
                 min: new Date(1980, 1, 1),
                 max: new Date(new Date().getFullYear(), 12, 12),
                 value: new Date(),
                 onSelect: this.selectHandle,
             })
         }
         this.datePicker.show()
     },
     selectHandle(val, index,text) {
         that.queryList.endTime=index.join('-');
     },
     initType(){
         this.$picker.bookTypes((val, index,text)=>{
             that.queryList.bookType=val['0'];
             that.bookTypeName=text['0'];
         });
         this.$picker.datePicker((val, index,text)=>{
               that.queryList.startTime=index.join('-');
         });
         this.$picker.dialogPicker((val, index)=>{
               that.queryList.startPrice=val;
               that.queryList.endPrice=index;
         })
     },
     intelSearch(){
            this.isShow = !this.isShow
     }
 }
}
</script>

<style>
.placeholder-icon:last-child {padding-left: 0.26rem !important;}
.time-input{width: 3.0rem;}
.book-name{text-align: center;width: 4rem;
    display: inline-flex;
    padding-left: 1rem;}
.line-span{border-bottom:.03rem solid #828282;width:1rem;;}
.cube-btn-light{ width: 50%;float: left;}
</style>

