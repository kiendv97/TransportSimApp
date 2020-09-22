<template>
<div>
    <v-card color="#00B7C2" class="my-0">
        <Welcome />
        <Search />
        <Tabs />
    </v-card>
</div>
</template>

<script>
import Welcome from '@/components/Main/header/HeaderWelcome'
import Tabs from '@/components/Main/header/HeaderTabs'
import Search from '@/components/Main/header/HeaderSearch'
export default {
    components: {
        Welcome,
        Search,
        Tabs
    }
}
</script>
