<template>
<div class="layout-detail">
    <DetailBar />
    <div v-if="Object.entries(item).length">
        <div>
            <p class="font-weight-bold my-3 ml-3">Thông tin người nhận</p>
        </div>
        <DetailOrder :data="item" />
        <div>
            <p class="font-weight-bold my-3 ml-3">Trạng thái đơn hàng</p>
        </div>
        <DetailOrderStatus :order-id="item.order_id" :name-status="item.status" :note="item.note" :total-receivable-price="item.total_receivable_price" :finished-date="item.finished_date" />
        <div class="button-fixed">
            <v-card>
                <ItemButton :name-status="item.status" :transaction="item" />
            </v-card>
        </div>
    </div>
    <div v-else>
        <vcl-instagram></vcl-instagram>
    </div>
</div>
</template>

<script>
import DetailBar from '@/components/detail/DetailBar'
import DetailOrder from '@/components/detail/DetailOrder'
import DetailOrderStatus from '@/components/detail/DetailOrderStatus'
import ItemButton from '@/components/Main/items/ItemButton'
import {
    VclInstagram
} from 'vue-content-loading';
import {
    getComment,
    postComment,
    putSeriSim,
    changeStatus,
    getOrder
} from '@/api/fetch';
export default {
    components: {
        DetailBar,
        DetailOrder,
        DetailOrderStatus,
        ItemButton,
        VclInstagram
    },
    data() {
        return {
            item: {},
            listComment: [],
            textComment: '',
            seriNumber: '',
            dataEmit: {},
            dialog: false,
            dialogConnect: false,
            descriptionDialog: '',
            eventDialog: '',
            loadingSendSeri: false,
        };
    },
    async created() {
        let result = await getOrder(this.$route.query.id);
        this.item = result;
    },
}
</script>

<style scoped>
.button-fixed {
    position: sticky;
    bottom: 0px;
}

.layout-detail {
    line-height: 18px;
}
</style>
