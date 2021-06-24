<template>
  <div class="single-item-fake">
      <div class="telco_n_sim">
        <div class="sim" v-html="sim.sim_highlight"></div>
        <p class="telco">{{convertTelco(sim.telco)}}</p>
      </div>
      <div class="price_n_type">
        <p class="price">{{convertMoney(sim.price_sale).replace(/\sVND|\sđ|\s₫/, '')}}<span class="caption font-weight-bold">đ</span></p>
        <p class="type">{{convertType(sim.sim_type)}}</p>
      </div>
  </div>
</template>
<script>
import TELCO from '@/enums/telco'
export default {
  name: "ItemFake",
  props: {
    sim: {
      type: [Object],
      required: true,
      default: {}
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    convertTelco(telcoId) {
      return TELCO[`${telcoId}`] || 'undefined'
    },
    convertType(type) {
      switch (type) {
        case 1:
          return 'Trả trước'
       case 2: 
          return 'Trả sau'
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="css">

 .telco_n_sim font {
      color: #ff7a00;
  }
  .single-item-fake {
    display: flex;
    padding: 12px;
    font-family: 'system-ui';
  }
  .telco_n_sim .sim {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    word-spacing: 0ch;
    margin-bottom: 8px;
  }
  .telco_n_sim .telco {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 0px;
  }
  .telco_n_sim {
    flex: 2;
    text-align: left;
  }
  .price_n_type .price {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    word-spacing: 0ch;
    margin-bottom: 8px;
  }
  .price_n_type .type {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 0px;
  }
  .price_n_type {
    flex: 1;
    text-align: right;
  }
</style>