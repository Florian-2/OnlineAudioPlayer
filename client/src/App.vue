<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import { useUser } from './stores/user';

const userStore = useUser();
const router = useRouter();

async function logout() {
    try {
        await userStore.logout();
        router.push('/login');
    } 
    catch (error) {
        router.push("/login");
    }
}

window.addEventListener("drop", (e) => e.preventDefault());
window.addEventListener("dragover", (e) => e.preventDefault());
</script>

<template>
    <div :class="{ 'grid-layout': userStore.isAuthenticated }">
        <TheHeader v-if="userStore.isAuthenticated" :isAuthenticated="userStore.isAuthenticated" @logout="logout" />

        <main>
            <Suspense>
                <RouterView />
                
                <template #fallback>
                    <h1>Chargement...</h1>
                </template>
            </Suspense>
        </main>
    </div>
</template>

<style lang="scss">
h1 {
    font-size: 2rem;
    color: white;
}

.grid-layout {
    height: 100%;
    display: grid;
    grid-template-columns: 200px 1fr;
}

main {
    padding: 2rem;
}
</style>