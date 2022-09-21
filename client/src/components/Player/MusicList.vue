<script lang="ts" setup>
import { useMusic } from '@/stores/music';

const musicStore = useMusic();
</script>

<template>
    <div class="table-musics">
        <div class="thead" role="rowheader">
            <span role="columnheader">#</span>
            <span role="columnheader">Titre</span>
            <span role="columnheader">Artiste</span>
            <span role="columnheader">Album</span>
            <span role="columnheader">Durée</span>
        </div>

        <div class="tbody" role="rowgroup">
            <div :class="['row', { 'active': music._id === musicStore.currentMusic.metadata?._id } ]" role="row" v-for="(music, i) of musicStore.musics" :key="music._id" @click="musicStore.selectMusic(i)">
                <span class="flex-row" role="cell">{{ i + 1 }}</span>
                <span class="flex-row" role="cell">{{ music.title }}</span>
                <span class="flex-row" role="cell">{{ music.artists?.join("/") }}</span>
                <span class="flex-row" role="cell">{{ music.album }}</span>
                <span class="flex-row" role="cell">{{ music.formatDuration }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table-musics {
    width: 100%;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 0.5rem;

    .thead, .row {
        display: grid;
        grid-template-columns: 30px 2fr 1fr 1fr 70px;
        column-gap: 1rem;
    }

    .thead {
        position: sticky;
        top: 0;
        left: 0;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: $first-color;
        border-radius: $raduis;

        span {
            color: $second-color;
            font-size: 1.6rem;
            font-weight: 500;
        }
    }

    .row {
        padding: 1rem;
        border-radius: $raduis;
        transition: background-color $transition-time;
        cursor: pointer;

        &:hover {
            background-color: $hover-color;
        }

        span {
            font-size: 1.4rem;
            color: $first-color;
            @include Ellipsis(nowrap);
        }
    }
}

.active {
    background-color: $hover-color;
}
</style>