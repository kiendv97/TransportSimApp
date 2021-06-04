<template>
  <div>
    <v-dialog v-model="dialog" persistent fullscreen>
      <div class="text-xs-center">
        <img src="@/assets/loadingsearch.svg" alt="" />
      </div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.dialog = this.loading;
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style lang="css">
  .v-dialog.v-dialog--active.v-dialog--fullscreen {
    display: contents;
  }
</style>