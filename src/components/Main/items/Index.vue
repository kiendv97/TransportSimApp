<template>
<div>

    <div v-for="data in listTransaction" :key="data.order_code">
        <ItemCard :data="data" />
    </div>
    <div v-if="loadingItem" v-for="i in 4" :key="i">
        <vcl-twitch></vcl-twitch>
    </div>
    <div style="height:100vh;" v-if="!listTransaction.length && !loadingItem">
        <p class="text-xs-center body-2 font-weight-bold">Không có bản ghi nào</p>
    </div>
</div>
</template>

<script>
import ItemCard from '@/components/main/items/ItemCard'
import {
    VclTwitch
} from 'vue-content-loading';
import {
    mapState
} from 'vuex'
export default {
    components: {
        ItemCard,
        VclTwitch
    },
    computed: mapState({
        listTransaction: state => state.transaction.listTransaction,
        currenStatus: state => state.transaction.currenStatus,
        loadingItem: state => state.transaction.loadingItem,
    }),
    data() {
        return {

        }
    },
    mounted() {
        let payload = {
            status: this.currenStatus,
            page: 1,
        }
        this.$store.dispatch('transaction/GET_LIST_TRACSACTION', payload)
    },
    methods: {

    },
    watch: {
        currenStatus(value) {
            let payload = {
                status: value,
                page: 1,
            }
            this.$store.dispatch('transaction/GET_LIST_TRACSACTION', payload)
        }
    },
}
</script>
