<template>
<div>
    <v-card class="order-card pa-2">
        <v-layout class="my-2" row>
            <v-flex xs6>
                <p class="text-xs-left headline font-weight-bold mb-1" style="color: #0F4C75">
                    {{ data.sold_product }}
                </p>
                <p class="text-xs-left font-weight-thin mb-1">
                    {{ dateTimeFormat(data.finished_date) }}
                </p>
            </v-flex>
            <v-flex xs6>
                <p class="mb-1 text-xs-center" :style="'color:' + showStatus(data.status).color"> {{showStatus(data.status).text}}</p>
                <p class="mb-0">Tổng tiền thu: <strong style="color: red;">{{ convertMoney(data.total_receivable_price) }}</strong></p>
            </v-flex>
        </v-layout>
        <ItemAddress :customer="detailProp" :assignee="detailProp" />
        <v-layout>
            <v-flex>
                <p class="font-weight-bold caption my-1">Số seri sim:</p>
            </v-flex>
        </v-layout>
        <v-layout justify-center row>
            <v-flex justify-center xs8>
                <v-text-field v-model="seriNumber" :label="data.sim_series ? data.sim_series : 'Nhập seri sim...'"></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn color="#0F4C75" dark :loading="loadingSendSeri" @click="putSeriSimFunc">
                    Gửi
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</div>
</template>

<script>
import ItemAddress from '@/components/main/items/ItemAddress'
import {
    getComment,
    postComment,
    putSeriSim,
    changeStatus,
    getOrder
} from '@/api/fetch';
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            detailProp: {},
            seriNumber: '',
            loadingSendSeri: false
        }
    },
    components: {
        ItemAddress
    },
    created() {
        this.detailProp = {
            receiver_phone: this.data.customer_profile.customer_phone,
            receiver_name: this.data.customer_profile.customer_name,
            receiver_address: this.data.customer_profile.customer_address,
            assignee_phone_number: this.data.assignee_phone_number,
            assignee_full_name: this.data.assignee_full_name
        }
    },
    methods: {
        async putSeriSimFunc() {
            try {
                this.loadingSendSeri = true
                let result = await putSeriSim(this.data.order_item_id, this.seriNumber);
                alert('Thay đổi seri thành công!');
                this.loadingSendSeri = false
            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                    this.loadingSendSeri = false
                } else {
                    alert(error);
                }
            }
        },
        showStatus(status) {
            let colorAndText = {
                text: '',
                color: ''
            }
            switch (status) {
                case 'NOT_DELIVERED':
                    colorAndText.text = 'Chưa giao'
                    colorAndText.color = 'green'
                    return colorAndText
                    break;

                case 'SHIPPING':
                    colorAndText.text = 'Đang giao'
                    colorAndText.color = 'chocolate'
                    return colorAndText
                    break;

                case 'DELIVERED':
                    colorAndText.text = 'Đã giao'
                    colorAndText.color = 'blue'
                    return colorAndText
                    break;

                case 'FAIL':
                    colorAndText.text = 'Thất bại'
                    colorAndText.color = 'red'
                    return colorAndText
                    break;

                default:
                    break;
            }
        },
    },
}
</script>

<style>
.order-card {
    width: 97%;
    border-radius: 17px;
    margin: 0 auto;
}

</style>
