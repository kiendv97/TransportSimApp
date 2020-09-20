<template>
<v-app>
    <v-layout row wrap>
        <v-flex class="fixed top-0 headermain" xs12 lg12 md12 sm12>
            <Header />
        </v-flex>
        <v-flex style="height:90vh;" xs12 lg12 md12 sm12>
            <ListItem />
        </v-flex>

    </v-layout>
</v-app>
</template>

<script>
import Header from "@/components/main/header/Index";
import ListItem from "@/components/main/items/Index";
import axios from "axios";
import moment from "moment";
import {
    searchTransation
} from '@/api/fetch'
export default {
    components: {
        ListItem,
        Header
    },
    data() {
        return {

        };
    },
    created() {

    },
    methods: {

    }

};
</script>

<style scoped>
.headermain {
    position: sticky;
    top: 0px;
    z-index: 2;
}
</style>
