<template>
  <v-container>
    <div>
      <v-snackbar v-model="snackbar.status" dark top width="100" :color="snackbar.color">
        {{ snackbar.message }}
      </v-snackbar>
    </div>
    <v-layout>
      <v-flex class="main" style="margin-top: 100px   ">
        <!-- <div class="title-div">
                  <p class="title text-center text-uppercase">Đăng nhập</p>
                </div> -->
        <div class="form-register">
          <v-text-field class="input-value-register" type="tel" solo hint="" flat v-model="username" background-color="#fff" label="Số điện thoại" prepend-inner-icon="smartphone"></v-text-field>
          <v-text-field class="input-value-register" solo v-model="password" @click:append="show = !show" @keypress.enter="registerFunc()" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" background-color="#fff" rounded outlined dense label="Mật khẩu" prepend-inner-icon="lock"></v-text-field>
          <v-text-field class="input-value-register" solo v-model="re_password" @click:append="show1 = !show1" @keypress.enter="registerFunc()" :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" background-color="#fff" rounded outlined dense label="Xác nhận mật khẩu" prepend-inner-icon="lock"></v-text-field>
        </div>
        <p class="red--text" style="text-align: center;">{{ messageError }}</p>
        <div class="action-button">
          <v-btn class="button-register" :loading="loading" rounded color="#2196f3" @click="registerFunc()" block>ĐĂNG KÍ </v-btn>
        </div>
        <div>
          <router-link to="/login">Đăng nhập</router-link>
        </div>
      </v-flex>
    </v-layout>
    <Footer />
  </v-container>
</template>

<script>
import axios from "axios";
import { postDevice } from "@/api/firebase.js";
import { register } from "@/api/fetch.js";
import { mapState } from 'vuex';
export default {
  name: "register",

  computed: mapState({
    snackbar: (state) => state.fake.snackbar,
  }),

  data() {
    return {
      otp: "",
      password: "",
      re_password: "",
      username: "",
      loading: false,
      show: false,
      show1: false,
      messageError: "",
    };
  },
  methods: {
    async registerFunc() {
      this.messageError = "";
      if (this.username != "" && this.password != "" && this.re_password != "") {
        this.loading = true;
        if (this.password !== this.re_password) {
          this.messageError = "Nhập lại mật khẩu không chính xác";
        } else {
          let payload = {
            username: this.username,
            password: this.password,
          };
          await this.$store.dispatch("fake/REGISTER", payload);
        }
        this.loading = false;
      } else {
        this.messageError = "Vui lòng nhập đầy đủ!";
      }
    },
  },
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

.container .button-register {
    margin-bottom: 18px;
}

.container .form-register {
    margin-bottom: 4px;
    margin-top: 30px;
}

.container .title {
    margin: auto;
    font-size: 20px !important;
    font-weight: 300;
}

.container .button-register {
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

.input-value-register.v-text-field--solo>.v-input__control>.v-input__slot {
    border-radius: 20px
}
</style>
