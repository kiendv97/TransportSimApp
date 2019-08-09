<template>
  <v-app>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card min-height="600">
            <v-toolbar color="cyan" dark>
              <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
              </v-btn>

              <v-toolbar-title>Chi tiết</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-layout column>
              <v-flex>
                <p class="display-1 text-lg-left font-weight-medium">{{item.items[0].sold_product}}</p>
                <p class="text-lg-left">{{item.created_at}}</p>
                <v-btn large color="primary">Giao xong</v-btn>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <v-card color="blue lighten-5">
                  <p class="text-md-center">Số tiền phải thu</p>
                  <p class="text-md-center display-3 font-weight-bold">{{parseFloat(item.total_order_price.toString().replace('.','')).toFixed(0)}}</p>VND
                </v-card>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <div class="inline inline-icon">
                  <v-icon color="purple darken-2">home</v-icon>
                  <p>{{item.customer_profile.customer_name}}</p>
                </div>
                <div class="inline inline-icon">
                  <v-icon color="red darken-2">phone</v-icon>
                  <p><a href="">{{item.customer_profile.customer_phone}}</a></p>
                </div>
                <div class="inline inline-icon">
                  <v-icon color="blue darken-2">info</v-icon>
                  <p>{{item.customer_profile.customer_province}}</p>
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <div class="inline">
                  <p>Giá bán:</p>
                  <p class="title">{{item.items[0].sell_price}} đ</p>
                </div>
                <div class="inline">
                  <p>Người bán:</p>
                  <p class="title">{{item.assignee_email}}</p>
                </div>
                <div class="inline">
                  <p>Liên hệ:</p>
                  <p class="title"><a href="">{{item.items[0].sold_product}}</a></p>
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <div class="text-md-left">
                  <p>Thuê bao:</p>
                  <p>Trả trước (32234324 Trả góp anh Huy )</p>
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <v-layout row>
                  <v-flex grow pa-1>
                    <v-textarea outlined name="input-7-4" label="Nhập comment đơn hàng"></v-textarea>
                  </v-flex>
                  <v-flex shrink pa-1>
                    <v-btn color="success">Comment</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <div class="inline" style="display: flex">
                 (15:41:11)

                  Diệu ngu:
                 tao ban nè
                </div>
                <div class="inline" >
                 (15:41:11)
                Hoc got:
                 khach thanh toan luon tien sim 096564655
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <v-text-field label="Series Sim"></v-text-field>
              </v-flex>
              <p class="text-lg-left">Ngày giao xong 04/07/2019 : 4:11:24 CH</p>
              <p class="text-lg-left">Số tiền thực nhận</p>-----
              <v-textarea outlined name="input-7-4" width="100" label="Ghi chú"></v-textarea>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
  </v-app>
</template>
<style scoped>
.font-weight-bold{
  color:palevioletred;
}
.v-card {
    margin: 0 5px;
}
 .inline-icon > p {
     margin: auto 0;
 }
 .inline-icon {
     height:40px;
 }
.inline{
  display: flex;
  text-align: start;
  
}
</style>
<script>
import axios from "axios";

export default {
  data() {
   return {
       item: {}
   } 
  },
  mounted() {
    axios
      .get("http://beta4.topsim.vn/api/orders/orders/" + this.$route.params.id, {
        headers: {
          "x-access-token": localStorage.access_token,
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(Response => {
        console.log(Response.data.response);
        
        this.item = Response.data.response;
      });
  }
};
</script>

