<template>
  <div>
    <v-tabs v-model="active_tab" grow>
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab :key="0">
        Trang chủ
      </v-tab>

      <v-tab :key="1">
        Tìm kiếm
      </v-tab>

      <v-tab :key="2">
        Giới thiệu
      </v-tab>
      <v-tab-item :key="0"> <slot name="slot-homepage"></slot></v-tab-item>
      <v-tab-item :key="1"> <slot name="slot-search"></slot> </v-tab-item>
      <v-tab-item :key="2"> <slot name="slot-introduce"></slot> </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  props: ["tabs"],
  data() {
    return {
      active_tab: 0,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  watch: {
    active_tab(val) {
      this.$emit('change-tab', val)
    },
    tabs(val) {
      this.active_tab = val
    }
  },
};
</script>
<style lang="css">
  .v-tabs__bar {
    position: sticky;
    top: 72px;
    z-index: 8;
  }
</style>
