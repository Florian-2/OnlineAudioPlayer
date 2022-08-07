<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import { useUser } from './stores/user';

const userStore = useUser();
const router = useRouter();

async function logout() {
    await userStore.logout();
    router.push('/login');
}
</script>

<template>
	<TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout"/>

	<RouterView />
</template>