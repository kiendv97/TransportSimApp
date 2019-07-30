<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-btn icon>
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-toolbar-title>Thông tin cá nhân</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-tile v-else :key="item.title" avatar @click="canClick(item)">
              <v-icon large>{{item.avatar}}</v-icon>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Use Google's location service?</v-card-title>

              <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

                <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style scoped>
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      profile: {},
      items: [
        { header: "profile" },
        {
          avatar: "accessibility",
          title: " Tên đăng nhập",
          subtitle: " "
        },
        { divider: true, inset: true },
        {
          avatar: "email",
          title: ' <span class=" text--lighten-1"> Email</span>',
          subtitle: " "
        },
        { divider: true, inset: true },
        {
          avatar: "phone",
          title: "Phone",
          subtitle: ""
        },
        { divider: true, inset: true },
        {
          avatar: "arrow_forward_ios",
          title: "Đổi mật khẩu",
          linkTo: "/change-password",
          canClick: true
        },
        { divider: true, inset: true },
        {
          avatar: "arrow_forward_ios",
          title: "Đăng xuất",
          dialogShow: true,
          canClick: true
        }
      ]
    };
  },
  watch: {
    profile: function(val) {
      this.items[1].subtitle = val.nickname;
      this.items[3].subtitle = val.email;
      this.items[5].subtitle = `<span class='text--primary'>${val.phone_number}</span> `;
    }
  },
  beforeMount() {
    axios
      .get("http://beta4.topsim.vn/api/account-admin/detail/1", {
        headers: {
          "x-access-token": localStorage.access_token,
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(result => {
        console.log(result);
        this.profile = result.data.response;
      });
  },
  methods: {
    canClick(item) {
      if (item.canClick) {
        if (item.linkTo) {
          location.href = item.linkTo;
        }
        if (item.dialogShow) {
          this.dialog = true;
        }
      }
    }
  }
};
</script>   

