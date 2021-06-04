<template>
  <div class="main-fake">
    <div>
      <v-snackbar v-model="snackbar.status" dark top width="100" :color="snackbar.color">
        {{snackbar.message}}
      </v-snackbar>
    </div>
    <nav class="header-bar">
      <div class="searching">
        <Search v-model="key_search" @searchEvent="searchFunc()" />
      </div>
      <div class="personalirity">
        <Person />
      </div>
    </nav>
    <nav class="sims">
      <div v-if="!listSim.length && !loadingItem" style="text-align: center;">
        Không tìm thấy sim!
      </div>

      <div class="list-sim-fake" v-for="(sim, index) in listSim" :key="index">
        <div @click="personHanleOrder(sim)" v-ripple="{center: true}">
        <ListItem :sim="sim" />
        <v-divider></v-divider>
        </div>
      </div>
      <Loading v-if="loadingItem" :loading="loadingItem" />
      <Order v-if="dialogOrder" :dialog="dialogOrder" :detail-sim="simChoose" @cancel="dialogOrder = false" @save="saveOrder" />
    </nav>
  </div>
</template>
<script>
import ListItem from "@/components/Fake/item";
import Order from "@/components/Fake/order";
import Loading from "@/components/Fake/loading";
import Search from "@/components/Fake/search";
import Person from "@/components/Fake/person";
import { VclBulletList } from "vue-content-loading";
import { mapState } from "vuex";
import { MOCK_LIST_SIM } from "@/mock/fake.js";
export default {
  components: {
    VclBulletList,
    ListItem,
    Search,
    Order,
    Person,
    Loading,
  },
  computed: mapState({
    loadingItem: (state) => state.fake.loadingItem,
    listSim: (state) => state.fake.listSim,
    snackbar: (state) => state.fake.snackbar,
  }),
  data() {
    return {
      dialogOrder: false,
      simChoose: {},
      key_search: "",
      bottom: false,
      listSim_del: MOCK_LIST_SIM.sims,
    };
  },
  watch: {
    loadingItem: {
      handler: function(oldVal, newVal) {
        this.dialogOrder = false
      },
      deep: true
    },
    snackbar: {
      handler: function(oldVal, newVal){
        if(!newVal) {
          this.$store.commit('fake/toggleOffSnackbar');
        }
      },
      deep: true
    }
  },

  mounted() {
    this.srollBottom();
    this.fetchData();
  },
  methods: {
    personHanleOrder(item) {

      this.dialogOrder = true;
      this.simChoose = item;
    },
    async saveOrder() {
      await this.$store.dispatch("fake/SEND_ORDER_TOP_SIM", this.simChoose);
      this.dialogOrder = false
    },
    searchFunc() {
      this.$store.commit('fake/clearListSim')
      this.fetchData(true);
    },
    fetchData(status_search) {
      /** payload */
      this.$store.dispatch("fake/GET_LIST_TRACSACTION", {
        keysearch: this.key_search,
        is_new: status_search 
      });
    },
    srollBottom() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
        if (bottomOfWindow && !this.loadingItem) {
          this.bottom = true;
          this.fetchData(false);
        }
      };
    },
  },
};
</script>
<style lang="css">
.main-fake {
  position: relative;
}
.header-bar {
  display: flex;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 9;
  top: 0;
}
.sims {
  margin-top: 72px;
}
  .searching {
    width: 80%;
  }
  .personalirity {
    margin: auto;
    width: 20%;
  }
</style>
