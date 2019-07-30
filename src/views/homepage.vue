<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-btn icon></v-btn>

          <v-toolbar-title>App Giao Sim</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-avatar  >
           <img src="https://avatars0.githubusercontent.com/u/9064066?v=4" alt="avatar" />
           
          </v-avatar>
        </v-toolbar>
        <v-subheader>Xin chao dvKien</v-subheader>
        <v-layout row wrap>
          <v-flex v-for="item in items" xs6 >
            <v-card >
              <v-container>
                <CardComponent v-bind:name_status="item"/>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import CardComponent from "@/components/Homepage/main_content.vue";
import axios from "axios";

export default {
  components: {
    CardComponent
  },
  data() {
    return {
      items: ['NOT_DELIVERED','SHIPPING','DELIVERED','FAIL']
    }
  },
  
};
</script>
<style scored>
.v-card > .container {
  box-sizing: border-box;
  height: 300px;
  margin: 5px;
}
</style>
