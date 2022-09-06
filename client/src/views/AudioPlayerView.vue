<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { onMounted, ref, watch } from 'vue';
import type { Music } from "@/shared/interfaces/index";


const musicStore = useMusic();
const audio = ref<HTMLAudioElement | null>(null);
const img = ref<HTMLImageElement | null>(null);

onMounted(() => musicStore.currentMusic.audio = audio.value);

watch(() => musicStore.currentMusic.index ,() => {
    if (audio.value && img.value) {
        audio.value.src = musicStore.currentMusic.metadata?.urlMusic || "";
        img.value.src = musicStore.currentMusic.metadata?.thumbnail || "";
    }
})

// musicStore.$onAction(({ name }) => {
//     console.log(name);
// })

function changeSong(indexSong: number) {
    musicStore.selectMusic(indexSong);
}
</script>

<template>
    <h1>Lecteur audio</h1>

    <template v-if="!musicStore.fetch.isLoading">
        <p>{{ musicStore.currentMusic?.metadata?.title }}</p>

        <audio 
            ref="audio" 
            :src="musicStore.currentMusic?.metadata?.urlMusic" 
            @ended="musicStore.handleChangeSong('next')" 
            controls
            muted
        >
        </audio>

        <img ref="img" :src="musicStore.currentMusic?.metadata?.thumbnail" width="200">

        <button @click="musicStore.play()">play</button>
        <button @click="musicStore.pause">pause</button>
        <button @click="musicStore.previous()">précédent</button>
        <button @click="musicStore.next()">suivant</button>

        <div class="musics">
            <p 
                v-for="(music, i) of musicStore.musics" :key="music._id"
                @click="changeSong(i)"
            >{{ i }} - {{ music.title }}</p>
        </div>
    </template>
    
    <p v-else>Chargement...</p>
</template>

<style scoped>
p {
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

img {
    border-radius: 5px;
}
</style>