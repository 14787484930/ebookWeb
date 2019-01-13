<template>
 <div>
     <div id="head">
     <div class="bar bar-header item-input-inset">
         <label class="item-input-wrapper">
             <i class="icon ion-ios-search placeholder-icon"></i>
             <input type="search" placeholder="搜索" v-model="queryList.bookName">
         </label>
     </div>
         <DropDown v-for="item in dropCconfig"  :dateDrop="item.dateDrop" :title="item.title" :list="item.list"
                   :onSelect="item.onSelect"></DropDown>
         <router-link to="/bookAdd"  class="button button-small button-positive"><i class="icon ion-plus"></i></router-link>
     </div>
         <div class="scroll-list-wrap"  >
         <cube-scroll
                 ref="scroll"
                 :options="options"
         >
             <template>
                 <div class="list">
                     <a  v-for="item in tables" class="item item-thumbnail-left" href="#">
                         <img :src="'http://localhost:8081'+item.bookPic">
                         <h2>{{item.bookName}}</h2>
                         <p>{{item.author}}</p>
                         <p>￥{{item.bookPrice}}</p>
                         <p>{{item.bookPub}}</p>
                         <p>{{item.des}}</p>
                         <p>{{item.phone}}</p>
                     </a>
                 </div>
             </template>
         </cube-scroll>
     </div>
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
        bookTypes:[],
        columns:[],
        queryList:{
            bookName:'',
            pageNumber:1,//当前页码
            pageSize:10,//当前容量
            bookType:'1',
        },
        tables:[],
        dropCconfig:[],
    }
  },

    computed: {
        options() {
            return {
                scrollbar:{ fade: true } ,//或false
                startY: 0
            }
        },
    },
    created(){
      this.initDropCconfig();
      this.initTables();
    },
    mounted() {
      $(".scroll-list-wrap").height(screen.availHeight-$("#head").height()-$(".tabs-icon-top",window.parent.parent.document).height());
    },
    methods: {
        initTables(){
            let _that=this;
            let form=new FormData();
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':'123'
                }
            }
            $.each(this.queryList,(key,item)=>{
                form.append(key,item);
            })
            this.$http.post('/book/books',form,config).then(function (res) {
                _that.tables=res.data.page.pageInfo.list;
                console.log(_that.tables);
            })
        },
        initDropCconfig(){
           this.bookTypes= this.$serve.bookTypes;
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
