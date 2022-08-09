<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

defineProps<{
    isAuthenticated: boolean | null
}>();
const emit = defineEmits<{
    (e: 'logout'): void
}>();
</script>

<template>
    <header>
        <router-link to="home" class="logo">Audio Player</router-link>

        <nav>
            <template v-if="isAuthenticated">
                <router-link to="profil">Profil</router-link> /
                <router-link to="favorite">Favoris</router-link>
                <button @click="emit('logout')">Déconnexion</button>
            </template>

            <template v-else-if="isAuthenticated === false">
                <router-link to="login">login</router-link> /
                <router-link to="register">register</router-link>
            </template>
        </nav>
    </header>
</template>

<style scoped>
.logo {
    font-size: 2rem;
    font-weight: bold;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

a {
    color: black;
    font-size: 1.4rem;
}
</style>