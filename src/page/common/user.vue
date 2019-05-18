<template lang="html">
    <panel title="新手特权" :class="$style.panel">
        <section :class="$style.content">
            <div :class="$style.item">
                <h4>下载APP <span :class="$style.red">送888元礼包</span></h4>
                <p :class="$style.gray">新手专享</p>
                <img src="//img12.360buyimg.com/jrpmobile/jfs/t10384/155/1759179594/9776/185bd062/59e5f0ebNec4cf494.png?width=100&height=100" alt="">
            </div>
            <div :class="$style.item">
                <ul>
                    <li>
                        <img src="//img12.360buyimg.com/jrpmobile/jfs/t4639/162/1782623297/60754/98ea03b4/58e60952N7fdb2b85.png?width=200&height=200" alt="">
                        <h4 :class="$style.red">领128元新手礼包</h4>
                        <p :class="$style.gray">立即开通</p>
                    </li>
                    <li>
                        <img src="//img12.360buyimg.com/jrpmobile/jfs/t4804/179/657713323/5908/66dce262/58e6095fNd3dc3f39.png?width=100&height=100" alt="">
                        <h4>打白条<span :class="$style.red">享免息</span></h4>
                        <p :class="$style.gray">立即开通享豪礼</p>
                    </li>
                </ul>
            </div>
        </section>
    </panel>
</template>

<script>
    import panel from '../../components/core/panel'
    export default {
        components: {
            panel,
        }
    }
</script>

<style lang="scss" module>
    @import '../../assets/scss/element';
    .panel{
        @include panel;
        >h4{
            border-bottom: 1px solid #ddd;
        }
        .content{
            @include list(row);
            .item{
                width: 50%;
                box-sizing: border-box;
                &:first-child{
                    padding: 16px 10px;
                    text-align: center;
                    border-right: 1px solid #ddd;
                    img{
                        width: 66px;
                        height: 66px;
                        margin: 10px auto 0;
                    }
                }
                h4{
                    font-size: 13px;
                    line-height: 20px;
                }
                .red{
                    color: #f00;
                }
                .gray{
                    color: #999;
                    font-size: 12px;
                }
                p{
                    margin-top: 3px;
                    font-size: 12px;
                }
                ul{
                    width: 100%;
                    li{
                        height: 72px;
                        width: 100%;
                        padding: 16px 14px;
                        box-sizing: border-box;
                        &:first-child{
                            border-bottom: 1px solid #ddd;
                        }
                        h4{
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            text-align: left;
                        }
                        img{
                            width: 40px;
                            height: 40px;
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>
