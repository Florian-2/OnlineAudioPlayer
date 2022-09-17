<script lang="ts" setup>
import type { Music } from '@/shared/interfaces';

defineProps<{
    metadata: Music;
}>();
</script>

<template>
    <div class="info-current-music">
        <div class="box-img">
            <img ref="img" :src="metadata.thumbnail">
        </div>

        <div class="infos">
            <h1>{{ metadata.title }}</h1>
            <p v-if="metadata.artists?.length">{{ metadata.artists.join(" / ") }}</p>
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