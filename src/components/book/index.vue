<template>
 <div>
     <div id="head">
     <div class="bar bar-header item-input-inset">
         <label class="item-input-wrapper">
             <i class="icon ion-ios-search placeholder-icon"></i>
             <input type="search" placeholder="搜索" v-model="queryList.bookName">
         </label>
     </div>
         <span>
         <DropDown v-for="item in dropCconfig" :dateDrop="item.dateDrop" :title="item.title" :list="item.list"
                   :onSelect="item.onSelect"></DropDown>
             </span>
         <router-link :to="{path:'/bookAdd',query:{id:0}}"  class="button button-small button-positive"><i class="icon ion-plus"></i></router-link>
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
  </div>-->
</div>
</template>

<script>
 import  $ from 'jquery'
 import  DropDown from  '../common/dropDown'
export default {
name: 'Book',
 components: {
     DropDown,
 },
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
   bookTypes:[],
   columns:[],
   queryList:{
       bookName:'',
       bookType:'1',
   },
     tables:[],
   dropCconfig:[],
 }
},

 computed: {
     /*options() {
         return {
             scrollbar:{ fade: true } ,//或false
             startY: 0
         }
     },*/
 },
 created(){
   this.initDropCconfig();
   this.initTables();
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
         let  _that=this;
         this.$table('/book/books',this.queryList,data=>{
             _that.tables=data.list;
             console.log(data.list);
         })
     },
     initDropCconfig(){
        //this.bookTypes= this.$serve.bookTypes;
         this.dropCconfig=[
             {title: '类型选择',
                 list: [{ text: '青春文学', value: '青春文学'}, { text: '热门小说', value: '热门小说' }],
                 onSelect:(val,index,text)=>{
                    console.log(val);
                     console.log(index);
                     console.log(text);
                 }
             },
             {title:'日期',dateDrop:true,onSelect:(date,val,text)=>{
                     console.log(date);
                     console.log(val);
                     console.log(text);
                 }},
             {title:'价格',list:[{ text: '剧毒1', value: '剧毒1'}, { text: '蚂蚁1', value: '蚂蚁1' }],
                 onSelect:(val,index,text)=>{
                     console.log(val);
                     console.log(index);
                     console.log(text);
                 }}
         ];
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
