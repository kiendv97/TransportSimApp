<template>
<div v-if="Object.keys(item).length">
    <v-card class="pa-3" v-ripple="{center: true}">
        <div>
            <p>
                <v-icon small>phone</v-icon> Số đấu nối: <strong style="color: #0F4C75">{{item.phone_register}}</strong>
            </p>
        </div>
        <div v-if="item.message_connected_fail">
            <p class="error--text">Lỗi: <strong>{{item.message_connected_fail}}</strong></p>
        </div>
        <div>
            <p>
                <v-icon small>qr_code</v-icon> Seri sim: <strong>{{item.seri_sim}}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>face</v-icon> Tên khách: <strong>{{item.customer_full_name}}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>fingerprint</v-icon> Loại giấy tờ: <strong>{{ typeID(item.identification_type) }}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>sentiment_satisfied_alt</v-icon> Số CMND/CC: <strong>{{ item.identification_number }}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>cake</v-icon> Ngày sinh: <strong>{{item.date_of_birth}}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>home</v-icon> Nơi cấp: <strong>{{item.address_provide}}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>date_range</v-icon> Ngày cấp: <strong>{{item.date_of_provide}}</strong>
            </p>
        </div>
        <div>
            <p>
                <v-icon small>home</v-icon> Địa chỉ thường trú: <strong>{{item.address_identity}}</strong>
            </p>
        </div>
        <div>
            <p class="mb-0 text-xs-center"><small>Ảnh khách hàng</small></p>
        </div>
        <v-divider></v-divider>
        <div>
            <v-layout>
                <v-flex>
                    <v-img lazy @click="openImage(item.image_front_end)" :src="item.image_front_end" contain aspect-ratio="1"></v-img>
                </v-flex>
                <v-flex>
                    <v-img @click="openImage(item.image_back_end)" :src="item.image_back_end" contain aspect-ratio="1"></v-img>
                </v-flex>
                <v-flex>
                    <v-img @click="openImage(item.image_portrait)" :src="item.image_portrait" contain aspect-ratio="1"></v-img>
                </v-flex>
            </v-layout>
        </div>
    </v-card>
</div>
</template>

<script>
import {
    getRequestConnect
} from "@/api/fetch"
export default {
    props: {
        orderCode: {
            type: String,
            default: ''
        },
        item: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            // item: {}
        }
    },
    async created() {
        // await this.getRequest(this.orderCode)
    },
    methods: {
        openImage(link) {
            window.open(link)
        },
        typeID(idType) {
            switch (idType) {
                case 1:
                    return 'Chứng mình nhân dân'
                    break;
                case 2:
                    return 'Căn cước'
                    break;
                case 3:
                    return 'Hộ chiếu'
                    break;
                default:
                    return 'Không xác định'
                    break;
            }
        },

    }
}
</script>
