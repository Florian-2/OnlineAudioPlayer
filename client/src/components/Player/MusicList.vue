<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { ref, watch } from 'vue';
import IconHeart from '../icons/IconHeart.vue';

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
                :class="['row', { 'active': music._id === musicStore.currentMusic.metadata?._id } ]"
                @dblclick="musicStore.selectMusic(music._id)"
                role="row" 
            >
                <div role="cell" class="id-like">
                    <span class="index">{{ i + 1 }}</span>

                    <button 
                        class="like" 
                        :title="music.fav ? 'Retirer des favoris' : 'Ajouter au favoris'" 
                        @click="musicStore.favorite(music._id)"
                    >
                        <IconHeart :class="{ 'active': music.fav }"/>
                    </button>
                </div>

                <div @click="musicStore.selectMusic(music._id)">
                    <p class="title">
                        <span>{{ music.title }}</span>
                    </p>
                </div>

                <div role="cell">
                    <span>{{ music.artists?.join("/") }}</span>
                </div>

                <div role="cell">
                    <span>{{ music.album }}</span>
                </div>

                <div role="cell">
                    <span>{{ music.formatDuration }}</span>
                </div>
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
        align-items: center;
        column-gap: 1rem;

        @media screen and (max-width: 900px) {
            grid-template-columns: 30px 2fr 1fr 70px;
            
            // Colonne Album
            div:nth-child(4), 
            span:nth-child(4) { 
                display: none;
            }
        }
    
        .title {
            display: inline-block;
            position: relative;
            cursor: pointer;

            span::before {
                position: absolute;
                content: "";
                bottom: 0;
                left: 0;
                height: 2px;
                width: 100%;
                border-radius: $raduis;
                background-color: $first-color;
                opacity: 0;
                visibility: hidden;
                transition: all $transition-time;
            }

            span:hover::before {
                opacity: 1;
                visibility: visible;
            }
        }

        div.id-like {
            display: flex;
            align-items: center;

            button.like {
                opacity: 0;
                visibility: hidden;

                background-color: transparent;
                border: none;
                display: flex;
                align-items: center;
                cursor: pointer;

                svg.active {
                    fill: red;
                    stroke: red;
                    background-color: transparent;
                }
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

            &:hover {
                background-color: $hover-color;

                span.index {
                    display: none;
                }

                button.like {
                    opacity: 1;
                    visibility: visible
                }
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