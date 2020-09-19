<template>
<div v-if="data">
    <v-card class="mb-2" @click="detail(data.package_item_id)">
        <v-card-text>
            <div>
                <v-layout row>
                    <v-flex xs6>
                        <p class="text-xs-left headline font-weight-bold mb-1" style="color: #0F4C75">
                            {{ data.sold_product }}
                        </p>
                        <p class="mb-1">
                            {{ data.subscription_type_name }}
                        </p>
                        <p class="text-xs-left font-weight-thin mb-1">
                            {{dateTimeFormat(data.finished_date) }}
                        </p>
                    </v-flex>
                    <v-flex v-if="data.finished_date" xs6>
                        <p class="mb-1 text-xs-center" :style="'color:' + showStatus(data.status).color"> {{showStatus(data.status).text}}</p>
                        <p class="mb-0">Tổng tiền thu: <strong style="color: red;">{{ convertMoney(data.total_receivable_price) }}</strong></p>

                    </v-flex>
                </v-layout>
            </div>
            <v-divider></v-divider>
            <ItemAddress :customer="data.receiver_info" :assignee="assigneeProp" />
            <v-divider></v-divider>
            <ItemComments :comments="data.comments" />
        </v-card-text>
        <v-card-actions class="d-inline-block" style="width: 100%">
            <ItemButton :transaction="data" />
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import ItemButton from '@/components/main/items/ItemButton'
import ItemAddress from '@/components/main/items/ItemAddress'
import ItemComments from '@/components/main/items/ItemComments'
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
        ItemButton,
        ItemAddress,
        ItemComments
    },
    props: {
        data: {
            type: Object,
            default: null,
        }

    },
    computed: mapState({
        currentStatus: state => state.transaction.currentStatus
    }),
    data() {
        return {
            page: 1,
            bottom: false,
            loading: false,
            errorLoading: '',
            dialog: false,
            eventDialog: '',
            dataEmit: {},
            end: false,
            assigneeProp: {}
        }
    },
    mounted() {
        this.assigneeProp = {
            assignee_full_name: this.data.assignee_full_name,
            assignee_phone_number: this.data.assignee_phone_number
        }
    },
    methods: {
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
        detail(val) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: val
                }
            });
        },
    },
}
</script>

<style lang="css" scoped>

</style>
