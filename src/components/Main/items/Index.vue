<template>
    <div
    v-scroll.self="onScroll"
      v-touch="{
        left: () => stepSwipeLeft(),
        right: () => stepSwipeRight(),
      }"
    >
      <!-- <div v-if="currenStatus == 'CONNECT'">
      <div v-for="data in listConnect" :key="data.order_code">
        <ConnectDetail v-if="data" :item="data" />
      </div>
    </div> -->
      <v-scroll-y-transition group mode="in-out">
        <div v-for="data in listTransaction[currenStatus]" :key="data.order_code">
          <ItemCard :data="data" />
        </div>
      </v-scroll-y-transition>

      <div v-if="loadingItem">
        <div v-for="i in 4" :key="i">
          <vcl-twitch></vcl-twitch>
        </div>
      </div>
      <div v-if="listTransaction[currenStatus] && !listTransaction[currenStatus].length && !loadingItem && currenStatus !== 'CONNECT'" style="height: 100vh; padding-top:100px;">
        <p class="text-xs-center body-2 font-weight-bold">Không có bản ghi nào</p>
      </div>
    </div>
</template>

<script>
import ItemCard from "@/components/Main/items/ItemCard";
import ConnectDetail from "@/components/Connect/ConnectDetail";
import { VclTwitch } from "vue-content-loading";
import { mapState } from "vuex";
import { enumStatus, tabList } from "@/enums/tabs.js";
export default {
  components: {
    ItemCard,
    VclTwitch,
    ConnectDetail,
  },
  computed: mapState({
    listTransaction: (state) => state.transaction.listTransaction,
    currenStatus: (state) => state.transaction.currenStatus,
    listConnect: (state) => state.transaction.listConnect,
    loadingItem: (state) => state.transaction.loadingItem,
    behaviorScroll: (state) => state.item.behaviorScroll,
  }),
  data() {
    let shipperId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : false;
    if (!shipperId) {
      this.$router.push("/login");
    }
    return {
      enumStatus: enumStatus,
      tabList: tabList,
      shipperId: shipperId,
      offsetScrolltop: 0,
      options: {
        duration: 0,
        offset: 0,
        easing: 'linear'
      },
    };
  },
  created() {
    let payload = {
      status: this.currenStatus,
      page: 1,
      shipper_id: this.shipperId,
    };
    this.$store.dispatch("transaction/GET_LIST_TRACSACTION", payload);
  },
  beforeMount() {
    this.$vuetify.goTo(this.behaviorScroll[this.currenStatus] || 0, this.options)
  },
  methods: {
    onScroll(e) {
      this.offsetScrolltop = e.target.documentElement ?  e.target.documentElement.scrollTop : e.target.scrollTop
    },
    stepSwipeLeft() {
      let statusText = this.currenStatus;
      let output;
      switch (statusText) {
        case enumStatus.NOT_DELIVERED:
          output = enumStatus.SHIPPING;
          break;

        case enumStatus.SHIPPING:
          output = enumStatus.DELIVERED;
          break;

        case enumStatus.DELIVERED:
          output = enumStatus.FAIL;
          break;

        case enumStatus.FAIL:
          output = enumStatus.NOT_DELIVERED;
          break;

        default:
          break;
      }

      this.$store.commit("transaction/changeStatus", output);
    },
    stepSwipeRight() {
      let statusText = this.currenStatus;
      let output;
      switch (statusText) {
        case enumStatus.NOT_DELIVERED:
          output = enumStatus.FAIL;
          break;

        case enumStatus.SHIPPING:
          output = enumStatus.NOT_DELIVERED;
          break;

        case enumStatus.DELIVERED:
          output = enumStatus.SHIPPING;
          break;

        case enumStatus.FAIL:
          output = enumStatus.DELIVERED;
          break;

        default:
          break;
      }

      this.$store.commit("transaction/changeStatus", output);
    },
  },
  watch: {
    currenStatus(value, oldValue) {
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
        this.$store.dispatch("item/SAVE_OFFSET_SCROLL", {offset: this.offsetScrolltop, status: oldValue});
        this.$store.dispatch("transaction/GET_LIST_TRACSACTION", payload);
        this.$vuetify.goTo(this.behaviorScroll[this.currenStatus] || 0, this.options)
      }
    },
  },
  destroyed() {
    this.$store.dispatch("item/SAVE_OFFSET_SCROLL", {offset: this.offsetScrolltop, status: this.currenStatus});
  }
};
</script>
<style lang="css" scoped>
.btnCopy {

}
</style>
