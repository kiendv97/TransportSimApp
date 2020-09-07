<template>
<v-card v-if="Object.entries(item).length > 0" min-height="100vh">
    <v-toolbar color="cyan" dark>
        <v-btn icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title>Chi tiết</v-toolbar-title>

        <v-spacer />
    </v-toolbar>
    <v-layout class="mt-3" column>
        <div style="width: 50%; float: left" class="text-left">
            <p class="text-left mb-0" style="color: blue">
                <strong class="display-1">{{ item.sold_product }}</strong>
               
            </p>
            
            <p class="text-lg-left">
              <small>{{ item.created_at }}</small>
            </p>
          
        </div>
        <div style="width: 40%; float: right">
          <v-btn small class="primary--text">
            {{showStatus(item.status)}}
        </v-btn>
        </div>
        <v-divider />
        <div style="width: 95%">
            <v-card color="blue lighten-5">
                <p class="text-md-center pt-1 ">
                    Số tiền phải thu
                </p>
                <p class="text-center display-2 font-weight-bold" style="color: chocolate; text-align: center;">
                    {{ convertMoney(item.total_sell_price) }}
                </p>
            </v-card>
          </div>
        <v-divider />
        <div style="text-align: left; width: 100%;" class="ml-5">
            <div class="inline inline-icon">
                <v-icon color="purple darken-2">
                    home
                </v-icon>
                <span>{{ item.customer_profile.customer_name }}</span>
            </div>
            <div class="inline inline-icon">
                <v-icon color="red darken-2">
                    phone
                </v-icon>
                <span><a href="">{{ item.customer_profile.customer_phone }}</a></span>
            </div>
            <div class="inline inline-icon">
                <v-icon color="blue darken-2">
                    info
                </v-icon>
                <span>{{ item.customer_profile.customer_address }}</span>
            </div>
          </div>
        <v-divider />
        <div class="ml-5 mt-5" style="width: 100%;">
            <div class="inline">
                <p>Giá bán:</p>
                <p class="ml-1">
                    {{ convertMoney( item.total_sell_price) }}
                </p>
            </div>
            <div class="inline">
                <p>Người bán:</p>
                <p class="ml-1">
                    {{ item.assignee_full_name }}
                </p>
            </div>
            <div class="inline">
                <p>Liên hệ:</p>
                <p class="ml-1">
                    <a href="">{{ item.assignee_phone_number }}</a>
                </p>
            </div>
            <div class="inline">
              <p>Thuê bao: <small><i>{{item.subscription_type_name}}</i></small></p>
            </div>
          </div>
        <v-divider />
        <div style="width: 90%;">
            <v-layout row>
                <v-flex grow pa-1>
                    <v-textarea outlined label="Nhập comment" v-model="textComment" />
                </v-flex>
                <v-flex shrink pa-1>
                    <v-btn @click="comment" class="text--darken-1 red--text"  color="success">
                        Comment
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>
        <div class="ma-2">
            <div class="inline ma-2 " v-for="comment in listComment">
                ({{dateTimeFormat(comment.date)}})
                {{comment.username}}: 
                {{comment.content}}
            </div>
        </div>
        <v-divider />
        <div style="width: 90%;" class="d-flex justify-start">
            <v-text-field v-model="seriNumber" type="number" label="Nhập seri sim" />
            <v-btn @click="putSeriSim" class="red--text" color="success">
              Gửi
          </v-btn>
        </div>
        <div style="width: 90%;" class="mt-3">
          <p class="text-lg-left">
            Ngày giao xong: {{item.finished_date}}
        </p>
        <p class="text-lg-left">
            Số tiền thực nhận {{total_receivable_price}}
        </p>
        <v-textarea outlined name="input-7-4" width="100" :label="item.note" :disabled />
        </div>
        
    </v-layout>
</v-card>
</v-flex>
</v-layout>
</template>

<script>
import axios from "axios";
import { getComment, postComment, putSeriSim, changeStatus, getOrder } from '@/api/fetch'
export default {
    data() {
      let idUser = localStorage.getItem('user')
        return {
            idUser: idUser,
            item: {},
            listComment: [],
            textComment: '',
            seriNumber: ''
        };
    },
    async created() {
        let result = await getOrder(this.$route.query.id)
        this.item = result
        this.listComment = await getComment(this.$route.query.id)
    },
    methods: {
      showStatus(status) {
        switch (status) {
          case 'NOT_DELIVERED':
            return 'Chưa giao'
            break;
        
          case 'SHIPPING':
            return 'Đang giao'
            break;
        
          case 'DELIVERED':
            return 'Đã giao'
            break;
        
          case 'FAIL':
            return 'Thất bại'
            break;
        
          default:
            break;
        }
      },
      async putSeriSim() {
        try {
          let result = await putSeriSim(this.item.id, this.seriNumber)
          alert(result.message)
        } catch (error) {
          if(error &&  error.response && error.response.data.message) {
            alert(error.response.data.message)
          } else {
            alert(error)
          }
        }
      },
      async comment() {
        try {
          let result = await postComment(this.idUser, this.textComment)
          alert(result.message)
          this.listComment = await getComment(this.$route.query.id)
        } catch (error) {
          if(error &&  error.response && error.response.data.message) {
            alert(error.response.data.message)
          } else {
            alert(error)
          }
        }
      }
    },

};
</script>

<style scoped>
.inline{
  display: flex;
  text-align: start;
  
}
</style>
