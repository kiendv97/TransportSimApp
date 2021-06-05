<template>
  <div>
    <div class="main-homepage">
      <div class="item" v-ripple="{ center: true }">
        <v-icon x-large color="blue">view_list</v-icon>
        <p>Trang chủ</p>
      </div>
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        <v-icon x-large color="blue">travel_explore</v-icon>
        <p>Tìm kiếm sim</p>
      </div>
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 2)">
        <v-icon x-large color="blue">assignment_ind</v-icon>
        <p>Giới thiệu</p>
      </div>
    </div>
    <div class="slice-carousel">
      <img width="100%" height="100px" src="@/assets/slider-ctv.gif" alt="">
    </div>
    <div class="title-filter"><v-icon small color="#c16353" dark>format_quote</v-icon>&nbsp;Sim theo mạng</div>
    <div class="sim-by-telco-homepage">
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        <img src="@/assets/viettel.png" width="55px" height="35px" />
      </div>
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        <img src="@/assets/vinaphone.png" width="55px" height="35px" />
      </div>
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        <img src="@/assets/vietnammobile.png" width="55px" height="35px" />
      </div>
      <div class="item" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        <img src="@/assets/itel_logo.png" width="55px" height="35px" />
      </div>
    </div>

    <div class="title-filter"><v-icon small color="#c16353" dark>format_quote</v-icon> &nbsp;Sim theo giá</div>
    <div class="sim-by-price-homepage">
      <v-card v-for="(item, index) in simByPrice" :key="index" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        {{ item.text }}
      </v-card>
    </div>
    <div class="title-filter"><v-icon small color="#c16353" dark>format_quote</v-icon> &nbsp;Sim theo dạng</div>
    <div class="sim-by-cate-homepage">
      <v-card v-for="(item, index) in simByCate" :key="index" v-ripple="{ center: true }" @click="$emit('change-tab', 1)">
        {{ item.text }}
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      caroselItems: [
        {
          src: "https://vip.simthanglong.vn/img/icons/slider-ctv.gif",
        },
        {
          src: "https://vip.simthanglong.vn/img/icons/slider-ctv.gif",
        }
      ],
      simByCate: [
        {
          text: "AB.AB.AB",
        },
        {
          text: "AB.AB.AC",
        },
        {
          text: "AB.AB.AA",
        },
        {
          text: "AC.AC.AB",
        },
        {
          text: "AA.AB.AB",
        },
        {
          text: "ABC.ABC",
        },
      ],
      simByPrice: [
        {
          text: "< 500k",
        },
        {
          text: "500 - 1triệu",
        },
        {
          text: "1 - 3triệu",
        },
        {
          text: "3 - 5triệu",
        },
        {
          text: "5 - 7triệu",
        },
        {
          text: "5 - 10triệu",
        },
      ],
    };
  },
};
</script>
<style lang="css">
.main-homepage .item {
  margin: 24px 0px;
  text-align: center;
}
.main-homepage {
  display: flex;
  justify-content: space-around;
}
.main-homepage p {
  font-weight: 600;
  font-size: 14px;
}
.sim-by-telco-homepage {
  display: flex;
  justify-content: space-around;
  overflow: scroll;
}
.sim-by-telco-homepage .item {
  margin: auto;
}
.sim-by-cate-homepage {
  display: grid;
  grid-template-columns: auto auto auto;
}
.sim-by-cate-homepage .v-card{
  text-align: center;
  padding: 12px;
  margin: 6px;
  font-weight: 400;
}
.sim-by-price-homepage {
  display: grid;
  grid-template-columns: auto auto auto;
}
.sim-by-price-homepage .v-card{
  text-align: center;
  padding: 12px;
  margin: 6px;
  font-weight: 400;
}
.title-filter {
  margin: 36px 6px 12px 6px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'emoji';
}
</style>
