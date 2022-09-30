<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import MusicHeader from "@/components/Player/MusicHeader.vue";
import MusicList from "@/components/Player/MusicList.vue";
import ActionBar from "@/components/Player/ActionBar.vue";

const musicStore = useMusic();
</script>

<template>
    <div class="player" v-if="!musicStore.fetch.isLoading">
        <MusicHeader/>

        <MusicList/>

        <ActionBar/>
    </div>

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