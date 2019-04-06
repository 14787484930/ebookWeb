<template>
    <div>
        <div class="back_bg_self">
            <header class="header">学生身份验证</header>
        </div>
        <div class="l_logo" align="center">
            <img :src="logoImg">
        </div>

        <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
            <cube-form-group>
                <cube-form-item :field="fields[0]"></cube-form-item>
                <cube-form-item :field="fields[1]"></cube-form-item>
                <div>
                    <cube-form-item :field="fields[2]"></cube-form-item>
                    <img class="verify-img" @click="freshCode()" :src="checkCode">
                </div>
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
export default {
    name: "verify",
    data() {
        return {
            url: "",
            sessionString: "",
            logoImg: "",
            checkCode: "",
            validity: {},
            valid: undefined,
            model: {
                schoolNo: "西南林业大学",
                studNo: "",
                studPassword: "",
                validCode: "",
                email:"",
            },
            fields: [
                {
                    type: "select",
                    modelKey: "schoolNo",
                    label: "学校",
                    props: {
                        options: ["请选择学校","西南林业大学", "云南大学", "云南理工大学"]
                    },
                    rules: {
                        required: true
                    }
                },
                {
                    type: "input",
                    modelKey: "studNo",
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
                    modelKey: "studPassword",
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
                    type: "input",
                    modelKey: "validCode",
                    label: "验证码",
                    props: {
                        placeholder: "请输入验证码",
                    },
                    rules: {
                        required: true,
                    },
                },
                {
                    type: "input",
                    modelKey: "email",
                    label: "邮箱",
                    props: {
                        placeholder: "请输入邮箱地址",
                    },
                    rules: {
                        required: true,
                    },
                },
            ]
        };
    },
    created() {
        this.getSessionString();
    },
    methods: {
        showAlert(title, content) {
            this.$createDialog({
                type: 'alert',
                title: title,
                content: content,
                icon: 'cubeic-alert'
            }).show()
        },
        //请求session字符串
        getSessionString(){
            this.$http.post('/user/getKey').then((res)=>{
                this.sessionString = res.data.page.location;
                if( Number(res.data.code) === 200){
                    alert("获取session失败")
                }else{
                    this.url = "http://202.203.132.204:8019/" + this.sessionString + "/default2.aspx";
                    this.logoImg = "http://202.203.132.204:8019/" + this.sessionString + "/logo/logo_school.png";
                    this.checkCode = "http://202.203.132.204:8019/" + this.sessionString + "/CheckCode.aspx";
                }
            });
        },
        //点击刷新验证码
        freshCode() {
            this.checkCode ="http://202.203.132.204:8019/" + this.sessionString + "/CheckCode.aspx?" + Math.random();
        },
        //提交数据
        submitHandler(e) {
            let query = {};
            query['schoolNo'] = this.model.schoolNo;
            query['studNo'] = this.model.studNo;
            query['password'] = this.model.studPassword;
            query['validCode'] = this.model.validCode;
            query['email'] = this.model.email;
            query['url'] = this.url;

            this.$post('user/authentication', query, (msg) => {
                if(Number(msg.data.code) === 200 ){
                    this.showAlert('登陆验证', '验证失败');
                    this.freshCode();
                }else{
                    this.showAlert('登陆验证', '验证成功');
                    this.$router.push('/book')
                }
            });
            e.preventDefault();
        },
        validateHandler(result) {
            this.validity = result.validity;
            this.valid = result.valid;
        },
    },
}
</script>

<style lang="stylus">
    .header {
        text-align: center;
        width: 100%;
        color: #FFF;
        margin: 0 auto;
    }

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
        margin: 10% 0;
    }

    .l_logo img {
        width: 100%;
        padding: 0 10%;
    }

    .verify-img {
        height: 2em;
        display: inline-block;
        float: right;
        margin-top: 0.4em;
        margin-right: 1em;
    }

</style>
