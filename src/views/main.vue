<template>
  <v-app>
    <v-layout>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <div class="main_header">
          <div class="d-flex">
            <div class="Search">
              <v-text-field
                v-model="search"
                label="Tìm kiếm"
                @click:append="searchOrder()"
                flat
                append-icon="search"
                solo-inverted
                hide-details
                clear-icon="mdi-close-circle-outline"
              />
            </div>
            
            <div class="text-xs-center">
              <v-avatar>
                <img
                  src="https://randomuser.me/api/portraits/men/35.jpg"
                  alt="trevor"
                  @click="Profile()"
                >
              </v-avatar>
            </div>
          </div>
          <v-divider />
          <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="white"
          >
            <v-tab
              v-for="item in items"
              :key="item.id"
            >
              <v-icon small>
                {{ item.icon }}
              </v-icon>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-tab>
          </v-tabs>
        </div>
        <v-tabs-items class="content">
          <v-tab-item>
            <v-container>
              <OrderComponent
                :name-status="items[tab].status"
                @numberTotal="items[tab].total = $event"
              />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-app>
</template>


<script>
import OrderComponent from "@/components/Main/order.vue";
import axios from "axios";
import moment from "moment";
export default {
  components: {
    OrderComponent
  },
  data() {
    return {
      tab: 0,
      switch_val: 0,
      // status: ['NOT_DELIVERED','SHIPPING','DELIVERED','FAIL'],
      items: [
        {
          id: 0,
          title: "Chờ",
          icon: "dashboard",
          status: "NOT_DELIVERED",
          total: 0
        },
        {
          id: 1,
          title: "Đang",
          icon: "dashboard",
          status: "SHIPPING",
          total: 0
        },
        {
          id: 2,
          title: "Xong",
          icon: "dashboard",
          status: "DELIVERED",
          total: 0
        },
        {
          id: 3,
          title: "Thất bại",
          icon: "dashboard",
          status: "FAIL",
          total: 0
        }
      ],
      right: null,
      search: ""
    };
  },
  watch: {
    tab: function(val) {
      console.log('val');
    },
    item: function(val) {
      this.items[this.tab].total = val;
    }
  },
  methods: {
    switchS(id) {
      this.switch_val = id;
    },
    searchOrder() {
        console.log(this.search);
    },
    Profile() {
      this.$router.push({ name: "Profile" });
    }
  }

};
</script>

<style scoped>
#app {
  margin-top: 0px;
}
.main_header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff
}
.content {
  padding-top: 100px;
}
.v-window {
    min-height: 100vh;
}
.v-list__tile__action {
  display: flex;
  justify-content: center;
}
.Search {
  flex: 3;
}
.text-xs-center {
  flex: 1;
}

</style>