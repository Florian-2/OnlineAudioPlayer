<script lang="ts" setup>
import { useMusic } from '@/stores/music';

const musicStore = useMusic();
</script>

<template>
    <div class="info-current-music">
        <div class="box-img">
            <img ref="img" :src="musicStore.currentMusic.metadata?.thumbnail">
        </div>

        <div class="infos">
            <h1>{{ musicStore.currentMusic.metadata?.title }}</h1>
            <p v-if="musicStore.currentMusic.metadata?.artists?.length">{{ musicStore.currentMusic.metadata?.artists.join(" / ") }}</p>
            <p v-if="musicStore.currentMusic.metadata?.genre?.length">{{ musicStore.currentMusic.metadata?.genre.join(" / ") }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info-current-music {
    display: flex;
    gap: 2rem;

    .box-img {
        width: 200px;
        min-width: 150px;

        img {
            border-radius: 8px;
            width: 100%;
            object-fit: cover;
        }
    }

    .infos {
        color: $first-color;
    }
}
</style>