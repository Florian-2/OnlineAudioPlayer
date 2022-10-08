<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';


const musicStore = useMusic();
const router = useRouter();

function toEdit(musicId: string) {
    router.push({ name: "Edit", params: { id: musicId } });
}
</script>

<template>
    <div class="container-musics" v-if="musicStore.musics.length > 0">
        <div 
            v-for="music in musicStore.musics" :key="music._id" 
            class="music"
        >
            <span>{{ music.title }}</span>
            <span>{{ music.artists?.join("/") }}</span>
            <span>{{ music.album }}</span>
            <Button btnType="primary" @click="toEdit(music._id)">éditer</Button>
            <Button btnType="danger" @click="musicStore.deleteMusic(music._id)">supprimer</Button>
        </div>
    </div>

    <span class="warning" v-else>Vous n'avez pas de musique</span>
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