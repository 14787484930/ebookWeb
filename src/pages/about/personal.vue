<template>
    <section class="container">
        <div class="title">基本信息</div>
        <ul>
            <li>
                <label>昵称：</label>
                <span>巴拉巴拉</span>
            </li>
            <li>
                <label>手机号：</label>
                <cube-input class="input-inline" v-model="PhoneNumber"></cube-input>
            </li>
            <li>
                <label>邮箱：</label>
                <cube-input class="input-inline" v-model="Email"></cube-input>
            </li>
            <li>
                <label class="search-cell__bd">地址：</label>
                <cube-input class="input-inline" v-model="Address"></cube-input>
            </li>
        </ul>
        <cube-button submit>确认支付</cube-button>
    </section>
</template>

<script>
    export default {
        name: "mycenter",
        data() {
            return {
                PhoneNumber: '14787461136',
                Email: '14787484930@163.com',
                Address: '1栋二单元110室'
            }
        },
        created() {
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        margin: 20px;
        overflow: hidden;
        .title {
            font-size: 18px;
            margin: 15px 0;
            text-align: center;
            color: #767676;
        }
        ul {
            padding-bottom: 20px;
            li {
                margin: 20px 0;
                label{
                    font-size: 16px;
                }
                span {
                    color: #979797;
                }
                .input-inline {
                    display: inline-block;
                }
            }
        }
    }
</style>
