<template>
<v-card min-height="100vh">
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
                <strong class="display-1">{{ item.items[0].sold_product }}</strong>
               
            </p>
            
            <p class="text-lg-left">
              <small>{{ item.created_at }}</small>
            </p>
          
        </div>
        <div style="width: 40%; float: right">
          <v-btn small color="primary">
            Giao xong
        </v-btn>
        </div>
        <v-divider />
        <div style="width: 95%">
            <v-card color="blue lighten-5">
                <p class="text-md-center pt-1 ">
                    Số tiền phải thu
                </p>
                <p class="text-center display-2 font-weight-bold" style="color: chocolate; text-align: center;">
                    {{ convertMoney(item.total_order_price) }}
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
                <span>{{ item.customer_profile.customer_province }}</span>
            </div>
          </div>
        <v-divider />
        <div class="ml-5 mt-5" style="width: 100%;">
            <div class="inline">
                <p>Giá bán:</p>
                <p class="title">
                    {{ item.items[0].sell_price }} đ
                </p>
            </div>
            <div class="inline">
                <p>Người bán:</p>
                <p class="title">
                    {{ item.assignee_email }}
                </p>
            </div>
            <div class="inline">
                <p>Liên hệ:</p>
                <p class="title">
                    <a href="">{{ item.items[0].sold_product }}</a>
                </p>
            </div>
            <div class="inline">
              <p>Thuê bao: <small><i>Trả trước (32234324 Trả góp anh Huy )</i></small></p>
            </div>
          </div>
        <v-divider />
        <div style="width: 90%;">
            <v-layout row>
                <v-flex grow pa-1>
                    <v-textarea outlined name="input-7-4" label="Nhập comment" />
                </v-flex>
                <v-flex shrink pa-1>
                    <v-btn color="success">
                        Comment
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>
        <div class="ma-2">
            <div class="inline">
                (15:41:11)
                Diệu ngu:
                tao ban nè
            </div>
            <div class="inline">
                (15:41:11)
                Hoc got:
                khach thanh toan luon tien sim 096564655
            </div>
        </div>
        <v-divider />
        <div style="width: 90%;" class="d-flex justify-start">
            <v-text-field type="number" label="Nhập seri sim" />
            <v-btn color="success">
              Gửi
          </v-btn>
        </div>
        <div style="width: 90%;" class="mt-3">
          <p class="text-lg-left">
            Ngày giao xong 04/07/2019 : 4:11:24 CH
        </p>
        <p class="text-lg-left">
            Số tiền thực nhận
        </p>-----
        <v-textarea outlined name="input-7-4" width="100" label="Ghi chú" />
        </div>
        
    </v-layout>
</v-card>
</v-flex>
</v-layout>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            item: {}
        };
    },
    async created() {
        let Response = await axios
            .get("https://banhang.topsim.vn/api/orders/orders/" + this.$route.params.id, {
                headers: {
                    "x-access-token": localStorage.access_token,
                    "Access-Control-Allow-Origin": "*"
                }
            })
        this.item = Response.data.response;

    }
};
</script>

<style scoped>
.inline{
  display: flex;
  text-align: start;
  
}
</style>
