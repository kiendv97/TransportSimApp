<template>
  <v-layout wrap>
    <v-flex v-for="data in datas" :key="data.id" xs12>
      <v-card @click="detail(data.id)">
        <v-card-text>
          <div class="header-info">
            <v-container fluid>
              <v-layout row>
                <v-flex xs6>
                  <p class="text-xs-left headline font-weight-light">{{data.name.split(' ').slice(1, -1).toString()}}</p>
                </v-flex>
                <v-flex xs6 v-if="data.finished_date">
                  <p class="text-xs-right font-weight-thin">{{new Date(data.finished_date).getHours()}}:{{new Date(data.finished_date).getMinutes()}}  {{new Date(data.finished_date).getDate()}}-{{new Date(data.finished_date).getMonth()}}-{{new Date(data.finished_date).getFullYear()}}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <div class="main-info">
            <v-layout row>
              <v-flex grow pa-1>
                <v-icon color="green darken-2">money</v-icon>
              </v-flex>
              <v-flex shrink pa-1>Phải thu {{data.orders[0].total_receivable_price}}</v-flex>
            </v-layout>
            <v-layout v-if="data.orders[0].receiver_info" row>
              <v-flex grow pa-1>
                <v-icon color="red darken-2">phone</v-icon>
              </v-flex>
              <v-flex
                shrink
                pa-1
              ><a href="">{{data.orders[0].receiver_info.receiver_phone}}</a> - {{data.orders[0].receiver_info.receiver_name}}</v-flex>
            </v-layout>
            <v-layout v-if="data.orders[0].receiver_info" row>
              <v-flex grow pa-1>
                <v-icon color="purple darken-2">home</v-icon>
              </v-flex>
              <v-flex shrink pa-1>{{ data.orders[0].receiver_info.receiver_address}}</v-flex>
            </v-layout>Trả trước
            <v-layout row>
              <v-flex grow pa-1>
                <v-icon color="red darken-2">phone</v-icon>
              </v-flex>
              <v-flex shrink pa-1>
                <strong>htadmin:</strong>
                <span><a href="">{{data.orders[0].assignee_phone_number}}</a></span>
              </v-flex>
            </v-layout>

         
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
 
      <v-text-field color="success" loading disabled></v-text-field>
  
   
  </v-layout>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { win32 } from 'path';
// can use relative time moment js 

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
export default {
  name: "OrderComponent",
  props: ["name_status"],
  data() {
    return {
      datas: [],
      page: 1,
      bottom: false
    };
  },
  watch: {
    name_status(val) {
      this.page = 1;
      this.datas = [];
      this.addData(this.page);
    },
    bottom: function(bottom) {
      if (this.bottom) {
        this.page = this.page + 1;
        this.addData(this.page);
        this.bottom = false;
      }
    }
  },
  methods: {
    detail(val){
      console.log(val);
      
      this.$router.push({name: 'detail', params: {id: val}});
      
    },
    srollBottom() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight -1;

         
         
        console.log(bottomOfWindow);

        if (bottomOfWindow) {
          this.bottom = true;
        }
      };
    },
    addData(page) {
      axios
        .get(
          `http://beta4.topsim.vn/api/transaction-trader/packages?page=${page}&create_date_from=${fromDate}&create_date_to=${moment().format(
            "YYYY-MM-DD"
          )}&status=${this.$props.name_status}`,
          {
            headers: {
              "x-access-token": localStorage.access_token,
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(responses => {
          console.log(responses);
          this.$emit('numberTotal',responses.data.paging.total)
          this.datas = [...this.datas, ...responses.data.response];
        });
    },
    getInitDatas() {
      axios
        .get(
          `http://beta4.topsim.vn/api/transaction-trader/packages?create_date_from=${fromDate}&create_date_to=${moment().format(
            "YYYY-MM-DD"
          )}&status=${this.$props.name_status}`,
          {
            headers: {
              "x-access-token": localStorage.access_token,
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(responses => {
          console.log(responses);
          this.datas = responses.data.response;
        });
    }
  },
  beforeMount() {
    this.getInitDatas();
  },
  mounted() {
    this.srollBottom();
  }
};
</script>
<style>
.main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.v-card {
  margin: 5px 0px;
}
</style>

