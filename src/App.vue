<template>
  <div id="app">
    <main>
      <div v-if="!suspend">
        <router-view keep-alive />
      </div>
    </main>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/header'
// import Login from './views/login'
export default {
  name: "App",
  data() {
      return {
        suspend: false
      }
  },
  created() {
    if ( navigator.userAgent && !navigator.userAgent.toLowerCase().includes("appsim")  &&!this.$route.query.test) {
        this.suspend = true
    }
  },
};
</script>

<style>
#app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
}

li {
  padding: 5px 15px 5px 0;
}

li a {
  text-decoration: none;
  color: black;
}

li a:hover {
  color: #404040;
}
</style>
