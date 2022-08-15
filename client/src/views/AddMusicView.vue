<script lang="ts" setup>
import DropZone from "../components/DropZone.vue";
// import { useMusic } from '@/stores/music';
// import { ref, watch } from 'vue';

// const musicStore = useMusic();
// const files = ref<FileList | null>(null);

// watch(files, () => {
//     console.log(files.value);
// })

// function handleChange(e: Event) {
//     const input = e.target as HTMLInputElement;
//     files.value = input.files;
// }

// async function handleSubmit() {
//     try {
//         await musicStore.addMusic(files.value!);
//     } 
//     catch (error) {
//         console.log(error);
//     }
// }
</script>

<template>
    <h1>Ajouter musiques</h1>

    <DropZone />
</template>