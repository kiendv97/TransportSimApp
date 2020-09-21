<template>
<div>
    <v-dialog v-model="dialog" round persistent width="300">
        <v-card>
            <v-card-title class="text-xs-center mx-0">
                {{descriptionEvent}}
            </v-card-title>

            <v-card-text>
                <v-textarea solo label="Ghi chú" v-if="event == 'REJECT' && status == 'SHIPPING'" v-model="note">
                </v-textarea>
                <!-- <v-text-field :label="'Số tiền thực nhận là: ' +  convertMoneySubcriber" v-if="event == 'APPROVE' && status == 'SHIPPING'" type="number" v-model="receivePrice">
                </v-text-field> -->
                <p v-else>Xác nhận</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="error" text @click="$emit('cancel')">
                    Huỷ
                </v-btn>
                <v-btn outline color="success" text @click="confirmFunc()">
                    Đồng ý
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props: {
        status: {
            type: String,
            default: ''
        },
        dialog: {
            type: Boolean,
            default: true
        },
        event: {
            type: String,
            default: ''
        },
        dataEmit: {
            type: Object,
            default: {}
        }
    },
    computed: {
        descriptionEvent() {
            if (this.status == 'NOT_DELIVERED' && this.event == 'APPROVE') {
                return 'Chuyển trạng thái sang đang giao?'
            } else if (this.status == 'SHIPPING' && this.event == 'APPROVE') {
                return 'Chuyển trạng thái sang đã giao xong?'
            } else {
                return 'Thất bại?'
            }
        }
    },
    data() {
        return {
            note: '',
            receivePrice: '',
            statusChange: ''
        }
    },
    mounted() {
        // console.log(this.$prop);
    },
    methods: {
        changeStatusFunc() {
            if (this.status == 'NOT_DELIVERED' && this.event == 'APPROVE') {
                return 'SHIPPING'
            } else if (this.status == 'SHIPPING' && this.event == 'APPROVE') {
                return 'DELIVERED'
            } else {
                return 'FAIL'
            }
        },
        confirmFunc() {
            let emitData = {
                note: this.note,
                receivePrice: this.receivePrice,
                package_item_id: this.dataEmit.package_item_id,
                status: this.changeStatusFunc()
            }
            console.log('0', emitData)
            this.$emit('confirm', emitData)
        }
    },

}
</script>
