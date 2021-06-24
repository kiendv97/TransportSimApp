<template>
<div class="search-bar">
    <v-text-field :value="value"  @change="enterToSearch()" type="tel" label="Tìm sim"  @input="emitInputKey" hide-details background-color="#E9E9E9" append-icon="search" @click:append="enterToSearch()" @keyup.enter="enterToSearch()" solo flat dense maxLength="15">
    </v-text-field>
    </div>
</template>
<script>
export default {
  props: {
    keySearch: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      required: false,
      defalt: ''
    }
  },
  data() {
    return {
      search: "",
      ruleKeySearch: [(value) => /[a-dA-D\d+]/.test(value) || "Giá trị nhập vào ko đúng"],
    };
  },
  methods: {
    emitInputKey(event) {
      this.$emit('input', event)
    },
    enterToSearch(e) {
      this.$emit("searchEvent");
    },
  },
};
</script>
<style lang="css">
  .search-bar  {
    padding: 12px;
  }
  .search-bar .v-input__slot {
    border-radius: 50px !important;
  }
</style>
