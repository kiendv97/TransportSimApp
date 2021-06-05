<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-card class="ma-0">
            <v-toolbar color="cyan" dark>
                <v-btn icon />

                <v-toolbar-title>App Giao Sim</v-toolbar-title>

                <v-spacer />
                <v-avatar>
                    <img src="https://avatars0.githubusercontent.com/u/9064066?v=4" alt="avatar" @click="$router.push({name: &quot;Profile&quot;})">
                </v-avatar>
            </v-toolbar>
            <v-subheader>Xin chao {{ nameClient }}</v-subheader>
            <v-layout row wrap>
                <v-flex v-for="(item,index) in items" :key="index" xs6>
                    <v-card @click="directToMain(index)">
                        <v-container>
                            <CardComponent :name="item.text" :mount="item.mount" />
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import CardComponent from "@/components/Homepage/main_content.vue";
import axios from "axios";
import {
    countTractionTrader
} from '@/api/fetch.js';
export default {
    components: {
        CardComponent
    },
    data() {
        return {
            nameClient: "",
            items: [{
                    text: 'Chưa giao',
                    key: 'NOT_DELIVERED',
                    mount: 0
                },
                {
                    text: 'Đang giao',
                    key: 'SHIPPING',
                    mount: 0
                },
                {
                    text: 'Đã giao',
                    key: 'DELIVERED',
                    mount: 0
                },
                {
                    text: 'Thất bại',
                    key: 'FAIL',
                    mount: 0
                }
            ]
        };
    },
    async mounted() {
        let userLocal = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : false
        if (!userLocal) {
            this.$route.push('/login');
            return;
        }
        this.nameClient = userLocal.username;
        let result = await countTractionTrader();
        this.items = [...this.items].map(item => {
            item.mount = result[item.key];
            return item;
        });

    },
    methods: {
        directToMain(key) {
            this.$router.push({
                name: 'Main',
                params: {
                    id: key
                }
            });
        }
    },

};
</script>

<style>
.v-card>.container {
    box-sizing: border-box;
    height: 300px;
    margin: 5px;
}
</style>
