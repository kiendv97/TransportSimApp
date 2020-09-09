<template>
<v-app>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-spacer>
                <v-avatar>
                    <img width="48px" height="48px" src="https://picsum.photos/510/300?random">
                </v-avatar>
                <v-form ref="form" lazy-validation>
                    <v-text-field v-model="username" label="Tên đăng nhập" required @keyup.enter="login()" />
                    <v-text-field v-model="password" type="password" label="Mật khẩu" required @keyup.enter="login()" />
                    <v-text-field v-model="otp" type="text" label="OTP" required @keyup.enter="login()" />

                    <v-btn color="success" :loading="loading" @click="login()">
                        Đăng nhập
                    </v-btn>
                </v-form>
                <div class="contact">
                    <v-list-tile-content>
                        <p class="headline">
                            Hotline: 0969 997 197
                        </p>
                    </v-list-tile-content>
                </div>
            </v-spacer>
        </v-flex>
    </v-layout>
</v-app>
</template>

<script>
import axios from "axios";
import {
    login
} from '@/api/fetch.js';
export default {
    data: () => ({
        statusResponse: false,
        username: "",
        password: "",
        otp: "",
        loading: false
    }),
    watch: {
        statusResponse(val) {
            if (val) {
                this.$router.replace({
                    name: "HomePage"
                });
                this.authenticated = true;
                localStorage.authenticated = true;

            } else {
                alert("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        }
    },
    mounted() {
        if (!this.statusResponse) {
            this.$router.replace({
                name: "Login"
            });
        }
    },
    methods: {
        async login() {
            try {
                var self = this;
                if (this.username != "" && this.password != "") {
                    this.loading = true
                    let response = await login(this.username, this.password, this.otp);
                    if (response.status == 200) {
                        self.statusResponse = true;
                        localStorage.access_token = response.data.response.token;
                        localStorage.user = JSON.stringify(response.data.response);

                    }
                    this.loading = false
                } else {
                    alert("Vui lòng nhập");
                }
            } catch (error) {
                this.loading = false
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert("Có gì đó không đúng!");
                }
            }

        }
    }
};
</script>

<style>
@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
    #app {
        margin: 0px !important;
    }

    .layout {
        display: flex;
        align-items: center;
    }

    .v-avatar {
        text-align: center;
        display: inherit;
        margin: auto;
    }

    .spacer {
        justify-content: center;
        padding: 10px;
    }

    .contact {
        margin-top: 200px;
        display: flex;
        justify-content: center;
    }

    .headline {
        align-self: center;
    }
}
</style>
