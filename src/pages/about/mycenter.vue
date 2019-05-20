<template>
    <div>
        <section class="container">
            <div class="card">
                <div class="item item-avatar">
                    <img src="../../assets/images/timg.jpg">
                    <h2 style="margin-top:11px;">昵称：{{ userinfo.nickName }}</h2>
                </div>
                <panel title="" class="panel">
                    <ul class="content">
                        <li class="item">
                            <img src="../../assets/images/noImg.png" alt="">
                            <p>我的评分</p>
                        </li>
                        <li class="item">
                            <img src="../../assets/images/noImg.png" alt="">
                            <p>我的优惠</p>
                        </li>
                        <li class="item">
                            <img src="../../assets/images/noImg.png" alt="">
                            <p>我的积分</p>
                        </li>
                    </ul>
                </panel>
            </div>

            <div class="card">
                <div class="item item-body">
                    <ul class="search-cells">
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/advice' }">我买到的图书</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/version'}">我买到的电子</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/version'}">与我相关的辅导/讲座</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/version'}">我买到的其他物品</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/version'}">我的购物车</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                        <li class="search-cell search-cell_access">
                            <div class="search-cell__bd">
                                <router-link :to="{path:'/personal'}">编辑资料</router-link>
                            </div>
                            <div class="search-cell__ft"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card">
                <footor></footor>
            </div>
        </section>
    </div>

</template>

<script>
    import panel from '../../components/core/panel'
    import footor from '../../components/footer'
    export default {
        name: "mycenter",
        components: {
            panel,
            footor,
        },
        data() {
            return {
                userinfo: {
                    nickName: "vxiao",
                },
            }
        },
        created() {
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/element";

    .panel {
        @include panel;
        .content {
            @include flex(row);
            box-sizing: border-box;
            .item {
                width: 33.3333%;
                border: 0;
                text-align: center;
                img {
                    margin-top: 6px;
                    width: 45px;
                    height: 45px;
                }
                p {
                    font-size: 13px;
                    color: #666;
                    text-overflow: ellipsis; /*禁止换行*/
                    white-space: nowrap;
                    overflow: hidden;
                    margin-top: 6px;
                    &:nth-child(2) {
                        color: red;
                    }
                }
            }
        }
    }

    .container {
        height: 100vh;
        transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
        overflow: hidden;
    }
</style>
