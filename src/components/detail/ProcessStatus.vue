<template>
<div class="d-block ma-2">
    <div v-for="i in statusName.length" :key="i">
        <div>
            <v-icon small left :color="nameStatus == 'FAIL' &&  i == 3? 'red': '#FE805C'" >
                fiber_manual_record
            </v-icon>
            {{ statusName[i-1]}} <i v-if="i == 3">{{ finishedDate ? `(${dateTimeFormat(finishedDate)})`: ''}}</i>
        </div>
      <div v-if="i < statusName.length">
        <v-icon small left color="#FE805C">
            south
        </v-icon>
      </div>
      
    </div>
    
</div>
</template>

<script>
export default {
    props: {
        finishedDate: {
            type: String,
            default: ''
        },
        nameStatus: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            lengthDot: 1,
            statusName: [],
        }
    },
    created() {
        switch (this.nameStatus) {
            case 'NOT_DELIVERED':
                this.lengthDot = 1
                this.statusName = ['Chờ giao']
                break;
            case 'SHIPPING':
                this.lengthDot = 2
                this.statusName = ['Chờ giao', 'Đang giao']
                break;
            case 'DELIVERED':
                this.lengthDot = 3,
                this.statusName = ['Chờ giao', 'Đang giao', 'Giao xong']
                break;
            case 'FAIL':
                this.lengthDot = 3,
                this.statusName = ['Chờ giao', 'Đang giao',  'Thất bại']
                break;
            default:
                break;
        }
        console.log(this.nameStatus);
    },
}
</script>
