<template lang="html">
    <panel title="" :class="$style.panel">
        <ul :class="$style.content">
            <li>
                <img src="//img12.360buyimg.com/jrpmobile/jfs/t2842/350/3035567089/14791/5f6ff93d/577cf395N31e76288.png?width=1125&height=252"
                     alt="">
            </li>
            <li>
                <div>
                    <img src="//img12.360buyimg.com/jrpmobile/jfs/t2971/333/1297567079/898/f2d2e00d/577dc28dNe5138337.png?width=108&height=108"
                         alt="">
                    <p>客户端</p>
                </div>
                <div>
                    <img src="//img12.360buyimg.com/jrpmobile/jfs/t2824/256/2966087355/831/188bfa25/577cf3dcN18aadbf2.png?width=108&height=108"
                         alt="">
                    <p>触屏版</p>
                </div>
                <div>
                    <img src="//img12.360buyimg.com/jrpmobile/jfs/t2920/282/1283157010/1040/23f1430b/577cf3e5N53f740b8.png?width=108&height=108"
                         alt="">
                    <p>电脑版</p>
                </div>
            </li>
            <li>Copyright © 2019-2020 E书版权所有</li>
        </ul>
    </panel>
</template>

<script>
    import panel from "../components/core/panel"

    export default {
        components: {
            panel,
        }
    }
</script>

<style lang="scss" module>
    @import "../assets/scss/element";

    .panel {
        @include panel;
        & > h4 {
            display: none;
        }
        .content {
            @include flex;
            background: #F5F5F5;
            li {
                color: #999;
                text-align: center;
                font-size: 12px;
                width: 100%;
                > img {
                    width: 100%;
                }
                &:nth-child(2) {
                    @include flex(row);
                    height: 98px;
                    box-sizing: border-box;
                    > div {
                        width: 33.3333%;
                        text-align: center;
                        box-sizing: border-box;
                        img {
                            margin-top: 15px;
                            width: 45px;
                            height: 45px;
                        }
                        p {
                            font-size: 13px;
                            text-align: center;
                            display: block;
                            color: #ddd;
                            margin-top: 6px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
                &:nth-child(n+3) {
                    padding: 12px 0;
                    border-top: 1px solid #ddd;
                }
            }
        }
    }
</style>
