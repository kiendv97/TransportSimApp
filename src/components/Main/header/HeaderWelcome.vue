<template>
  <div>
    <div style="height: 9vh;" class="d-flex pa-2">
      <v-avatar @click="Profile()" >
        <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor" />
      </v-avatar>
      <p class="pt-3" style="color: white;" @click="Profile()" >
        Xin chào <strong>{{ nameUser }} !</strong>
      </p>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="renewOrder()"><v-icon>autorenew</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let nameUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).full_name : false;
    if (!nameUser) {
      this.$router.push("/login");
    }
    return {
      nameUser: nameUser,
    };
  },
  // computed: {
  //   ...mapState({
  //       currenStatus: state => state.transaction.currenStatus,
  //       countTransactionStatus: state => state.transaction.countTransactionStatus,
  //   }),
  // },
  methods: {
    renewOrder() {
      this.$router.go(this.$router.currentRoute)
        // this.$store.dispatch('transaction/COUNT_TRANSACTION_STATUS')
      // this.$store.commit('transaction/changeStatus', this.currenStatus)
    },
    Profile() {
      this.$router.push({
        name: "Profile",
      });
    },
  },
};
</script>
