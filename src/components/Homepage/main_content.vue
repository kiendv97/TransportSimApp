<template>
  <v-card
    tile
    flat
  >
    <v-progress-linear background-color="green" />
    <div class="status">
      <div
        id="text"
        class="title"
      >
        {{ name }}
      </div>
      <div class="font-weight-medium display-2 mt-4">
        {{ mount }}
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {
    access
} from "fs";
export default {
    name: "CardComponent",
    props: ["mount", "name"],

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.process-color {
    display: flex;
    justify-content: flex-start;
}

.status {
    margin-top: 50px;
}
</style>
