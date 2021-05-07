<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="ma-0" style="height: 100vh">
          <v-toolbar color="cyan" dark>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title>Đổi mật khẩu</v-toolbar-title>

            <v-spacer />
          </v-toolbar>
          <form>
            <v-text-field v-model="oldPass" label="Mật khẩu cũ" required />
            <v-text-field v-model="newPass" label="Mật khẩu mới" required />
            <v-text-field v-model="re_newPass" label="Nhập lại mật khẩu mới" required />
            <v-btn color="success" @click="submit">
              Cập nhật
            </v-btn>
            <v-btn color="warning" @click="clear">
              Nhập lại
            </v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style scoped>
.v-text-field {
  margin: 10px;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    oldPass: {
      required,
    },
    newPass: {
      required,
    },
    re_newPass: {
      required,
    },
  },
  data: () => ({
    oldPass: "",
    newPass: "",
    re_newPass: "",
  }),
  methods: {
    submit() {
      let userId = JSON.parse(localStorage.getItem("user")).id;
      let payload = {
        id: userId,
        oldPwd: this.oldPass,
        newPwd: this.newPass,
        reNewPwd: this.re_newPass,
      };
      this.$store.dispatch("user/RESET_PWD", payload);
    },
    clear() {
      this.oldPass = "";
      this.newPass = "";
      this.re_newPass = "";
    },
  },
};
</script>
