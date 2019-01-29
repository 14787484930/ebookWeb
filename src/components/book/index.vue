<template>
 <div>
     <div id="head">
     <div class="bar bar-header item-input-inset">
         <label class="item-input-wrapper">
             <i class="icon ion-ios-search placeholder-icon"></i>
             <input type="search" placeholder="搜索" v-model="queryList.bookName" @change="initTables">
         </label>
         <router-link :to="{path:'/bookAdd',query:{id:0}}"  class="button button-small button-positive"><i class="icon ion-plus"></i></router-link>
     </div>
         <div style="text-align: center">
        <!--<DropDown v-for="item in dropCconfig" :dateDrop="item.dateDrop" :title="item.title" :list="item.list"
                   :onSelect="item.onSelect"></DropDown>-->
               <button  @click="$picker.show()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   图书类型
               </button>
              <button  @click="$picker.showDate()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   日期
               </button>
              <button  @click="$picker.showDialog()" class="button  button-light icon-right  ion-android-arrow-dropdown" >
                   价格
               </button>
             </div>

     </div>
     <div class="scroll-list-wrap"  >
     <cube-scroll ref="scroll">
         <cube-swipe>
          <template>
              <div class="list">
                  <transition-group name="swipe" tag="ul">
                  <span  v-for="(item,index) in tables" :key="item.id">
                  <cube-swipe-item
                          ref="reftables"
                          v-bind:btns="btns"
                          :index="index"
                          @btn-click="updateBook"
                          >
                      <router-link :to="{path:'/bookView',query:{id:item.id}}" >
                  <a  class="item item-thumbnail-left" href="#">
                      <img :src="$file(item.bookPic)">
                      <p>{{item.bookName}}({{item.author}})￥{{item.bookPrice}}</p>
                      <p>{{item.bookPub}}</p>
                      <p>{{item.des}}</p>
                      <p>{{item.phone}}</p>
                  </a>
                      </router-link>
                  </cube-swipe-item>
                  </span>
                  </transition-group>
              </div>
          </template>
         </cube-swipe>
      </cube-scroll>
  </div>
</div>
</template>

<script>
 import  $ from 'jquery'
 let  that;
export default {
name: 'Book',
data () {
 return {
   msg: '图书',
     btns: [
         {
             action:'edit',
             text: '编辑',
             color: 'cornflowerblue'
         },
         {
             action:'del',
             text: '删除',
             color: '#ff3a32'
         }
     ],
   bookTypes:{},
   columns:[],
   queryList:{
       bookName:'',
       bookType:'1',
   },
     tables:[],
   dropCconfig:[],
 }
},
 created(){
     that=this;
   this.initTables();
   this.initType();
 },
 mounted() {
   $(".scroll-list-wrap").height(screen.availHeight-$("#head").height()-$(".tabs-icon-top",window.parent.parent.document).height());
 },
 methods: {
     updateBook(btn,index){
         let id=this.tables[index].id;
         //删除数据
         if(btn.action=='del'){
             this.$post('/book/delete',this.tables[index],(msg)=>{
                 console.log(msg);
             })
         }
         else
             this.$router.push({path: '/bookAdd', query: {id: id}})
     },
     initTables(){
         this.$table('/book/books',this.queryList,data=>that.tables=data.list);
     },
     initType(){
         this.$picker.bookTypes((val, index,text)=>{
             that.queryList.bookType=val;
             that.initTables();
         });
         this.$picker.datePicker((val, index,text)=>{
             console.log(val)
             console.log(index)
             console.log(text)
         });
         this.$picker.dialogPicker((low,up)=>{
             console.log(low)
             console.log(up)
         })
     },
 }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 .scroll-list-wrap {
     border: 1px solid rgba(0, 0, 0, 0.1);
     border-radius: 5px;
     transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
     overflow: hidden;
 }
</style>
