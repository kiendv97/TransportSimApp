<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-spacer>
          <v-avatar centered>
            <img src="https://picsum.photos/510/300?random" />
          </v-avatar>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="username" label="Tên đăng nhập" required />
            <v-text-field v-model="password" type="password" label="Mật khẩu" required />

            <v-btn color="success" @click="login()">Đăng nhập</v-btn>
          </v-form>
          <div class="contact">
            <v-list-tile-content>
              <p class="headline">Hotline: 0964 199 991</p>
            </v-list-tile-content>
          </div>
        </v-spacer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    statusResponse: false,
    username: "",
    password: ""
  }),
  mounted() {
    log
    if (!this.statusResponse) {
      this.$router.replace({ name: "Login" });
    }
  },
  watch: {
    statusResponse (val) {
      if (val) {
        this.$router.replace({ name: "HomePage" });
        this.authenticated = true;
        localStorage.authenticated = true;
      } else {
        alert("User or password incorrect");
      }
    }
  },
  methods: {
    login() {
      var self = this;
      if (this.username != "" && this.password != "") {
        axios
          .post("http://beta4.topsim.vn/api/login-backend ", {
            username: this.username,
            password: this.password
          })
          .then(function(response) {
            console.log(response);
            if (response.status == 200) {
              self.statusResponse = true;
              localStorage.access_token =  response.data.response.token;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("username and password must be present");
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

