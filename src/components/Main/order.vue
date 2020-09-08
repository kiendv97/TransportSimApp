<template>
  <v-layout wrap>
    <v-flex
      v-for="(data,index) in datas"
      :key="index"
      xs12
    >
      <v-card @click="detail(data.package_item_id)">
        <v-card-text>
          <div class="header-info">
            <v-container fluid>
              <v-layout row>
                <v-flex xs6>
                  <p class="text-xs-left headline font-weight-light">
                    {{ data.sold_product }}
                  </p>
                </v-flex>
                <v-flex
                  v-if="data.finished_date"
                  xs6
                >
                  <p class="text-xs-right font-weight-thin">
                    {{dateTimeFormat(data.finished_date) }}
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <div class="main-info">
            <v-layout row>
              <v-flex
                grow
                pa-1
              >
                <v-icon color="green darken-2">
                  money
                </v-icon>
              </v-flex>
              <v-flex
                shrink
                pa-1
              >
                Phải thu {{ convertMoney(data.total_receivable_price) }}
              </v-flex>
            </v-layout>
            <v-layout
              v-if="data.receiver_info"
              row
            >
              <v-flex
                grow
                pa-1
              >
                <v-icon color="red darken-2">
                  phone
                </v-icon>
              </v-flex>
              <v-flex
                shrink
                pa-1
              >
                <a href="">{{ data.receiver_info.receiver_phone }}</a> - {{ data.receiver_info.receiver_name }}
              </v-flex>
            </v-layout>
            <v-layout
              v-if="data.receiver_info"
              row
            >
              <v-flex
                grow
                pa-1
              >
                <v-icon color="purple darken-2">
                  home
                </v-icon>
              </v-flex>
              <v-flex
                shrink
                pa-1
              >
                {{ data.receiver_info.receiver_address }}
              </v-flex>
            </v-layout>Trả trước
            <v-layout row>
              <v-flex
                grow
                pa-1
              >
                <v-icon color="red darken-2">
                  phone
                </v-icon>
              </v-flex>
              <v-flex
                shrink
                pa-1
              >
                <strong>{{ data.assignee_full_name }}: </strong>
                <span><a href="">{{ data.assignee_phone_number }}</a></span>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions v-if="nameStatus == 'SHIPPING' || nameStatus == 'NOT_DELIVERED'">
            <div>
                <v-btn
                @click.stop="changeStatusComponent(data,index,'APPROVE')"
              >
                <v-icon
                  left
                  class="mr-0"
                  color="green"
                >
                  done
                </v-icon> {{ nameStatus == 'SHIPPING' ? 'Xong' : 'Nhận' }}
              </v-btn>
              <v-btn
                tile
                outlined
                @click.stop="changeStatusComponent(data,index, 'REJECT')"
              >
                <v-icon
                  left
                  class="mr-0"
                  color="red"
                >
                  delete_forever
                </v-icon> {{ nameStatus == 'SHIPPING' ? 'Thất bại' : 'Từ chối' }}
              </v-btn>
              <v-btn
                tile
                outlined
                @click.stop="callPhone(data)"
              >
                <v-icon
                  left
                  class="mr-0"
                  color="primary"
                >
                  call
                </v-icon> Gọi
              </v-btn>
            </div>
        </v-card-actions>
      </v-card>    
    </v-flex>
    <ConfirmDialog v-if="dialog" :event="eventDialog" :data-emit="dataEmit" :status="nameStatus" :dialog="dialog" @confirm="onEventConfirm($event)" @cancel="dialog = false" />
    <v-text-field
        style="text-align: center; display: inline-block; width: 100%;"
        v-if="loading"
        color="success"
        :loading="loading"
        disabled
    />
    <strong style="text-align: center; display: inline-block; width: 100%;"  v-if="!loading && !datas.length">Chưa có bản ghi</strong>
  </v-layout>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {listTransactionForApp , changeStatus} from '@/api/fetch'
import ConfirmDialog from '@/components/Dialog/Confirm'
import {
    win32
} from 'path';
export default {
    name: "OrderComponent",
    components: {
        ConfirmDialog
    },
    props: {
        nameStatus: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            datas: [],
            page: 1,
            bottom: false,
            loading: false,
            errorLoading: '',
            dialog: false,
            eventDialog: '',
            dataEmit: {}
        };
    },
    watch: {
        nameStatus(val) {
            this.page = 1;
            this.datas = [];
            this.getInitDatas();
        },
        bottom: function (bottom) {
            if (this.bottom) {
                this.page = this.page + 1;
                this.addData(this.page);
                this.bottom = false;
            }
        }
    },
    created() {
        this.getInitDatas();
    },
    mounted() {
        this.srollBottom();
    },
    methods: {
        async onEventConfirm(e)  {
            // let result = await changeStatus(e.package_item_id, e.note, e.status, e.receivePrice )
            this.datas.splice(e.index, 1);
            console.log(e);
        },
        async changeStatusComponent(data, index, type) {
            this.dialog = true
            this.eventDialog = type
            this.dataEmit = {
                package_item_id: data.package_item_id,
                index: index
            }
        },
        callPhone(data) {
            window.location.href = "tel:123123";
        },
        detail(val) {
            this.$router.push({
                name: 'Detail',
                query: {
                    id: val
                }
            });
        },
        srollBottom() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 1;
                if (bottomOfWindow) {
                    this.bottom = true;
                }
            };
        },
        async addData(page) {
            try {
                this.loading = true
                let responses  = await listTransactionForApp(this.nameStatus, page, 20)
                this.$emit('numberTotal', responses.length);
                this.datas = [...this.datas, ...responses];
                this.loading = false
            } catch (error) {
                this.loading = false
                this.errorLoading = error
            }
           
        },
        async getInitDatas() {
            try {
                this.loading = true
                let responses  = await listTransactionForApp(this.nameStatus, 1, 20)
                this.datas = responses;
                this.loading = false
            } catch (error) {
                this.loading = false
                this.errorLoading = error
            }
           
        }
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
