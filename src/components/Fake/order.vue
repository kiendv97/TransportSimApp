<template>
<div>
  <v-dialog v-model="dialog" persistent max-width="300" :hide-overlay="false">
    <v-card class="container-dialog">
      <div class="highlight-sim" v-html="detailSim.sim_highlight"></div>
      <v-btn style="position: absolute; right: 6px; top: 5px" icon @click="$emit('cancel')">
        <v-icon>close</v-icon>
      </v-btn>
      <div class="space-between my-3">
        <span class="title-info">Giá bán: </span><span class="content">{{ convertMoney(detailSim.price_sale) }}</span>
      </div>
      <v-divider class="divider-order"></v-divider>
      <v-card-actions class="container-button">
          <v-btn block class="font-weight-bold" :loading="loadingBtn" rounded color="#E8302F" round @click="handleClickOrder" dark>ĐẶT SIM</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: "DialogFilter",
  data() {
    return {
      seller: {},
      rules: {
        required: (value) => !!value || "",
      },
      customer_phone_number: "",
      name: "",
      address: "",
      loadingBtn: false
    };
  },
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    detailSim: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const getDOM = document.getElementById("customer-phone");
    if (getDOM) {
      this.setInputFilter(document.getElementById("customer-phone"), function(value) {
        return /^\d*$/.test(value);
      });
    }
  },
  methods: {
    handleClickOrder() {
      this.loadingBtn = true
      this.$emit("save");
    },
  },
};
</script>
<style lang="css">
 .highlight-sim font {
   color: #ff7a00;
 }
 .highlight-sim {
   font-family: 'Roboto';
     font-size: 18px;
   font-weight: 600;
 }
 .container-button {
  justify-content: center;
 }

.divider-order {
  border-color: #f0f0f0;
  margin: 0px 30px;
}
.container-dialog {
  padding: 12px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
