<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import Button from '../components/Button.vue';


const musicStore = useMusic();
</script>

<template>
    <div class="container-musics">
        <div 
            v-for="music in musicStore.musics" :key="music._id" 
            class="music"
        >
            <span>{{ music.title }}</span>
            <span>{{ music.artist?.join("/") }}</span>
            <span>{{ music.album }}</span>
            <Button btnType="primary">éditer</Button>
            <Button btnType="danger" @click="musicStore.deleteMusic(music._id)">supprimer</Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-musics {
    max-height: 100%;
    max-width: 1100px;
    min-width: 350px;
    margin: 0 auto;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    color: $first-color;
    font-size: 1.3rem;

    .music {
        padding: 0.5rem;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        align-items: center;
        column-gap: 1rem;
        border-radius: $raduis;
        transition: background-color $transition-time;

        &:hover {
            background-color: $hover-color;
        }
        
        span {
            @include Ellipsis(nowrap);
        }

        button {
            justify-self: flex-end;
            font-size: clamp(1.2rem, 2vw, 1.35rem);
        }
    }
}
</style>