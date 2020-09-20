<template>
<div>
    <v-layout>
        <v-flex>
            <p class="font-weight-bold caption my-1">Bình luận:</p>
        </v-flex>
    </v-layout>
    <v-layout column>
        <v-flex style="width: 100%; line-height: 20px" class="inline ma-2" v-for="(comment,index) in comments" :key="index">
            {{dateTimeFormat(comment.date)}} <strong> {{comment.username}}: </strong>
            <i>{{comment.content}}</i>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            default: []
        }
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>
