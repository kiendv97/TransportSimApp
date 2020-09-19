<template>
<div>
    <v-layout>
        <v-flex>
            <p class="font-weight-bold caption my-1">Thông tin người nhận:</p>
        </v-flex>
    </v-layout>
    <v-layout class="my-2" v-if="customer" row>
        <v-flex xs1>
            <v-icon small>
                admin_panel_settings
            </v-icon>
        </v-flex>
        <v-flex xs11>
            <p class="mb-0"> {{ customer.receiver_name }} - <a @click.stop="callPhone(customer.receiver_phone)">{{ customer.receiver_phone }}</a></p>
        </v-flex>
    </v-layout>
    <v-layout class="mb-2" row>
        <v-flex xs1>
            <v-icon small>
                home
            </v-icon>
        </v-flex>
        <v-flex xs11>
            {{ customer.receiver_address }}
        </v-flex>
    </v-layout>
    <v-layout class="mb-2" row>
        <v-flex xs1>
            <v-icon small>
                phone
            </v-icon>
        </v-flex>
        <v-flex xs11>
            <p class="mb-0">{{ assignee.assignee_full_name }} - <a @click.stop="callPhone(assignee.assignee_phone_number)">{{ assignee.assignee_phone_number }}</a> </p>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
export default {
    props: {
        customer: {
            type: Object,
            default: {}
        },
        assignee: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {

        }
    },
    methods: {

        callPhone(phone) {
            window.location.href = `tel:${phone}`;
        },
    },
}
</script>
