<script lang="ts" setup>
import type { Music } from '@/shared/interfaces';

const emit = defineEmits<{
    (e: "selectMusic", index: number): void
}>();

defineProps<{
    musics: Music[];
}>();
</script>

<template>
    <div class="table-musics">
        <div class="thead" role="rowgroup">
            <span role="columnheader">#</span>
            <span role="columnheader">Titre</span>
            <span role="columnheader">Artiste</span>
            <span role="columnheader">Album</span>
            <span role="columnheader">Durée</span>
        </div>

        <div class="tbody" role="rowgroup">
            <div class="row" role="row" v-for="(music, i) of musics" :key="music._id" @click="emit('selectMusic', i)">
                <span class="flex-row" role="cell">{{ i }}</span>
                <span class="flex-row" role="cell">{{ music.title }}</span>
                <span class="flex-row" role="cell">{{ music.artists?.join(" / ") }}</span>
                <span class="flex-row" role="cell">{{ music.album }}</span>
                <span class="flex-row" role="cell">{{ music.formatDuration }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table-musics {
    margin: 0 auto;
    width: 100%;
    overflow-y: auto;

    border: 1px solid transparent;
    border-radius: 4px;
    outline: 0;

    .thead, .row {
        display: grid;
        grid-template-columns: 30px 2fr 1fr 1fr 0.5fr;
    }

    span {
        color: $first-color;
    }

    .thead {
        padding-inline: 16px;
        background-color: rgba(255, 255, 255, 0.11);

        span {
            font-size: 1.6rem;
            font-weight: 500;
        }
    }

    .row {
        padding: 1.6rem;
        border-radius: $raduis;
        transition: background-color $transition-time;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, 0.086);
        }

        span {
            font-size: 1.4rem;
        }
    }
}
</style>