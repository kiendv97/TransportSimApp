<template>
<div>
    <v-tabs v-model="tab" color="#00B7C2" fixed-tabs background-color="red" slider-color="white">
        <v-tab style="color: white" class="caption font-weight-bold" v-for="item in items" :key="item.id">
            {{ item.title }}
        </v-tab>
    </v-tabs>
</div>
</template>

<script>
import {
    tabList
} from '@/enums/tabs.js'
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            items: tabList,
            tab: 1
        }
    },
    computed: mapState({
        currenStatus: state => state.transaction.currenStatus
    }),
    mounted() {
        this.tab = this.items.find(item => item.status == this.currenStatus).id
    },
    watch: {
        tab(value) {
            let nameStatus = this.items.find(item => item.id == value).status || 'SHIPPING'
            this.$store.commit('transaction/changeStatus', nameStatus)
        }
    },
}
</script>

<style lang="css" scoped>
</style>
