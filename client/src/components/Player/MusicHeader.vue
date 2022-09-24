<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { computed } from 'vue';

const musicStore = useMusic();

const listOfArtists = computed(() => musicStore.currentMusic.metadata?.artists?.join(" / "));
const listOfGenres = computed(() => musicStore.currentMusic.metadata?.genre?.join(" / "));
</script>

<template>
    <div class="info-current-music">
        <div class="box-img">
            <img ref="img" :src="musicStore.currentMusic.metadata?.thumbnail">
        </div>

        <div class="infos">
            <h1>{{ musicStore.currentMusic.metadata?.title }}</h1>
            <p v-if="musicStore.currentMusic.metadata?.artists?.length">{{ listOfArtists }}</p>
            <p v-if="musicStore.currentMusic.metadata?.genre?.length">{{ listOfGenres }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-current-music {
    max-height: 130px;
    display: flex;
    gap: 2rem;

    .box-img {
        width: 200px;

        img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .infos {
        color: $first-color;
    }
}
</style>