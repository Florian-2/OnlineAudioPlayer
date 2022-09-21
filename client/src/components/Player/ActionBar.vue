<script lang="ts" setup>
import IconShuffle from '../icons/IconShuffle.vue';
import IconPrevious from '../icons/IconPrevious.vue';
import IconPlay from '../icons/IconPlay.vue';
import IconNext from '../icons/IconNext.vue';
import IconPause from '../icons/IconPause.vue';
import IconVolumeHigh from '../icons/IconVolumeHigh.vue';
import { useMusic } from '@/stores/music';
import { onMounted, ref, watchEffect } from 'vue';


const musicStore = useMusic();
const audio = ref<HTMLAudioElement | null>(null);
const inputRangeProgressBar = ref(0);

onMounted(() => musicStore.currentMusic.audio = audio.value);

watchEffect(() => inputRangeProgressBar.value = musicStore.currentMusic.progress);

function inputRange(e: Event) {
    const input = e.target as HTMLInputElement;    
    musicStore.setProgress(Number(input.value));
}
</script>

<template>
    <audio 
        ref="audio" 
        :src="musicStore.currentMusic?.metadata?.urlMusic" 
        @loadedmetadata="musicStore.setDuration"
        @timeupdate="musicStore.setCurrentTime"
        @ended="musicStore.handleChangeSong('next')" 
        controls
        hidden
    >
    </audio>

    <div class="container-action">
        <div class="actions">
            <div class="btns playPause">
                <button title="Musique précédente" @click="musicStore.previous">
                    <IconPrevious/>
                </button>

                <button v-if="musicStore.currentMusic.isPaused" title="Jouer" @click="musicStore.play">
                    <IconPlay/>
                </button>

                <button v-else title="Pause" @click="musicStore.pause">
                    <IconPause/>
                </button>

                <button title="Musique suivante" @click="musicStore.next">
                    <IconNext/>
                </button>
            </div>

            <div class="btns volume">
                <button title="Aléatoire" @click="musicStore.shuffleMusic">
                    <IconShuffle/>
                </button>

                <button>
                    <IconVolumeHigh/>
                </button>
            </div>
        </div>
            
        <div class="progress-container">
            <input 
                type="range" 
                min="0" :max="musicStore.currentMusic.metadata?.duration" step="0.1"
                v-model="inputRangeProgressBar" 
                @input="inputRange" 
                class="progress-bar" 
            />
            
            <div class="time">
                <span class="time-indicator">{{ musicStore.currentTime }}</span>
                <span class="time-indicator">{{ musicStore.currentMusic.metadata?.formatDuration }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container-action {
    background-color: $hover-color;
    border-radius: 5px;
    padding: 1rem;

    .actions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        
        .title {
            font-size: 1.15rem;
            color: $first-color;
            @include Ellipsis(nowrap);
        }
        
        .btns {
            @include Flex(center);
            gap: 0.5rem;
        }

        .playPause {
            grid-column: 2 / 3;
        }

        .volume {
            grid-column: 3 / 4;
            justify-self: flex-end;
        }
    }

    .progress-container {   
        margin-top: 1.5rem;
        width: 100%;
        // background-color: #727377;
        // border-radius: 5px;
        // overflow: hidden;
        // cursor: pointer;

        .progress-bar {
            height: 5px;
            width: 100%;
            margin-bottom: 0.5rem;
            border-radius: 5px;
            background: #4a8ea3;
            transform-origin: left;
            // transform: scaleX(0);
            // background: linear-gradient(100deg, #4a8ea3, #6dd6ef 100%);
            background: white;
            cursor: pointer;
        }

        .time {
            display: flex;
            justify-content: space-between;
            color: $first-color;
            font-size: 1.2rem;
        }
    }
}

button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    height: 100%;
}
</style>