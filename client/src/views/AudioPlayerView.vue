<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import MusicHeader from "../components/Player/MusicHeader.vue";
import MusicList from "../components/Player/MusicList.vue";
import ActionBar from "../components/Player/ActionBar.vue";

const musicStore = useMusic();
</script>

<template>
    <template v-if="(!musicStore.fetch.isLoading || musicStore.musics.length > 0) && musicStore.currentMusic.metadata">
        <div class="player">
            <MusicHeader/>

            <MusicList />

            <ActionBar />
        </div>
    </template>


    <!-- <template v-if="!musicStore.fetch.isLoading || musicStore.musics.length > 0">
        <p>{{ musicStore.currentMusic?.metadata?.title }}</p>

        <audio 
            ref="audio" 
            :src="musicStore.currentMusic?.metadata?.urlMusic" 
            @loadedmetadata="musicStore.setDuration"
            @timeupdate="musicStore.setCurrentTime"
            @ended="musicStore.handleChangeSong('next')" 
            controls
        >
        </audio>

        <img ref="img" :src="musicStore.currentMusic?.metadata?.thumbnail" width="200">

        <button @click="musicStore.play">play</button>
        <button @click="musicStore.pause">pause</button>
        <button @click="musicStore.previous">précédent</button>
        <button @click="musicStore.next">suivant</button>

        <div ref="progressBar" class="progress-container" @click="mySetProgress">
            <div 
                class="progress-bar" 
                :style="{ 'transform':  `scaleX(${musicStore.currentMusic.progress})`}"
            ></div>
        </div>

        <p>{{ musicStore.currentTime }} - {{ musicStore.currentMusic.metadata?.formatDuration }}</p>

        <div class="musics">
            <p v-for="(music, i) of musicStore.musics" :key="music._id" @click="musicStore.selectMusic(i)">{{ i }} - {{ music.title }} - {{ music.formatDuration }}</p>
        </div>

        <button @click="musicStore.shuffleMusic">Aléatoire</button>
    </template>
    
    <p v-else>Chargement...</p> -->
</template>

<style scoped>
.player {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* .progress-container {
    margin-block: 3rem;
    background-color: #727377;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
}

.progress-bar {
    height: 5px;
    width: 100%;
    border-radius: 5px;
    background: #4a8ea3;
    transform-origin: left;
    transform: scaleX(0);
    background: linear-gradient(99deg, #4a8ea3, #6dd6ef 100%);
} */
</style>