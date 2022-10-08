<script lang="ts" setup>
import DropZone from "../components/DropZone.vue";
</script>

<template>
    <div class="container-upload">
        <h1>Ajouter vos musiques</h1>

        <DropZone />
    </div>
</template>

<style scoped lang="scss">
.container-upload {
    min-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

    h1 {
        align-self: flex-start;
    }
}
</style>