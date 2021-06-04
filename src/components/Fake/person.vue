<template>
  <v-menu offset-y transition="slide-x-transition" leave-absolute>
    <template v-slot:activator="{ on }">
      <div class="d-flex justify-center"  v-on="on">
        <v-avatar  >
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </div>
    </template>
    <v-list class="text-xs-center">
      <v-list-tile @click="logoutFake" class="d-inline-block">
        <v-list-tile-title>
          <v-icon>logout</v-icon>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
    items: [
      {}
    ]
    }
  },
  methods: {
    logoutFake() {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("access_token");
      this.$router.push({path: "/login"});
      window.location.reload(true)
    }
  }
};
</script>
<style lang="css"></style>
