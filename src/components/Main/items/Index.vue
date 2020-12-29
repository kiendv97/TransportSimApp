<template>
  <div>
    <div v-if="currenStatus == 'CONNECT'">
      <div v-for="data in listConnect" :key="data.order_code">
        <ConnectDetail v-if="data" :item="data" />
      </div>
    </div>
    <div v-for="data in listTransaction" :key="data.order_code">
      <ItemCard :data="data" />
    </div>
    <div v-if="loadingItem">
      <div v-for="i in 4" :key="i">
        <vcl-twitch></vcl-twitch>
      </div>
    </div>

    <div v-if="!listTransaction.length && !loadingItem && currenStatus !== 'CONNECT'" style="margin-top:100px;">
      <p class="text-xs-center body-2 font-weight-bold">Không có bản ghi nào</p>
    </div>
  </div>
</template>

<script>
import ItemCard from "@/components/Main/items/ItemCard";
import ConnectDetail from "@/components/Connect/ConnectDetail";
import { VclTwitch } from "vue-content-loading";
import { mapState } from "vuex";
import { enumStatus } from '@/enums/tabs.js'
export default {
  components: {
    ItemCard,
    VclTwitch,
    ConnectDetail,
  },
  computed: mapState({
    listTransaction: (state) => state.transaction.listTransaction,
    currenStatus: (state) => state.transaction.currenStatus,
    loadingItem: (state) => state.transaction.loadingItem,
    listConnect: (state) => state.transaction.listConnect,
  }),
  data() {
    let shipperId = JSON.parse(localStorage.getItem("user")).id;
    return {
        enumStatus: enumStatus,
      shipperId: shipperId,
    };
  },
  mounted() {
    let payload = {
      status: this.currenStatus,
      page: 1,
      shipper_id: this.shipperId,
    };
    this.$store.dispatch("transaction/GET_LIST_TRACSACTION", payload);
  },
  methods: {},
  watch: {
    currenStatus(value) {
      if (this.currenStatus == "CONNECT") {
        let payload = {
          status: "",
          page: 1,
          shipper_id: this.shipperId,
        };
        this.$store.dispatch("transaction/GET_LIST_CONNECT", payload);
      } else {
        let payload = {
          status: value,
          page: 1,
        };
        this.$store.dispatch("transaction/GET_LIST_TRACSACTION", payload);
      }
    },
  },
};
</script>
<style lang="css" scoped>
    .btnCopy {
       
    }
</style>