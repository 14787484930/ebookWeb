<!--底部导航栏-->
<template>
    <section>
        <div class="tabs tabs-icon-top fixed-bottom">
            <router-link class="tab-item" v-for="(item) in config" :key="item.url" tag="li" :to="{path:item.url}">
                <i v-if="item.list.indexOf($route.path)!==-1" :class="['icon',item.iClass]" style="color:#379be9"></i>
                <i v-else :class="['icon',item.iOutClass]"></i>
                {{item.text}}
            </router-link>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                seleted: 'ShowList',
                config: [
                    {
                        url: '/shopList',
                        text: "商店",
                        iClass: "ion-ios-bookmarks",
                        iOutClass: "ion-ios-bookmarks-outline",
                        list: ['/book', '/bookView', '/bookAdd']
                    },
                    {
                        url: '/shopTest',
                        text: "购物车",
                        iClass: "ion-ios-gear",
                        iOutClass: "ion-ios-gear-outline",
                        list: ['/other', '/otherView', '/otherAdd']
                    },
                    {
                        url: '/shopCenter',
                        text: "我的",
                        iClass: "ion-ios-person",
                        iOutClass: "ion-ios-person",
                        list: ['/about', '/aboutView', '/aboutAdd']
                    }
                ]
            }
        },
        computed: {
            flag() {
                return this.$store.getters.getFlag;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fixed-bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
