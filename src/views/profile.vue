<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="height: 100vh" class="ma-0">
        <v-toolbar color="#00B7C2" dark class="ma-0">
          <v-btn icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
          </v-btn>

          <v-toolbar-title>Thông tin cá nhân</v-toolbar-title>

          <v-spacer />
        </v-toolbar>

        <v-list two-line>
          <template style="pa-1" v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="index" />

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click="canClick(item)"
            >
              <v-icon>
                {{ item.avatar }}
              </v-icon>

              <v-list-tile-content class="ml-3">
                <v-list-tile-title v-html="item.title" />
                <v-list-tile-sub-title
                  class="font-weight-bold"
                  v-html="item.subtitle"
                />
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-dialog v-model="dialog" max-width="300">
            <v-card>
              <v-card-title class="body-1 font-weight-bold">
                Đăng xuất
              </v-card-title>
              <v-card-actions>
                <v-spacer />

                <v-btn outline color="green darken-1" text @click="logout()">
                  Đăng xuất
                </v-btn>

                <v-btn
                  outline
                  color="red darken-1"
                  text
                  @click="dialog = false"
                >
                  Huỷ
                </v-btn>
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
import { unsubcribeDevice } from "@/api/firebase";
export default {
  data() {
    return {
      dialog: false,
      profile: {},
      items: [
        {
          header: "Thông tin",
        },
        {
          avatar: "accessibility",
          title: " Tên cá nhân",
          subtitle: " ",
        },
        {
          divider: true,
          inset: true,
        },
        {
          avatar: "email",
          title: ' <span class=" text--lighten-1"> Email</span>',
          subtitle: " ",
        },
        {
          divider: true,
          inset: true,
        },
        {
          avatar: "phone",
          title: "Phone",
          subtitle: "",
        },
        {
          divider: true,
          inset: true,
        },
        {
          avatar: "arrow_forward_ios",
          title: "Đổi mật khẩu",
          linkTo: "/change-password",
          canClick: true,
        },
        {
          divider: true,
          inset: true,
        },
        {
          avatar: "arrow_forward_ios",
          title: "Đăng xuất",
          dialogShow: true,
          canClick: true,
        },
      ],
    };
  },
  watch: {
    profile: function (val) {
      this.items[1].subtitle = val.full_name;
      this.items[3].subtitle = val.email;
      this.items[5].subtitle = `<span class='text--primary'>${val.phone_number}</span> `;
    },
  },
  async created() {
    let profileLocal = JSON.parse(localStorage.getItem("user"));

    this.profile = profileLocal;
  },
  methods: {
    async logout() {
      await unsubcribeDevice(this.profile.username);
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      this.$router.push({path: "/login"});
      window.location.reload(true)

    },
    canClick(item) {
      if (item.canClick) {
        if (item.linkTo) {
          location.href = item.linkTo;
        }
        if (item.dialogShow) {
          this.dialog = true;
        }
      }
    },
  },
};
</script>
