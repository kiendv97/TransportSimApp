<template>
<div>
    <div>
        <DetailBar />
        <div>
            <p class="font-weight-bold my-2">Thông tin người nhận</p>
        </div>
        <DetailOrder v-if="Object.entries(item).length" :data="item" />
        <div>
            <p class="font-weight-bold my-2">Trạng thái đơn hàng</p>
        </div>
        <DetailOrderStatus v-if="Object.entries(item).length" :name-status="item.status" :note="item.note" :total-receivable-price="item.total_receivable_price" :finished-date="item.finished_date" />
        <div class="button-fixed">
            <v-card>
                <ItemButton :name-status="item.status" :transaction="item" />
            </v-card>
        </div>
    </div>
</div>
</template>

<script>
import DetailBar from '@/components/detail/DetailBar'
import DetailOrder from '@/components/detail/DetailOrder'
import DetailOrderStatus from '@/components/detail/DetailOrderStatus'
import ItemButton from '@/components/main/items/ItemButton'
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
        ItemButton
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
</style>
