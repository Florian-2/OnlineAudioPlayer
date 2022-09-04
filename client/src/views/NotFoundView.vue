<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';

const router = useRouter();
const sec = ref<number>(5);

setInterval(() => {
    sec.value--;
}, 1000);

watch(sec, () => {
    if (sec.value <= 0) {
        router.back();
    }
})
</script>

<template>
    <h1>Page introuvable (404)</h1>
    
    <p>Redirection dans {{ sec || 'redirection...' }}</p>
    <Button btnType="primary" @click="router.back()">Retour</Button>
</template>

<style lang="scss" scoped>
p {
    font-size: 1.5rem;
    color: $first-color;
}
</style>