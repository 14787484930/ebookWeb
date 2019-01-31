<template>
    <div>
    <div class="tabs tabs-icon-top">
        <router-link class="tab-item"    v-for="(item) in config" :key="item.url" tag="li"  :to="item.url">
            <i v-if="$route.fullPath==item.url"  :class="['icon',item.iClass]" style="color:#379be9"></i>
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
                    {url: '/book',text:"图书",iClass:"ion-ios-bookmarks",iOutClass:"ion-ios-bookmarks-outline"},
                    {url: '/electronics', text:"电子",iClass:"ion-ios-monitor",iOutClass:"ion-ios-monitor-outline"},
                    {url: '/teach', text:"辅导",iClass:"ion-ios-people",iOutClass:"ion-ios-people-outline"},
                    {url: '/other', text:"其他",iClass:"ion-ios-gear",iOutClass:"ion-ios-gear-outline"},
                    {url: '/about', text:"我",iClass:"ion-ios-person",iOutClass:"ion-ios-person"}
                ]
            }
        },
    }
</script>
<style>
</style>
