<template>
<div>
    <v-card class="order-card-status pa-2">
        <ProcessStatus v-if="nameStatus" :name-status="nameStatus" :finished-date="finishedDate" :total-receivable-price="totalReceivablePrice" />
        <ItemComments :comments="listComment" />
        <v-layout class="mt-2">
            <v-flex xs8>
                <v-text-field outline v-model="textComment" outlined height="10vh" label="Nhập comment">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn :loading="loadingSendComment" dark class="text--darken-1" color="#0F4C75" @click="comment">
                    Comment
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <p class="font-weight-bold caption my-1">Ghi chú: <i>{{note}}</i></p>
            </v-flex>
        </v-layout>

    </v-card>

</div>
</template>

<script>
import ItemComments from '@/components/main/items/ItemComments'
import ProcessStatus from '@/components/detail/ProcessStatus'
import {
    getComment,
    postComment,
    putSeriSim,
    changeStatus,
    getOrder
} from '@/api/fetch';
export default {
    components: {
        ItemComments,
        ProcessStatus
    },
    data() {
        return {
            listComment: [],
            textComment: '',
            loadingSendComment: false
        }
    },
    props: {
        nameStatus: {
            type: String,
            default: ''
        },
        note: {
            type: String,
            default: ''
        },
        totalReceivablePrice: {
            type: String,
            default: ''
        },
        finishedDate: {
            type: String,
            default: ''
        }
    },
    async created() {
        this.listComment = await getComment(this.$route.query.id);
    },
    methods: {
        async comment() {
            try {
                this.loadingSendComment = true
                let result = await postComment(this.item.package_item_id, this.textComment);
                this.textComment = ''
                this.listComment = await getComment(this.$route.query.id);
                this.loadingSendComment = false
            } catch (error) {
                this.loadingSendComment = false
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert(error);
                }
            }
        }
    },

}
</script>

<style scoped>
.order-card-status {
    width: 97%;
    border-radius: 17px;
    margin: 0 auto;
}
</style>
