<template>
  <div>
    <v-card color="#00B7C2" class="my-0">
      <Welcome />
      <Search />
      <Tabs />
    </v-card>
    <div v-if="currenStatus == enumStatus.DELIVERED" class="btnCopy">
      <v-btn :disabled="!countCopy" color="blue" class="ma-0 white--text" @click.stop="onCoppy">Coppy ({{ countCopy }})</v-btn>
    </div>
    <div>
      <v-snackbar v-model="snackbar.status" :color="snackbar.color" dark top rounded width="10">
        {{ snackbar.message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Welcome from "@/components/Main/header/HeaderWelcome";
import Tabs from "@/components/Main/header/HeaderTabs";
import Search from "@/components/Main/header/HeaderSearch";
import { mapState } from "vuex";
import { enumStatus } from "@/enums/tabs.js";
export default {
  components: {
    Welcome,
    Search,
    Tabs,
  },
  computed: mapState({
    countCopy: (state) => state.item.countCopy,
    listTransactionCopied: (state) => state.item.listTransactionCopied,
    listTransaction: (state) => state.transaction.listTransaction,
    currenStatus: (state) => state.transaction.currenStatus,
    loadingItem: (state) => state.transaction.loadingItem,
    listConnect: (state) => state.transaction.listConnect,
  }),
  data() {
    return {
      snackbar: {
        status: false,
        message: "",
        color: "black",
      },
      enumStatus: enumStatus,
    };
  },
  created() {
    //   this.$store.dispatch('item/RESET_TRANSACTION_COPY')
  },
  methods: {
    onCoppy() {
      this.snackbar.status = true;
      let listTrsCoppied = [...this.listTransactionCopied];
      if (!listTrsCoppied.length) {
        this.snackbar.message = "Không có bản ghi nào";
        this.snackbar.color = "red";
        return;
      }
      let coppyText = listTrsCoppied.map((trC) => {
        return `${trC.sold_product} - ${this.convertMoney(trC.total_receivable_price)}`;
      });
      coppyText = coppyText.toString().replace(/,/g, '\n')
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.setAttribute("id", "dummy_id");
      document.getElementById("dummy_id").value = coppyText;
      dummy.select();
      dummy.setSelectionRange(0, 999999);
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.snackbar.color = "black";
      this.snackbar.message = "Coppy thành công!";
    },
  },
};
</script>
<style lang="css" scoped>
.btnCopy {
    top: 150%;
    position: absolute;
    right: 0px;
    margin: 0;
}
</style>
