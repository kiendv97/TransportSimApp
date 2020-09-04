<template>
<v-card tile flat>
    <v-progress-linear background-color="green" />
    <div class="status">
        <div id="text" class="title">
            {{ statusObject.text }}
        </div>
        <div class="font-weight-medium display-2 mt-4">
            {{ mount }}
        </div>
    </div>
</v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {
    access
} from "fs";
export default {
    name: "CardComponent",
    props: {
        statusObject: {
            type: Object,
            default: {},
            require: true
        }
    },
    data() {
        return {
            mount: 0
        };
    },
    mounted() {
        var fromDate;
        var dateNow = new Date();
        if (dateNow.getMonth() > 6) {
            fromDate = moment([
                    dateNow.getFullYear(),
                    dateNow.getMonth(),
                    dateNow.getDate()
                ])
                .month(dateNow.getMonth() - 6)
                .format("YYYY-MM-DD");
        } else {
            fromDate = moment([
                    dateNow.getFullYear() - 1,
                    dateNow.getMonth(),
                    dateNow.getDate()
                ])
                .month(dateNow.getMonth() + 6)
                .format("YYYY-MM-DD");
        }
        axios
            .get(
                `https://banhang.topsim.vn/api/transaction-trader/packages?create_date_from=${fromDate}&create_date_to=${moment().format('YYYY-MM-DD')}&status=${this.$props.statusObject.key}`, {
                    headers: {
                        "x-access-token": localStorage.access_token,
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            )
            .then(responses => {
                console.log(responses);

                this.mount = responses.data.paging.total;
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.process-color {
    display: flex;
    justify-content: flex-start;
}

.status {
    margin-top: 50px;
}
</style>
