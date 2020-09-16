<template>
<div class="text-center">
    <v-dialog v-model="dialogBase" max-width="300">
        <v-card>
            <v-card-title class="headline grey lighten-2">
                Thông báo
            </v-card-title>

            <v-card-text>
                {{descriptionDialog}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="primary" text @click="$emit('cancel')">
                    Huỷ
                </v-btn>
                <v-btn outline color="primary" text @click="$emit('save')">
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
        dialogBase: {
            type: Boolean,
            default: false
        },
        descriptionDialog: {
            type: String,
            default: ''

        }
    }
}
</script>
