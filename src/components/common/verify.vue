<template>
    <div>
        <div class="back_bg_self">
            <table border="0" style="width:92%; color:#FFF; margin:0 auto;" cellspacing="0" cellpadding="0">
                <td style="text-align:center">学生身份验证</td>
            </table>
        </div>
        <div class="l_logo" align="center">
            <img src="http://192.168.0.106:8081/pictures/other/3a8d4fb40340451faa50a426ac26a0ca.png">
        </div>

        <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
            <cube-form-group>
                <cube-form-item :field="fields[0]"></cube-form-item>
                <cube-form-item :field="fields[1]"></cube-form-item>
                <cube-form-item :field="fields[2]"></cube-form-item>
                <cube-form-item :field="fields[3]"></cube-form-item>
                <cube-form-item :field="fields[4]"></cube-form-item>
            </cube-form-group>

            <cube-form-group>
                <cube-button type="submit">验证</cube-button>
            </cube-form-group>
        </cube-form>

    </div>
</template>

<script>
    import PriceInput from "./priceInput";
    export default {
        name: "verify",
        components: {PriceInput},
        data() {
            return {
                validity: {},
                valid: undefined,
                model: {
                    selectValue: "西南林业大学",
                    inputValue: "20131157060",
                    inputValues: "",
                    yzm:""
                },
                fields: [
                    {
                        type: "select",
                        modelKey: "selectValue",
                        label: "学校",
                        props: {
                            options: ["西南林业大学", "云南大学", "云南理工大学"]
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type: "input",
                        modelKey: "inputValue",
                        label: "学号",
                        props: {
                            placeholder: "请输入学号"
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type: "input",
                        modelKey: "inputValues",
                        label: "密码",
                        props: {
                            placeholder: "请输入密码",
                            type: 'password',
                            eye: {
                                open: false,
                                reverse: false
                            }
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type:"input",
                        modelKey: "yzm",
                        label: "验证码",
                        props: {
                            placeholder: "请输入验证码",
                        },
                        rules: {
                            required: true,
                        },
                    },
                    {
                        type: "img",
                        label: "点击刷新",
                        props: {
                            align: "center",
                            src: ["http://202.203.132.204:8019/(0ggjzc55xfr1fd55gd0dkyym)/CheckCode.aspx"]
                        },
                    },
                ]
            };
        },
        methods: {
            submitHandler() {
                alert(
                    this.model.inputValue +
                    "***" +
                    this.model.inputValues +
                    "***" +
                    this.model.selectValue +
                    "***" +
                    this.model.yzm
                );
            },
            validateHandler(result) {
                this.validity = result.validity;
                this.valid = result.valid;
            },
        },
    }
</script>

<style lang="stylus">
    .back_bg_self {
        width: 100%;
        height: 15%;
        background-color: #4a4c5b;
        font-size: 0.8em;
        padding: 15px 0;
        position: relative;
    }
    .l_logo {
        width: 100%;
        overflow: hidden;
        margin: 5% auto;
    }
</style>