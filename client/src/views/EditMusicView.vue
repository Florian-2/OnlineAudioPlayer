<script lang="ts" setup>
import EditMusic from "../components/EditMusic.vue";


</script>

<template>
    <Suspense>
        <EditMusic/>

        <template #fallback>
            <h1>Chargement...</h1>
        </template>
    </Suspense>
</template>

<style scoped>

</style>