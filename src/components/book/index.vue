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
                             </div>
                            <div class="weui-cell__ft" >
                            </div>
                        </div>
                </li>
                <li class="cube-index-list-item">
                   <div class="weui-cell weui-cell_access" >
                            <div class="weui-cell__bd">
                                 日期:
                            </div>
                            <input type="text" name='stime' value=""  class="time-input" placeholder="请选择开始日期" v-model="queryList.startTime"  @click="$picker.showDate()">
                            -
                            <input type="text" name='etime' class="time-input" placeholder="请选择结束日期" v-model="queryList.endTime"  @click="$picker.showDate()">
                   </div>
                </li>
                <li class="cube-index-list-item">
                   <div class="weui-cell weui-cell_access" @click="$picker.showDialog()" >
                            <div class="weui-cell__bd">
                                  价格:
                            </div>
                            <input type="text" value="12" v-model="queryList.startPrice" >
                            <div class="weui-cell__ft"  >
                            </div>
                        </div>
                </li>
                <li class="cube-index-list-item">
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
       bookType:'1',
       startPrice:0,
       endPrice:'',
       startTime:'',
       endTime:''
   },
   isShow:false

 }
},
 created(){
     that=this;
   this.initType();
   this.initGrid();
 },
 methods: {
     search(){
        console.log(2222);
        this.load++;
        let query =this.queryList;
        this.isShow =false;//搜索下拉隐藏
        this.initGrid();
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
     initType(){
         this.$picker.bookTypes((val, index,text)=>{
             that.queryList.bookType=val;
              console.log(val);
              console.log(index);
              console.log(text);
         });
         this.$picker.datePicker((val, index,text)=>{
               that.queryList.startTime=index.join('-');
               that.queryList.endTime=index.join('-');
         });
         this.$picker.dialogPicker((val, index,text)=>{
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
.placeholder-icon:last-child {
    padding-left: 0.26rem !important;
}
.time-input{width: 3.5rem;}
</style>

