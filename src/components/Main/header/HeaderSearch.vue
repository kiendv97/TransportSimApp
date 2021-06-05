<template>
  <div>
    <v-text-field v-model="search" clearable label="Tìm kiếm .... " append-icon="search" @click:clear="searchOrder" ref="searchRef" @keyup.enter="searchOrder" class="search-field" style="width: 95%; margin: 0 auto;" solo solo-inverted hide-details dark flat autofocus @click:append="searchOrder" />
  </div>
</template>

<script>
export default {
  data() {
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false;
    if (!user) {
      this.$router.push("/login");
    }
    return {
      nameUser: user.full_name,
      shipperId: user.id,
      searchEmit: "",
      search: "",
    };
  },
  methods: {
    async searchOrder(e) {
      this.$vuetify.goTo(0);
      this.$nextTick(() => {
        this.$store.dispatch("transaction/SEARCH", {
          search: this.search,
          shipper_id: this.shipperId,
        });
      });
    },
  },
};
</script>

<style scoped>
.theme--dark.v-label {
  color: black;
}

#app > div > div > div.flex.headermain.xs12.lg12.md12.sm12 > div > div > div:nth-child(2) > div > div > div {
  border-radius: 24px;
  background: #191717;
}
</style>
