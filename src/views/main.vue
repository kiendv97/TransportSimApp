<template>
<v-app>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="main_header">
        <div class="Header">
          <div class="Search">
            <v-text-field
              v-model="search"
              label="Search Company Directory"
              flat
              solo-inverted
              hide-details
              clearable
              clear-icon="mdi-close-circle-outline"
            ></v-text-field>
          </div>
          <div class="text-xs-center">
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor" />
            </v-avatar>
          </div>
        </div>
        <v-divider></v-divider>
        <v-tabs fixed-tabs align-with-title  background-color="white" v-model="tab">
          <v-tab v-for="item in items" :key="item.id">
            <v-icon small>{{ item.icon }}</v-icon>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-tab>
        </v-tabs>
      </div>
      <v-tabs-items>
        <v-tab-item>
          <v-container>
            <OrderComponent :name_status="items[tab].status" />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
  </v-app>
</template>


<script>
import OrderComponent from "@/components/Main/order.vue";

export default {
  components: {
    OrderComponent
  },
  methods: {
    switchS(id) {
      this.switch_val = id;
    }
  },
  watch: {
    tab: function(val) {
      console.log(val);
    }
  },
  data() {
    return {
      tab: 0,
      switch_val: 0,
      // status: ['NOT_DELIVERED','SHIPPING','DELIVERED','FAIL'],
      items: [
        {
          id: 0,
          title: "Chờ giao",
          icon: "dashboard",
          status: "NOT_DELIVERED"
        },
        { id: 1, title: "Đang giao", icon: "dashboard", status: "SHIPPING" },
        { id: 2, title: "Giao xong", icon: "dashboard", status: "DELIVERED" },
        { id: 3, title: "Thất bại", icon: "dashboard", status: "FAIL" }
      ],
      right: null,
      search: ""
    };
  }
};
</script>

<style scored>
.content {
  margin-top: 30px;
}
.v-list__tile__action {
  display: flex;
  justify-content: center;
}
.Header {
  display: flex;
}
.Search {
  flex: 3;
}
.text-xs-center {
  flex: 1;
}
</style>