<template>
<div>
    <div class="d-flex">
        <v-btn outline color="success">
            <v-icon left color="success">check</v-icon> Đồng ý
        </v-btn>
        <v-btn outline color="red">
            <v-icon left color="red">clear</v-icon> Từ chối
        </v-btn>
        <v-btn outline color="blue">
            <v-icon left color="blue">call</v-icon> Gọi
        </v-btn>
    </div>

    <ConfirmDialog v-if="dialog" :event="eventDialog" :data-emit="transaction" :status="nameStatus" :dialog="dialog" @confirm="onEventConfirm($event)" @cancel="dialog = false" />
</div>
</template>

<script>
import ConfirmDialog from '@/components/Dialog/DialogConfirm'
import {
    listTransactionForApp,
    changeStatus,
    searchTransation
} from '@/api/fetch'
export default {
    props: {
        nameStatus: {
            type: String,
            default: ''
        },
        transaction: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        async onEventConfirm(e) {
            try {
                let result = await changeStatus(e.package_item_id, e.note, e.status, e.receivePrice)
                this.data.splice(e.index, 1);
            } catch (error) {
                if (error && error.response && error.response.data) {
                    alert(error.response.data.message)
                }
            }

        },
    },
}
</script>
