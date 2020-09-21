<template>
<div>
    <div class="d-flex" v-if="currenStatus == 'NOT_DELIVERED' || currenStatus == 'SHIPPING'">
        <v-btn outline color="success" @click.stop="showDialog('APPROVE')">
            <v-icon left color="success">check</v-icon> Đồng ý
        </v-btn>
        <v-btn outline color="red" @click.stop="showDialog('REJECT')">
            <v-icon left color="red">clear</v-icon> Từ chối
        </v-btn>
        <v-btn v-if="!canConnect()" outline color="blue" @click.stop="callPhone(transaction.assignee_phone_number)">
            <v-icon left color="blue">call</v-icon> Gọi
        </v-btn>
        <v-btn v-if="canConnect()" outline color="blue" @click.stop="showDialogConnected()">
            <v-icon left color="blue">wifi</v-icon> Đấu nối
        </v-btn>
    </div>
    <DialogConnected v-if="dialogConnect" :order-code="transaction.order_code" :dialog="dialogConnect" :descriptionDialog="descriptionDialog" @cancel="dialogConnect = false" />
    <ConfirmDialog v-if="dialog" :event="event" :data-emit="transaction" :status="currenStatus" :dialog="dialog" @confirm="dialog = false" @cancel="dialog = false" />
</div>
</template>

<script>
import ConfirmDialog from '@/components/Dialog/DialogConfirm'
import DialogConnected from '@/components/Dialog/DialogConnected'
import ListConnect from '@/components/main/ListConnect'
import Itel from '@/enums/itel-can-connect'
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
        DialogConnected,
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
            dialogConnect: false,
            event: '',
            descriptionDialog: ''
        }
    },
    methods: {
        showDialogConnected() {
            this.dialogConnect = true
            this.descriptionDialog = 'Đơn hàng có thể đấu nối'
        },
        canConnect() {
            return this.transaction.sold_product.startsWith(Itel.itel)
        },
        showDialog(type) {
            this.dialog = true
            this.event = type
        },
        callPhone(phone) {
            window.location.href = `tel:${phone}`;
        }
    },
}
</script>
