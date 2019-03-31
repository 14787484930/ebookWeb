<template>
 <div>
     <div id="head">
     <div class="bar bar-header item-input-inset">
         <label class="item-input-wrapper">
             <i class="icon ion-ios-search placeholder-icon"></i>
             <input type="search" placeholder="搜索" v-model="queryList.bookName" @change="search">
         </label>
         <router-link :to="{path:'/bookAdd',query:{id:0}}"  class="button button-small button-positive"><i class="icon ion-plus"></i></router-link>
     </div>
         <div style="text-align: center">
               <button  @click="$picker.show()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   图书类型
               </button>
              <button  @click="$picker.showDate()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   日期
               </button>
              <button  @click="$picker.showDialog()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   价格(元)
               </button>
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
   },
 }
},
 created(){
     that=this;
   this.initType();
   this.initGrid();
 },
 methods: {
     search(){
         this.load++;
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
             that.search();
         });
         this.$picker.datePicker();
         this.$picker.dialogPicker()
     },
 }
}
</script>

