<template>
<div>
    <v-card class="order-card-status pa-3">
        <ProcessStatus v-if="nameStatus" :name-status="nameStatus" :finished-date="finishedDate" :total-receivable-price="totalReceivablePrice" />
        <ItemComments v-if="!loadingComment" :comments="listComment" />
        <div v-else>
            <vcl-list></vcl-list>
        </div>
        <v-layout class="mt-2">
            <v-flex xs8>
                <v-text-field outline v-model="textComment" solo height="10vh">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn :loading="loadingSendComment" dark class="text--darken-1 mt-0" color="#0F4C75" @click="comment">
                    Bình luận
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
import ItemComments from '@/components/Main/items/ItemComments'
import ProcessStatus from '@/components/detail/ProcessStatus'
import {
    VclList
} from 'vue-content-loading';
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
        ProcessStatus,
        VclList
    },
    data() {
        let username = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')).username : ""
        return {
            listComment: [],
            username: username,
            textComment: '',
            loadingSendComment: false,
            loadingComment: false
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
        },
        orderId: {
            type: Number,
            default: ''
        }
    },
    async mounted() {
        this.loadingComment = true
        this.listComment = await getComment(this.orderId);
        this.listComment.reverse()
        this.loadingComment = false
    },
    methods: {
        async comment() {
            try {
                let localCommentPush = {
                    date: new Date(),
                    username: this.username,
                    content: this.textComment
                }
                this.loadingSendComment = true
                this.listComment.push(localCommentPush)
                let result = await postComment(this.orderId, this.textComment);
                this.textComment = ''
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
    width: 100%;
    border-radius: 10px;
    margin: 0 auto;
}
</style>
