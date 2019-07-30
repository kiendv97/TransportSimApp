<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-btn icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title>Đổi mật khẩu</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <form>
            <v-text-field v-model="oldPass" label="Mật khẩu cũ" required></v-text-field>
            <v-text-field v-model="newPass" label="Mật khẩu mới" required></v-text-field>
            <v-text-field v-model="re_newPass" label="Nhập lại mật khẩu mới" required></v-text-field>
            <v-btn @click="submit" color="success">Cập nhật</v-btn>
            <v-btn @click="clear" color="warning">Nhập lại</v-btn>
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
    oldPass: { required },
    newPass: { required },
    re_newPass: { required }
  },
  data: () => ({
    oldPass: "",
    newPass: "",
    re_newPass: ""
  }),
  methods: {
    submit() {},
    clear() {
      this.oldPass = "";
      this.newPass = "";
      this.re_newPass = "";
    }
  }
};
</script>