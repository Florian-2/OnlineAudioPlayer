<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { ref, watch } from 'vue';

const musicStore = useMusic();
const favMusicOnly = ref(false);

watch(favMusicOnly, () => {
    if (favMusicOnly.value) {
        musicStore.musics = musicStore.musics.filter((music) => music.fav === true);
    }
    else {
        musicStore.musics = musicStore.copyMusics;
    }
});
</script>

<template>
    <div class="table-musics">
        <div class="thead" role="rowheader">
            <span role="columnheader">#</span>
            <span role="columnheader">Titre <input type="checkbox" v-model="favMusicOnly">Favoris</span>
            <span role="columnheader">Artiste</span>
            <span role="columnheader">Album</span>
            <span role="columnheader">Durée</span>
        </div>

        <div class="tbody" role="rowgroup">
            <div 
                v-for="(music, i) of musicStore.musics" :key="music._id" 
                @click="musicStore.selectMusic(i)"
                :class="['row', { 'active': music._id === musicStore.currentMusic.metadata?._id } ]" 
                role="row" 
            >
                <span role="cell">{{ i + 1 }}</span>
                <span role="cell">{{ music.title }}</span>
                <span role="cell">{{ music.artists?.join("/") }}</span>
                <span role="cell">{{ music.album }}</span>
                <span role="cell">{{ music.formatDuration }}</span>
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

        @media screen and (max-width: 850px) {
            grid-template-columns: 30px 2fr 1fr 70px;

            span:nth-child(4) {
                display: none;
            }
        }
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
            font-size: 1.5rem;
            font-weight: 500;                  
        }
    }

    .tbody {
        .row {
            padding: 1rem;
            border-radius: $raduis;
            transition: background-color $transition-time;
            cursor: pointer;

            &:hover {
                background-color: $hover-color;
            }

            span {
                font-size: 1.35rem;
                color: $first-color;
                @include Ellipsis(nowrap);
            }
        }
        
        .active {
            background-color: $hover-color;
        }
    }
}
</style>