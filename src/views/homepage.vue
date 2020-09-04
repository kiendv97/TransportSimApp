<template>
  <v-layout row>
    <v-flex
      xs12
      sm6
      offset-sm3
    >
      <v-card>
        <v-toolbar
          color="cyan"
          dark
        >
          <v-btn icon />

          <v-toolbar-title>App Giao Sim</v-toolbar-title>

          <v-spacer />
          <v-avatar>
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4"
              alt="avatar"
              @click='$router.push({name: "Profile"})''
            >
          </v-avatar>
        </v-toolbar>
        <v-subheader>Xin chao {{nameClient}}</v-subheader>
        <v-layout
          row
          wrap
        >
          <v-flex
            v-for="(item,index) in items"
            :key="index"
            xs6
          >
            <v-card @click="$router.push('/main')">
              <v-container>
                <CardComponent :status-object="item" />
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CardComponent from "@/components/Homepage/main_content.vue";
import axios from "axios";

export default {
    components: {
        CardComponent
    },
    data() {
        return {
            nameClient: "",
            items: [
              {
                text: 'Chưa giao',
                key: 'NOT_DELIVERED'
              },
              {
                text: 'Đang giao',
                key: 'SHIPPING'
              },
              {
                text: 'Đã giao',
                key: 'DELIVERED'
              },
              {
                text: 'Thất bại',
                key: 'FAIL'
              }
            ]
        };
    },
    mounted() {
      let userLocal = JSON.parse(localStorage.getItem('user'))
      if(!userLocal) {
        this.$route.push('/login')
        return
      } 
      this.nameClient = userLocal.username
    },

};
</script>

<style>
.v-card>.container {
    box-sizing: border-box;
    height: 300px;
    margin: 5px;
}
</style>
