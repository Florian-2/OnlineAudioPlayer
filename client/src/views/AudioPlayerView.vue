<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import MusicHeader from "@/components/Player/MusicHeader.vue";
import MusicList from "@/components/Player/MusicList.vue";
import ActionBar from "@/components/Player/ActionBar.vue";

const musicStore = useMusic();
</script>

<template>
    <template v-if="!musicStore.fetch.isLoading && musicStore.musics.length > 0">
        <div class="player">
            <MusicHeader/>

            <MusicList/>

            <ActionBar/>
        </div>
    </template>

    <p v-else-if="musicStore.musics.length <= 0 && musicStore.fetch.loaded">Vous n'avez pas de musique</p>

    <p v-else>Chargement...</p>
</template>

<style scoped>
.player {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>