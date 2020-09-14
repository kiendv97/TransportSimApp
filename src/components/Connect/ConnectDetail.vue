<template>
    <div v-if="Object.keys(item).length">
        <div>
            <p>Số đấu nối: <strong>{{item.phone_register}}</strong></p>
        </div>
        <div>
            <p>Seri sim: <strong>{{item.seri_sim}}</strong></p>
        </div>
        <div>
            <p>Tên khách: <strong>{{item.customer_full_name}}</strong></p>
        </div>
        <div>
            <p>Loại giấy tờ: <strong>{{ typeID(item.identification_type) }}</strong></p>
        </div>
        <div>
            <p>Loại giấy tờ: <strong>{{ item.identification_number }}</strong></p>
        </div>
        <div>
            <p>Ngày sinh: <strong>{{item.date_of_birth}}</strong></p>
        </div>
        <div>
            <p>Nơi cấp: <strong>{{item.address_provide}}</strong></p>
        </div>
        <div>
            <p>Ngày cấp: <strong>{{item.date_of_provide}}</strong></p>
        </div>
        <div>
            <p>Địa chỉ thường trú: <strong>{{item.address_identity}}</strong></p>
        </div>
        <div>
            <v-layout>
                <v-flex>
                    <v-img @click="openImage(item.image_front_end)" :src="item.image_front_end" contain aspect-ratio="1"></v-img>
                </v-flex>
                <v-flex>
                    <v-img @click="openImage(item.image_back_end)" :src="item.image_back_end" contain aspect-ratio="1"></v-img>
                </v-flex>
                <v-flex>
                    <v-img @click="openImage(item.image_portrait)" :src="item.image_portrait" contain aspect-ratio="1"></v-img>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>
<script>
import { getRequestConnect } from "@/api/fetch"
export default {
    props: {
        orderCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            item: {}
        }
    },
    async created() {
        await this.getRequest(this.orderCode)
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
        async getRequest(orderCode) {
            try {
                let result = await getRequestConnect(orderCode)
                this.item = result
            } catch (error) {
                alert(error)
            }
        }
    }
}
</script>