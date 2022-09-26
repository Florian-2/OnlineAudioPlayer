<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import IconShuffle from '../icons/IconShuffle.vue';
import IconPrevious from '../icons/IconPrevious.vue';
import IconPlay from '../icons/IconPlay.vue';
import IconNext from '../icons/IconNext.vue';
import IconPause from '../icons/IconPause.vue';
import IconVolumeHigh from '../icons/IconVolumeHigh.vue';
import IconVolumeMedium from '../icons/IconVolumeMedium.vue';
import IconVolumeMute from '../icons/IconVolumeMute.vue';
import IconVolumeLow from '../icons/IconVolumeLow.vue';
import InputRange from '../InputRange.vue';


const musicStore = useMusic();
const audio = ref<HTMLAudioElement | null>(null);
const inputRangeProgressBar = ref(0);
const baseVolume = 10;
const inputVolume = ref(baseVolume);
let preferenceVolume: number;

onMounted(() => {
    if (audio.value) {
        musicStore.currentMusic.audio = audio.value;
        audio.value.volume = inputVolume.value / 100;
        musicStore.currentMusic.audio.currentTime = inputRangeProgressBar.value || 0;
    }
});

onUnmounted(() => musicStore.pause());

watchEffect(() => inputRangeProgressBar.value = musicStore.currentMusic.progress);

function activeShufflePlaying() {
    musicStore.playAShuffledSong();
}

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
        preferenceVolume = volume / 100;
    }
}

function muteOrDemute() {
    if (audio.value) {
        if (inputVolume.value === 0) {
            audio.value.volume = preferenceVolume || (baseVolume / 100);
            inputVolume.value = preferenceVolume * 100 || baseVolume;
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
        hidden
    >
    </audio>

    <div class="container-action">
        <div class="actions">
            <div class="box-btns playPause">
                <button title="Musique précédente" @click="musicStore.previous">
                    <IconPrevious/>
                </button>

                <button v-if="musicStore.currentMusic.isPaused" title="Jouer" @click="musicStore.play" class="play-pause">
                    <IconPlay class="svg-play" />
                </button>

                <button v-else title="Pause" @click="musicStore.pause" class="play-pause">
                    <IconPause class="svg-pause" />
                </button>

                <button title="Musique suivante" @click="musicStore.next">
                    <IconNext/>
                </button>
            </div>

            <div class="box-btns otherActions">
                <button title="Aléatoire" @click="activeShufflePlaying">
                    <IconShuffle/>
                </button>

                <button @click="muteOrDemute">
                    <IconVolumeMute v-if="inputVolume === 0" />
                    <IconVolumeLow v-else-if="inputVolume < 20" />
                    <IconVolumeMedium v-else-if="inputVolume < 60" />
                    <IconVolumeHigh v-else/>
                </button>

                <InputRange 
                    input-min="0" 
                    input-max="100"
                    input-step="0.5"
                    v-model="inputVolume"
                    @input="setVolume"
                    class="inputVolume"
                />
            </div>
        </div>
            
        <div class="progress-container">           
            <InputRange 
                input-min="0" 
                :input-max="musicStore.currentMusic.metadata?.duration!"
                input-step="0.1"
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

        @media screen and (max-width: 1000px) {
            grid-template-columns: 1fr 1fr;
        }
        
        .box-btns {
            @include Flex(center);
            gap: 0.5rem;
        }

        .playPause {
            grid-column: 2 / 3;

            @media screen and (max-width: 1000px) {
                grid-column: 1 / 2;
            }
        }

        .otherActions {
            grid-column: 3 / 4;
            justify-self: flex-end;

            @media screen and (max-width: 1000px) {
                grid-column: 2 / 3;
                justify-self: center;

                .inputVolume {
                    width: 100px;
                }
            }

            .inputVolume::-webkit-slider-thumb {
                height: 10px;
                width: 15px;
            }
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
    padding: 0.7rem;
    @include Flex(center);
    background-color: transparent;
    border: none;
    border-radius: 50%;
    transition: background-color $transition-time;
    cursor: pointer;

    &:hover {
        background-color: $hover-color;
    }

    svg {
        width: 24px;
        height: 24px;
    }

    .svg-play, .svg-pause {
        width: 35px;
        height: 35px;
    }
}
</style>