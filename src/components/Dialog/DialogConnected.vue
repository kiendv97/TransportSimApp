<template>
<div class="text-center">
    <v-dialog persistent v-model="dialog" max-width="300">
        <v-card>
            <v-card-title class="caption grey lighten-2">
                Thông báo {{descriptionDialog}}
            </v-card-title>

            <v-card-text>
                <ConnectDetail :order-code="orderCode" />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="primary" text @click="$emit('cancel')">
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
    putConnect
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
            dialogBase: false
        }
    },
    methods: {
        async connect() {
            try {
                if (confirm('Đấu nối !')) {
                    // let result = await putConnect(this.orderCode, APPROVED)
                    this.$router.push({
                        path: '/list-connect'
                    })
                }

            } catch (error) {
                alert(error)
            }
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
    }
}
</script>
