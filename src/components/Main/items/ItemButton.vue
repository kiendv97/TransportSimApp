<template>
<div>
    <div class="d-flex" v-if="currenStatus == 'NOT_DELIVERED' || currenStatus == 'SHIPPING'">
        <v-btn outline color="success" @click.stop="showDialog('APPROVE')">
            <v-icon left color="success">check</v-icon> Đồng ý
        </v-btn>
        <v-btn outline color="red" @click.stop="showDialog('REJECT')">
            <v-icon left color="red">clear</v-icon> Từ chối
        </v-btn>
        <v-btn outline color="blue" @click.stop="callPhone(transaction.assignee_phone_number)">
            <v-icon left color="blue">call</v-icon> Gọi
        </v-btn>
    </div>

    <ConfirmDialog v-if="dialog" :event="event" :data-emit="transaction" :status="currenStatus" :dialog="dialog" @confirm="onEventConfirm($event)" @cancel="dialog = false" />
</div>
</template>

<script>
import ConfirmDialog from '@/components/Dialog/DialogConfirm'
import ListConnect from '@/components/main/ListConnect'
import {
    listTransactionForApp,
    changeStatus,
    searchTransation
} from '@/api/fetch'
import {
    mapState
} from 'vuex'
export default {
    components: {
        ConfirmDialog,
        ListConnect
    },
    props: {
        transaction: {
            type: Object,
            default: {}
        },
    },
    computed: {
        ...mapState({
            currenStatus: state => state.transaction.currenStatus
        })
    },
    data() {
        return {
            dialog: false,
            event: ''
        }
    },
    methods: {
        showDialog(type) {
            this.dialog = true
            this.event = type
        },
        callPhone(phone) {
            window.location.href = `tel:${phone}`;
        },
        onEventConfirm(e) {
            try {
                let payloadChangeStatus = {
                    package_item_id: e.package_item_id,
                    note: e.note,
                    status: e.status,
                    receivePrice: e.receivePrice
                }
                let payloadGetlist = {
                    status: this.currenStatus,
                    page: 1,
                    page_size: 150
                }
                this.$store.dispatch('transaction/CHANGE_STATUS', payload)
                this.$store.dispatch('transaction/GET_LIST_TRACSACTION', payloadGetlist)
            } catch (error) {
                if (error && error.response && error.response.data) {
                    alert(error.response.data.message)
                }
            }

        },
    },
}
</script>
