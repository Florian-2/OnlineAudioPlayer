<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { watch } from 'vue';
import IconHeart from '../icons/IconHeart.vue';

const musicStore = useMusic();

watch(() => musicStore.favOnly, () => {
    if (musicStore.favOnly) {
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
            <span role="columnheader">
                Titre 
                <div class="favOnly">
                    (<input type="checkbox" v-model="musicStore.favOnly" name="favOnly" id="favOnly">
                    <label for="favOnly" id="favOnly">Seulement les favoris</label>)
                </div>
            </span>
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

                <span>
                    <span class="title" @click="musicStore.selectMusic(music._id)">{{ music.title }}</span>
                </span>
                          
                <span>{{ music.artists?.join("/") }}</span>

                <span>{{ music.album }}</span>

                <span>{{ music.formatDuration }}</span>
            </div>
        </div>

        <p v-if="musicStore.musics.length === 0 && !musicStore.favOnly">Vous n'avez pas de musique</p>
        <p v-if="musicStore.musics.length === 0 && musicStore.favOnly">Vous n'avez pas de musique favorite</p>
    </div>
</template>

<style lang="scss" scoped>
.table-musics {
    width: 100%;
    height: 380px;
    overflow-y: auto;
    padding-right: 0.5rem;

    .thead, .row {
        display: grid;
        grid-template-columns: minmax(30px, auto) 2fr 1fr 1fr 70px;
        align-items: center;
        column-gap: 1rem;

        @media screen and (max-width: 900px) {
            grid-template-columns: auto 2fr 1fr 70px;
            
            // Colonne Album
            span:nth-child(4) { 
                display: none;
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
            display: flex;
            align-items: center;
            gap: 1rem;

            .favOnly {
                display: inline-flex;
                align-items: center;

                input, label {
                    cursor: pointer;
                }
                
                label {
                    font-size: 1.2rem;
                    margin-left: 5px;
                }
            }
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
                    visibility: visible;
                }
            }

            span {
                font-size: 1.35rem;
                color: $first-color;
                @include Ellipsis(nowrap);
            }

            .title {
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
        
        .active {
            background-color: $hover-color;
        }
    }
}
</style>