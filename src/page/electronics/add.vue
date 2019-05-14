<template>
    <div class="scroll-list-wrap addWrap">
        <cube-scroll ref="scroll">
            <template>
                <div class="list">
                    <h1>填写清单</h1>
                    <label class="form-group item item-input ">
                        <span>电子名称：</span>
                        <input type="text" class="isnull" v-model="electronics.electronicsName" placeholder="点此填写">
                    </label>
                    <label class="form-group item item-input ">
                        <span>电子类型：</span>
                        <cube-select
                                v-model="value"
                                :options="options"
                                @change="change">
                        </cube-select>
                    </label>
                    <label class="form-group item item-input ">
                        <span>官方价格：</span>
                        <input placeholder="点此填写" type="text" class="isnull" v-model="electronics.originalPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>出售价格(元)：</span>
                        <input placeholder="点此填写" type="text" class="isnull" v-model="electronics.presentPrice">
                    </label>
                    <label class="form-group item item-input ">
                        <span>购买日期：</span>
                        <input type="text" readonly="readonly"
                               v-model="electronics.buyDate"
                               @click="$picker.showDate('type')"
                               placeholder="购买日期">
                    </label>
                    <label class="form-group item item-input ">
                        <span>是否有发票：</span>
                        <cube-switch v-model="isInvoice" v-on:change="hasInvoice"></cube-switch>
                    </label>
                    <label class="form-group item item-input ">
                        <span>联系电话：</span>
                        <input placeholder="点此填写" type="text" class="isnull tel" v-model="electronics.phone">
                    </label>
                    <label class="form-group item item-input ">
                        <span>微信：</span>
                        <input placeholder="点此填写" type="text" class="isnull" v-model="electronics.weiXin">
                    </label>
                    <label class="form-group item item-input ">
                        <span>描述：</span>
                        <input placeholder="点此填写" type="text" v-model="electronics.des">
                    </label>
                    <file-com ref="refFiles" :urls="urls"></file-com>
                    <button id="submit" :disabled="submitFlag" style="width: 100%" class="button button-positive" @click="saveData">发布</button>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script>
    import FileCom from '../../components/FileCom'
    import storage from '../../assets/storage/index'
    import $ from 'jquery'

    let _that;
    export default {
        name: "add",
        data: function () {
            return {
                isInvoice: true,
                options: [],    //下拉选择框
                value: '',
                electronics: {
                    electronicsName: '',
                    electronicsType: '1',
                    originalPrice: '20',
                    presentPrice: '15',
                    buyDate: '2013-12-12',
                    hasInvoice: '1',
                    electronicsPic: '',
                    phone: this.$store.getters.getUser.phone,
                    weiXin: this.$store.getters.getUser.weiXin,
                    des: '',
                },
                urls: [],
                submitFlag: false   //是否可以提交
            }
        },
        components: {
            'file-com': FileCom,
        },
        created() {
            _that = this;
            this.initDateType();
            this.initBookTypeSelect();
            this.electronics.id = this.$route.query.id;
            if ((this.electronics.id).length > 1)
                this.initData();
        },
        methods: {
            //初始化出版日期选择
            initDateType() {
                this.$picker.datePicker((val, index, text) => {
                    _that.electronics.buyDate = index.join('-');
                });
            },
            //初始化电子类型下拉框
            initBookTypeSelect() {
                let value = storage.getSession("electronicsType");
                this.options = value.map((item) => {
                    return item.text;
                });
            },
            initData() {
                this.$http.post('/electronics/getById/' + this.electronics.id).then((res) => {
                    for (let i in this.electronics) {
                        _that.electronics[i] = res.data.page.info[i];
                    }
                    //设置电子类型
                    _that.value = _that.options[_that.electronics.electronicsType - 1];
                    _that.electronics.buyDate = _that.$toDate(_that.electronics.buyDate);
                    let arr = _that.electronics.electronicsPic.split(',');
                    $.each(arr, (index, item) => {
                        _that.urls.push({url: _that.$file(item)});
                    })
                });
            },
            saveData() {
                let url = '/electronics/save';
                if (this.electronics.id !== 0) {
                    _that.electronics["electronicsPic"] = "";
                    url = '/electronics/update';
                }
                this.submitFlag = true;
                this.$save(url, this.electronics, this.$refs.refFiles.files, (msg) => {
                    _that.submitFlag = false;
                    this.$createDialog({
                        type: 'alert',
                        title: '信息',
                        content: '保存成功 ',
                        icon: 'cubeic-right',
                        onConfirm: () => {
                            this.$router.push({path: '/electronics'})
                        }
                    }).show()
                })
            },
            hasInvoice() {
                if (this.value) {
                    this.electronics.hasInvoice = '1';
                } else {
                    this.electronics.hasInvoice = '0';
                }
            },
            //类型选择
            change(value, index) {
                this.electronics.electronicsType = index + 1;
            },
        }
    }
</script>
<style scoped>
    .scroll-list-wrap {
        height: 94vh;
    }

    .scroll-list-wrap #submit {
        margin-bottom: 20px;
    }

    /*滚动的页面的高度 -by gpj*/
</style>
