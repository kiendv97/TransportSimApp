<template>
  <v-card
    tile
    flat
  >
    <v-progress-linear
      :indeterminate="true"
      background-color="green"
      value="50"
    />
    <div class="status">
      <p
        id="text"
        class="title"
      >
        {{ name_status }}
      </p>
      <p class="font-weight-medium">
        {{ mount }}
      </p>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { access } from "fs";
export default {
  name: "CardComponent",
  props: ["nameStatus"],
  data() {
    return {
      mount: 0
    };
  },
  mounted() {
    var fromDate;
    var dateNow = new Date();
    if (dateNow.getMonth() > 6) {
      fromDate = moment([
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate()
      ])
        .month(dateNow.getMonth() - 6)
        .format("YYYY-MM-DD");
    } else {
      fromDate = moment([
        dateNow.getFullYear() - 1,
        dateNow.getMonth(),
        dateNow.getDate()
      ])
        .month(dateNow.getMonth() + 6)
        .format("YYYY-MM-DD");
    }
    axios
      .get(
        `http://beta4.topsim.vn/api/transaction-trader/packages?create_date_from=${fromDate}&create_date_to=${moment().format('YYYY-MM-DD')}&status=${this.$props.name_status}`,
        {
          headers: {
            "x-access-token": localStorage.access_token,
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(responses => {
        console.log(responses);
        
        this.mount = responses.data.paging.total;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.process-color {
  display: flex;
  justify-content: flex-start;
}
.status {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
