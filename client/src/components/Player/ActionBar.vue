<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { onMounted, ref, watchEffect } from 'vue';
import IconShuffle from '../icons/IconShuffle.vue';
import IconPrevious from '../icons/IconPrevious.vue';
import IconPlay from '../icons/IconPlay.vue';
import IconNext from '../icons/IconNext.vue';
import IconPause from '../icons/IconPause.vue';
import IconVolumeHigh from '../icons/IconVolumeHigh.vue';
import IconVolumeMedium from '../icons/IconVolumeMedium.vue';
import IconVolumeMute from '../icons/IconVolumeMute.vue';
import IconVolumeLow from '../icons/IconVolumeLow.vue';


const musicStore = useMusic();
const audio = ref<HTMLAudioElement | null>(null);
const inputRangeProgressBar = ref(0);
const inputVolume = ref(20);

onMounted(() => {
    if (audio.value) {
        musicStore.currentMusic.audio = audio.value;
        audio.value.volume = inputVolume.value / 100;
    }
});

watchEffect(() => inputRangeProgressBar.value = musicStore.currentMusic.progress);

function inputRange(e: Event) {
    const input = e.target as HTMLInputElement;    
    musicStore.setProgress(Number(input.value));
}

function setVolume(e: Event) {
    const input = e.target as HTMLInputElement;
    
    if (audio.value) {
        const volume = Number(input.value);
        audio.value.volume = volume / 100;
        inputVolume.value = volume;
    }
}

function muteOrDemute() {
    if (audio.value) {
        if (inputVolume.value === 0) {            
            audio.value.volume = 0.2;
            inputVolume.value = 20;
            return;
        }

        audio.value.volume = 0;
        inputVolume.value = 0;
    }
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

                <button @click="muteOrDemute">
                    <IconVolumeMute v-if="inputVolume === 0" />
                    <IconVolumeLow v-else-if="inputVolume < 20" />
                    <IconVolumeMedium v-else-if="inputVolume < 60" />
                    <IconVolumeHigh v-else/>
                </button>

                <input type="range" min="0" max="100" step="0.5" :value="inputVolume" @input="setVolume">
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

    input[type=range] {
        height: 5px;
        cursor: pointer;
    }

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

        .progress-bar {
            width: 100%;
            margin-bottom: 0.5rem;
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