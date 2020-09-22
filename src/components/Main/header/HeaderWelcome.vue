<template>
<div>
    <div style="height: 10vh;" class="d-flex pa-2">
        <v-avatar>
            <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor" @click="Profile()">
        </v-avatar>
        <p class="pt-3" style="color: white;">Xin chào <strong>{{nameUser}} !</strong></p>

    </div>
</div>
</template>

<script>
export default {
    data() {
        let nameUser = JSON.parse(localStorage.getItem('user')).full_name
        return {
            nameUser: nameUser
        }
    },
    methods: {
        Profile() {
            this.$router.push({
                name: "Profile"
            });
        }
    },
}
</script>
