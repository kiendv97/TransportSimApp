<template>
<div id="app">
    <main>
        <router-view keep-alive />
    </main>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Header from './components/header'
// import Login from './views/login'
export default {
    name: "App",
    data: () => ({
        authenticated: localStorage.authenticated
    }),
    mounted() {
        if (!this.authenticated) {
            this.$router.replace({
                name: 'Login'
            });
        }
    },
    methods: {

    }
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
