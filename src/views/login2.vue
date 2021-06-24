<template>
<v-container>
    <v-layout> 
        <v-flex class="main" style="margin-top: 100px   ">
            <!-- <div class="title-div">
                  <p class="title text-center text-uppercase">Đăng nhập</p>
                </div> -->
            <div class="form-login">
                <v-text-field class="input-value" solo flat v-model="username" background-color="#fff" label="Số điện thoại" prepend-inner-icon="smartphone"></v-text-field>
                <v-text-field class="input-value" solo v-model="password" @click:append="show = !show" @keypress.enter="loginFunc()" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye':'mdi-eye-off'" background-color="#fff" rounded outlined dense label="Mật khẩu" prepend-inner-icon="lock"></v-text-field>
            </div>
            <v-alert class="alert-text" v-if="messageError" outlined dense type="error">{{messageError}}</v-alert>
            <div class="action-button">
                <v-btn class="button-login" :loading="loading" rounded color="#00B7C2" @click="loginFunc()" block>ĐĂNG NHẬP </v-btn>
            </div>
            <div class="register">
                <router-link to="/register" class="text-uppercase"> Đăng kí </router-link>
            </div>
        </v-flex>
    </v-layout>
    <Footer />
</v-container>
</template>
<script>
import axios from "axios";
import WebView from '@/constants/webview-constant.js'
import {
    postDevice
} from '@/api/firebase.js'
import {
    login
} from '@/api/fetch.js';
export default {
    name: "Login",
    data() {
        return {
            otp: "",
            password: "",
            username: "",
            loading: false,
            show: false,
            messageError: ''
        };
    },
    methods: {
        async loginFunc() {
            try {
                var self = this;
                if (this.username != "" && this.password != "") {
                    this.loading = true
                    let response = await login(this.username, this.password, this.otp);
                    if (response.status == 200) {
                        self.statusResponse = true;
                        let user = response.data.response
                        localStorage.access_token = response.data.response.token;
                        localStorage.user = JSON.stringify(user);
                        if(user.role === 'fake') {
                            localStorage.role = 'fake';
                            this.$router.push('/customer');
                            return;
                        }
                        let result1 = await postDevice(user.username)
                        let payloadEventReact = {
                            id: user.id,
                            token: user.token,
                            username: user.username
                        }
                        setTimeout(() => {
                            this.$postMessage(`${WebView.LOGIN_SUCCESS}:${JSON.stringify(payloadEventReact)}`)
                        }, 500);
                        this.$router.push('/main')
                    }
                    this.loading = false
                } else {
                    alert("Vui lòng nhập");
                }
            } catch (error) {
                this.$postMessage(WebView.LOGIN_FAILED)
                this.loading = false
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    console.log(error)
                    alert("Có gì đó không đúng!");
                }
            }

        }
    }

};
</script>

<style lang="css">
.container {
    background-color: #E8E8E8;
    height: 100vh
}

.container .alert-text {
    font-size: 12px;
}

.container .giveNewPass {
    margin-bottom: 12px;
    font-size: 13px;
}

.container .suggestRegister {
    margin: 0 !important;
    font-size: 13px;
}

.container .button-login {
    margin-bottom: 18px;
}

.container .form-login {
    margin-bottom: 4px;
    margin-top: 30px;
}

.container .title {
    margin: auto;
    font-size: 20px !important;
    font-weight: 300;
}

.container .button-login {
    color: #fff;
    font-weight: 300;
    font-size: 14px !important;
    height: 40px !important;
    border-radius: 20px
}

.container .main {
    padding: 0 37px;
    min-height: calc(100vh - 110px);
}

.container .input-value {
    opacity: 0.7;
    font-size: 14px;
    border-radius: 20px
}

.input-value.v-text-field--solo>.v-input__control>.v-input__slot {
    border-radius: 20px
}
.register {
    text-align: center;
}
.register a {

}
</style>
