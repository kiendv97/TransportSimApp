<template>
<div>
   
    <v-tabs centered v-model="tab">
        <v-tab v-for="itemTab in items" :key="itemTab.key">{{itemTab.text}}</v-tab>
    </v-tabs>
    <v-btn v-if="loading" class="d-block mx-auto my-5" :loading="loading" icon color="info">
        <v-icon light>cached</v-icon>
    </v-btn>
    <v-tabs-items v-if="listConnect.length" v-model="tab">
        <v-tab-item v-for="itemTab in items" :key="itemTab.key">
            <v-card class="mb-5" v-for="(item,index) in listConnect" :key="index" v-ripple="{center: true}">
                <v-divider></v-divider>
                <div class="ma-1 py-3 pl-2">
                    <div style="text-align:center" class="body-1">
                        <p class="blue--text">Số đấu nối: <strong>{{item.phone_register}}</strong></p>
                    </div>
                    <div v-if="item.message_connected_fail">
                        <p class="error--text">Lỗi: <strong>{{item.message_connected_fail}}</strong></p>
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
            </v-card>
        </v-tab-item>
    </v-tabs-items>
    <div>
        <p v-if="!loading && !listConnect.length" style="text-align: center;" class="mt-5 text-center font-weight-bold"><strong>Không có bản ghi</strong></p>
    </div>
</div>
</template>

<script>
import {
    getListConnect
} from "@/api/fetch"
export default {
    props: {
        search: {
            type: String,
            default: ''
        }
    },
    data() {
        let shipperId = JSON.parse(localStorage.getItem('user')).id
        return {
            tab: 1,
            shipperId: shipperId,
            loading: false,
            items: [
                {
                    text: 'Tất cả',
                    key: ''
                },
                {
                    text: 'Thành công',
                    key: 'SUCCESS'
                },
                {
                    text: 'Thất bại',
                    key: 'FAIL'
                }
            ],
            listConnect: []
        }
    },
    created() {
        this.getList(this.search)
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
        async getList(search) {
            try {
                this.listConnect = []
                this.loading = true
                let result = await getListConnect(this.items[this.tab].key, 1, search, this.shipperId)
                this.listConnect = result
                this.loading = false
            } catch (error) {
                alert(error)
                this.loading = false
            }
        }
    },
    watch: {
        async tab(value) {
            await this.getList(this.search)
        },
        async search(value) {
            await this.getList(value)
            console.log('value ', value)
        }
    },
}
</script>
