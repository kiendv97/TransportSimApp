<template>
  <div>
    
    <vcl-bullet-list v-if="!Object.entries(item).length"></vcl-bullet-list>
    <v-card v-else
    min-height="100vh"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-btn
        icon
        @click="$router.go(-1)"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>Chi tiết</v-toolbar-title>

      <v-spacer />
    </v-toolbar>
    <v-layout
      class="mt-3 mb-3"
      column
    >
      <div
        class="text-center"
      >
        <p
          class="text-center mb-0"
          style="color: blue"
        >
          <strong class="display-1">{{ item.sold_product }}</strong>
        </p>
        <p class="text-center" style="text-align: center;">
          <small class="pa-auto">{{ dateTimeFormat(item.created_at) }}</small>
        </p>
      </div>
      <div>
        <v-btn
          small
          outline
          color="primary"
        >
          {{ showStatus(item.status) }}
        </v-btn>
      </div>
      <v-divider />
      <div style="width: 95%">
        <v-card color="blue lighten-5">
          <p class="text-md-center pt-1 ">
            Số tiền phải thu
          </p>
          <p
            class="text-center display-2 font-weight-bold"
            style="color: chocolate; text-align: center;"
          >
            {{ convertMoney(item.total_sell_price) }}
          </p>
        </v-card>
      </div>
      <v-divider />
      <div
        style="text-align: left; width: 100%;"
        class="ml-5"
      >
        <div class="inline inline-icon">
          <v-icon color="purple darken-2">
            home
          </v-icon>
          <span class="pt-1">{{ item.customer_profile.customer_name }}</span>
        </div>
        <div class="inline inline-icon">
          <v-icon color="darken-2">
            phone
          </v-icon>
          <span class="pt-1"><a  href="">{{ item.customer_profile.customer_phone }}</a></span>
        </div>
        <div class="inline inline-icon">
          <v-icon color="blue darken-2">
            info
          </v-icon>
          <span class="pt-1" style="width: 90%;">{{ item.customer_profile.customer_address }}</span>
        </div>
      </div>
      <v-divider />
      <div
        class="ml-5 mt-5"
        style="width: 100%;"
      >
        <div class="inline">
          <p>Giá bán:</p>
          <p class="ml-1">
            {{ convertMoney( item.total_sell_price) }}
          </p>
        </div>
        <div class="inline">
          <p>Người bán:</p>
          <p class="ml-1">
            {{ item.assignee_email }}
          </p>
        </div>
        <div class="inline">
          <p>Liên hệ:</p>
          <p class="ml-1">
            <a href="">{{ item.assignee_phone_number }}</a>
          </p>
        </div>
        <div
          class="inline"
          style="width: 95%;"
        >
          <p>Thuê bao: <small><i>{{ item.subscription_type_name }}</i></small></p>
        </div>
      </div>
      <v-divider />
      <div style="width: 90%;">
        <v-layout row>
          <v-flex
            grow
            pa-1
          >
            <v-textarea
              v-model="textComment"
              outlined
              height="10vh"
              label="Nhập comment"
            />
          </v-flex>
          <v-flex
            shrink
            pa-1
          >
            <v-btn
              outline
              class="text--darken-1"
              color="success"
              @click="comment"
            >
              Comment
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div class="ma-2" style="width: 100%;">
        <div
          v-for="comment in listComment"
          class="inline ma-2 "
        >
          ({{ dateTimeFormat(comment.date) }})
          {{ comment.username }}:
          {{ comment.content }}
        </div>
      </div>
      <v-divider />
      <div
        style="width: 90%;"
        class="d-flex justify-start"
      >
        <v-text-field
          v-model="seriNumber"
          :label="item.sim_series ? item.sim_series : 'Nhập seri sim'"
        />
        <v-btn
          outline
          color="success"
          @click="putSeriSimFunc"
        >
          Gửi
        </v-btn>
      </div>
      <div
        v-if="item.status == 'DELIVERED' || item.status == 'FAIL'"
        style="width: 90%;"
        class="mt-3"
      >
        <p class="text-lg-left">
          Ngày giao xong: {{ dateTimeFormat(item.finished_date) }}
        </p>
        <p class="text-lg-left">
          Số tiền thực nhận {{ convertMoney(item.total_receivable_price) }}
        </p>
        <v-textarea
          outlined
          name="input-7-4"
          width="100"
          :label="item.note ? item.note: 'Ghi chú'"
        />
      </div>
    </v-layout>
    <v-card-actions style="text-align: center; display: inherit;" class="text-center fixed-action"  v-if="item.status == 'SHIPPING' || item.status == 'NOT_DELIVERED'">
        <v-btn
          small
          @click.stop="changeStatusComponent(item,'APPROVE')"
        >
          <v-icon
            left
            color="green"
          >
            done
          </v-icon> {{ item.status == 'SHIPPING' ? 'Xong' : 'Nhận' }}
        </v-btn>
        <v-btn
          small
          tile
          outlined
          @click.stop="changeStatusComponent(item, 'REJECT')"
        >
          <v-icon
            left
            color="red"
          >
            delete_forever
          </v-icon> {{ item.status == 'SHIPPING' ? 'Thất bại' : 'Từ chối' }}
        </v-btn>
        <v-btn
          small
          tile
          outlined
          @click="orderConenct"
        >
          <v-icon
            left
            color="primary"
          >
          settings_input_antenna
          </v-icon> Đấu nối
        </v-btn>
      </v-card-actions>
    <DialogConnected v-if="dialogConnect" :order-code="item.order_code" :dialog="dialogConnect" :descriptionDialog="descriptionDialog" @cancel="dialogConnect = false"/>
    <ConfirmDialog v-if="dialog" :event="eventDialog" :data-emit="dataEmit" :status="item.status" :dialog="dialog" @confirm="onEventConfirm($event)" @cancel="dialog = false" />
    </v-card>
  </div>
  
</template>

<script>
import {  VclBulletList } from 'vue-content-loading';
import axios from "axios";
import {
    getComment,
    postComment,
    putSeriSim,
    changeStatus,
    getOrder
} from '@/api/fetch';
import ConfirmDialog from '@/components/Dialog/DialogConfirm'
import DialogConnected from '@/components/Dialog/DialogConnected'
export default {
    components: {
        ConfirmDialog,
        VclBulletList,
        DialogConnected,
    },
    data() {
        return {
            item: {},
            listComment: [],
            textComment: '',
            seriNumber: '',
            dataEmit: {},
            dialog: false,
            dialogConnect: false,
            descriptionDialog: '',
            eventDialog: ''
        };
    },
    async created() {
        let result = await getOrder(this.$route.query.id);
        this.item = result;
        this.listComment = await getComment(this.$route.query.id);
    },
    methods: {
        async onEventConfirm(e)  {
          try {
            let result = await changeStatus(e.package_item_id, e.note, e.status, e.receivePrice)
            this.$router.go()
          } catch (error) {
            if(error && error.response && error.response.data) {
              alert(error.response.data.message)
            }
          }
        },
        async changeStatusComponent(data, type) {
            this.dialog = true
            this.eventDialog = type
            this.dataEmit = {
                package_item_id: data.package_item_id,
            }
        },
        orderConenct() {
          this.descriptionDialog = 'Đấu nối đang được thực hiện!'
          this.dialogConnect = true
        },
        callPhone() {
            window.location.href = `tel:${this.item.customer_profile.customer_phone}`
        },
        showStatus(status) {
            switch (status) {
                case 'NOT_DELIVERED':
                    return 'Chưa giao';
                    break;

                case 'SHIPPING':
                    return 'Đang giao';
                    break;

                case 'DELIVERED':
                    return 'Đã giao';
                    break;

                case 'FAIL':
                    return 'Thất bại';
                    break;

                default:
                    break;
            }
        },
        async putSeriSimFunc() {
            try {
                let result = await putSeriSim(this.item.order_item_id, this.seriNumber);
                alert('Thay đổi seri thành công!');
            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert(error);
                }
            }
        },
        async comment() {
            try {
                let result = await postComment(this.item.package_item_id, this.textComment);
                this.textComment = ''
                this.listComment = await getComment(this.$route.query.id);
            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert(error);
                }
            }
        }
    },
};
</script>

<style scoped>
.inline {
    display: flex;
    text-align: start;
}
.fixed-action {
    position: fixed;
    bottom: -5px;    
    background-color: green;
    width: 90%;
}
</style>
