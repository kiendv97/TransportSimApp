<template>
<div class="text-center">
    <v-dialog persistent v-model="dialog" max-width="400">
        <v-card>
            <v-card-title class="caption grey lighten-2">
                Thông báo {{descriptionDialog}}
            </v-card-title>

            <v-card-text>
                <ConnectDetail :order-code="orderCode" :item="detailConnect" />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="error" text @click="$emit('cancel')">
                    Huỷ
                </v-btn>
                <v-btn outline color="primary" text @click="connect">
                    Đấu nối
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import ConnectDetail from '@/components/Connect/ConnectDetail'
import {
    getRequestConnect
} from '@/api/fetch'
import {
    APPROVED,
    FAIL,
    SUCCESS,
    PENDING
} from '@/enums/status-connect'
export default {
    components: {
        ConnectDetail,
    },
    data() {
        return {
            dialogBase: false,
            detailConnect: {}
        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        descriptionDialog: {
            type: String,
            default: ''
        },
        orderCode: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.getRequest(this.orderCode.split(' ')[0])
    },
    methods: {
        async getRequest(orderCode) {
            try {
                let result = await getRequestConnect(orderCode)
                this.detailConnect = result
            } catch (error) {
                alert(error)
            }
        },
        async connect() {
            try {
                if (confirm('Đấu nối !')) {
                    let putConnectObject = {
                        orderCode: this.orderCode.split(' ')[0],
                        status: 'APPROVED'
                    }
                    await this.$store.dispatch('transaction/PUT_CONNECT', putConnectObject)
                    alert('Đang xử lý! vào danh sách đấu nối, tìm kiếm để xem kết quả.')
                    this.$emit('cancel')
                }
            } catch (error) {
                alert(error)
            }
        }
    },

}
</script>
