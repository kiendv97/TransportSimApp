<template>
  <v-layout wrap>
    <v-flex xs12 class="pa-0" v-if="nameStatus == 'CONNECT'">
      <ListConnect :search="search"/>
    </v-flex>
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
                <a @click.stop="callPhone(data.receiver_info.receiver_phone)">{{ data.receiver_info.receiver_phone }}</a> - {{ data.receiver_info.receiver_name }}
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
                <span><a @click.stop="callPhone(data.assignee_phone_number)">{{ data.assignee_phone_number }}</a></span>
              </v-flex>            
            </v-layout>
            <v-layout class="d-block text-center" column>
              <v-flex v-for="(cmt,index) in data.comments" :key="index">
                <p><strong>{{cmt.username}}: </strong> <span> {{cmt.content}}</span></p>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
        <v-card-actions v-if="nameStatus == 'SHIPPING' || nameStatus == 'NOT_DELIVERED'">
            <div style="text-align: center; width: 100%;">
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
                @click.stop="changeStatusComponent(data, index, 'REJECT')"
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
                @click.stop="callPhone(data.receiver_info.receiver_phone)"
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
        v-if="loading && !end && nameStatus != 'CONNECT'"
        color="success"
        :loading="loading"
        disabled
    />
    <strong style="text-align: center; display: inline-block; width: 100%;"  v-if="!loading && !datas.length && nameStatus != 'CONNECT'">Chưa có bản ghi</strong>
  </v-layout>
</template>s

<script>
import {listTransactionForApp , changeStatus, searchTransation} from '@/api/fetch'
import ConfirmDialog from '@/components/Dialog/DialogConfirm'
import ListConnect from '@/components/Main/ListConnect'
import {
    win32
} from 'path';
export default {
    name: "OrderComponent",
    components: {
        ConfirmDialog,
        ListConnect
    },
    props: {
        nameStatus: {
            type: String,
            default: ""
        },
        search: {
            type: String, 
            default: ''
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
            dataEmit: {},
            end: false
        };
    },
    watch: {
        nameStatus(val) {
          this.page = 1;
          this.datas = [];
          this.end = false
          if(val !== 'CONNECT') {
            this.getInitDatas();
          }
        },
        bottom: function (bottom) {
            if (this.bottom) {
                this.page = this.page + 1;
                this.addData(this.page);
                this.bottom = false;
            }
        }, 
        search: async function (e) {
          if(this.nameStatus != 'CONNECT') {
            this.datas = []
            this.loading = true
            this.end = false
            let result = await searchTransation(e, this.nameStatus)
            this.datas = result;
            this.loading = false
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
          try {
            let result = await changeStatus(e.package_item_id, e.note, e.status, e.receivePrice)
            this.datas.splice(e.index, 1);
          } catch (error) {
            if(error && error.response && error.response.data) {
              alert(error.response.data.message)
            }
          }
          
        },
        async changeStatusComponent(data, index, type) {
            this.dialog = true
            this.eventDialog = type
            this.dataEmit = {
                package_item_id: data.package_item_id,
                index: index
            }
        },
        callPhone(phone) {
            window.location.href = `tel:${phone}`;
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
                if (bottomOfWindow && !this.loading) {
                    this.bottom = true;
                }
            };
        },
        async addData(page) {
            try {
                this.loading = true
                let responses  = await listTransactionForApp(this.nameStatus, page, 20)
                if(responses.length) {
                  this.datas = [...this.datas, ...responses];
                } else {
                  this.end = true
                }
                this.loading = false
            } catch (error) {
                this.loading = false
                if(error && error.response && error.response.data) {
                  alert(error.response.data.message)
                } 
            }
        },
        async getInitDatas() {
            try {
                this.loading = true
                let responses 
                if(this.search && this.search.length) {
                     responses = await searchTransation(this.search, this.nameStatus)
                } else {
                     responses  = await listTransactionForApp(this.nameStatus, 1, 20)
                }
                this.datas = responses;
                this.loading = false
                
            } catch (error) {
              this.loading = false
              if(error && error.response && error.response.data) {
                alert(error.response.data.message)
              }
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
div.v-window.content > div > div > div {
  padding: 0px;
}
</style>
