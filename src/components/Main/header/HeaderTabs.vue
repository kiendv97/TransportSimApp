<template>
<div>
    <v-tabs v-model="tab" color="#2196f3" fixed-tabs background-color="red" slider-color="white">
        <v-tab style="color: white" class="caption font-weight-bold" v-for="item in countTabStatus" :key="item.id" @click="tabSwipe(item.status)">
            {{ item.title }} {{ item.total }}
        </v-tab>
    </v-tabs>
</div>
</template>

<script>
import {
    tabList
} from '@/enums/tabs.js'
import {
    mapState, mapActions
} from 'vuex'
export default {
    data() {
        return {
            tabs: tabList,
            tab: 1
        }
    },
    computed: {
        ...mapState({
            currenStatus: state => state.transaction.currenStatus,
            countTransactionStatus: state => state.transaction.countTransactionStatus,
        }),
        countTabStatus() {
            let x = [...this.tabs].map(t => {
                let tab = {...t}
                tab.total = this.countTransactionStatus[tab.status]
                return tab
            })
            return x
        }
    },
    mounted() {
        this.tab = this.tabs.find(item => item.status == this.currenStatus).id
        this.$store.dispatch('transaction/COUNT_TRANSACTION_STATUS')
    },
    methods: {
        tabSwipe(value){
            this.$store.commit('transaction/changeStatus', value)
        }
    },
    watch: {
        currenStatus(value) {
            let idStatus = this.tabs.find(item => item.status == value).id
            this.tab = idStatus
        },
    },
}
</script>

<style lang="css" scoped>
</style>
