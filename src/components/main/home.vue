<template>
    <div>
    <div class="tabs tabs-icon-top fixed-bottom">
        <router-link class="tab-item"     v-for="(item) in config" :key="item.url" tag="li"   :to="{path:item.url,query: {flag: flag}}"
                     >
            <i v-if="item.list.indexOf($route.path)!=-1"  :class="['icon',item.iClass]" style="color:#379be9"></i>
            <i v-else  :class="['icon',item.iOutClass]"  ></i>
            {{item.text}}
        </router-link>
    </div>
    <keep-alive>
        <router-view name="default" ></router-view>
    </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "home",
        data () {
            return {
                seleted:'Book',
                config:[
                    {url: '/book',text:"图书",iClass:"ion-ios-bookmarks",iOutClass:"ion-ios-bookmarks-outline",list:['/book','/bookView','/bookAdd']},
                    {url: '/electronics', text:"电子",iClass:"ion-ios-monitor",iOutClass:"ion-ios-monitor-outline",list:['/electronics','/electronicsView','/electronicsAdd']},
                    {url: '/teach', text:"辅导",iClass:"ion-ios-people",iOutClass:"ion-ios-people-outline",list:['/teach','/teachView','/teachAdd']},
                    {url: '/other', text:"其他",iClass:"ion-ios-gear",iOutClass:"ion-ios-gear-outline",list:['/other','/otherView','/otherAdd']},
                    {url: '/about', text:"我",iClass:"ion-ios-person",iOutClass:"ion-ios-person",list:['/about','/aboutView','/aboutAdd']}
                ]
            }
        },
        computed:{
            flag(){
                return this.$store.getters.getFlag;
            }
        }
    }
</script>

<style scoped>
    .fixed-bottom {position: fixed;bottom: 0;width:100%;}
</style>
