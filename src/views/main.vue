<template>
  <v-app>
    <v-layout row wrap>
      <v-flex class="fixed top-0 headermain" xs12 lg12 md12 sm12>
        <Header />
      </v-flex>
      <v-flex class="listItem" xs12 lg12 md12 sm12>
        <ListItem />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Header from "@/components/Main/header/Index";
import ListItem from "@/components/Main/items/Index";
import axios from "axios";
import moment from "moment";
import { searchTransation } from "@/api/fetch";
export default {
  components: {
    ListItem,
    Header,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.headermain {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 2;
}
.listItem {
  margin-top: 115px;
}
</style>
