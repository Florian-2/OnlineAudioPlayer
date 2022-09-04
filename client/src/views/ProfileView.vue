<script setup lang="ts">
import { useUser } from '@/stores/user';

const userStore = useUser();
</script>

<template>
    <h1>Profil</h1>
    <pre>{{ userStore.currentUser }}</pre>
</template>

<style lang="scss" scoped>
pre {
    font-size: 1.5rem;
    color: white;
}
</style>