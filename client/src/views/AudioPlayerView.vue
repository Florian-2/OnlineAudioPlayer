<script lang="ts" setup>
import { useMusic } from '@/stores/music';

const musicStore = useMusic();
// musicStore.fetchMusics();
</script>

<template>
    <h1>Lecteur audio</h1>

    <p v-for="music of musicStore.musics">{{ music.title }}</p>
</template>