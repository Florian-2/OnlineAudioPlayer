<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { computed, onMounted, ref, watch } from 'vue';
import type { Music } from "@/shared/interfaces/index";


const musicStore = useMusic();
const audio = ref<HTMLAudioElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
// const currentTime = ref<number>(0);
// const totalDuration = ref<number>(0);

onMounted(() => musicStore.currentMusic.audio = audio.value);

watch(() => musicStore.currentMusic.index ,() => {
    if (audio.value && img.value) {
        audio.value.src = musicStore.currentMusic.metadata?.urlMusic || "";
        img.value.src = musicStore.currentMusic.metadata?.thumbnail || "";
    }
})

// function timeFormat(time: number) {    
//     return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
// }

// function duration(e: Event) {
//     console.log(e);

//     currentTime.value = audio.value?.currentTime!;
//     totalDuration.value = audio.value?.duration!;    

//     return `${timeFormat(currentTime.value)}:${totalDuration.value}`;
// }


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
            @timeupdate="musicStore.timeUpdate"
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

        <p>{{ musicStore.time }}</p>

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
p, span {
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

img {
    border-radius: 5px;
}
</style>