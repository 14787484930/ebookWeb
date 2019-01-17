<template>
    <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
            <template>
                <div class="list">
                    <label class="form-group item item-input ">
                        <span>电子名称：</span>
                        <input type="text" v-model="electronics.elecName">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电子类型：</span>
                        <input type="text" v-model="electronics.electronicsType">
                    </label>
                    <label class="form-group item item-input ">
                        <span>官方价格：</span>
                        <input type="text" v-model="electronics.originalPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格：</span>
                        <input type="text" v-model="electronics.presentPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>购买日期：</span>
                        <input type="text" v-model="electronics.buyDate">
                    </label>
                    <label class="form-group item item-input ">
                        <span>是否有发票：</span>
                        <input type="text" v-model="electronics.hasInvoice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系方式：</span>
                        <input type="text" v-model="electronics.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input type="text" v-model="electronics.des">
                    </label>
                    <file-com ref="refFiles"></file-com>
                    <button style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import FileCom from '../common/FileCom'
    import $ from 'jquery'

    export default {
        name: "add",
        data() {
            return {
                electronics: {
                    elecName: '笔记本',
                    electronicsType: '1',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '有',
                    elecPic: '',
                    weiXin: '15288369144',
                    phone: '15288369144',
                    des: '九成新，完美屏幕，撩妹神器，你值得拥有',
                }
            }
        },
        components: {
            'file-com': FileCom,
        },
        mounted() {
            this.$(".scroll-list-wrap").height(screen.availHeight - this.$(".tabs-icon-top", window.parent.parent.document).height()) + 80;
        },
        methods: {
            saveData() {
                console.log(this.$refs.refFiles.form);
                let form = new FormData();
                form = this.$refs.refFiles.form;
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': '123'
                    }
                }
                $.each(this.electronics, (key, item) => {
                    form.append(key, item);
                })
                this.$http.post('/electronics/save', form, config).then(function (res) {
                    if (res.status === 200) {
                        /*这里做处理*/
                    }
                })
            }
        }
    }
</script>


