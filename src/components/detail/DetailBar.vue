<template>
<div class="bar">
    <v-toolbar color="#2196f3" dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title clas>Chi tiết đơn hàng</v-toolbar-title>
    </v-toolbar>
</div>
</template>

<script>
export default {

}
</script>

<style lang="css">
.bar {
    position: sticky;
    z-index: 1;
    top: 0;
}
</style>
