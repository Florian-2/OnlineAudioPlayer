<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { AxiosError } from "axios";
import { ref, watch } from 'vue';
import Button from './Button.vue';
import IconCross from './icons/IconCross.vue';
import Error from './Error.vue';

const musicStore = useMusic();
const inputFiles = ref<Set<File>>(new Set());
const active = ref<boolean>(false);
const pending = ref<boolean>(false);
const errorServer = ref<string>("");
const showError = ref<boolean>(false);
const mimeTypeAudio = ["audio/mpeg", "audio/mp4", "audio/flac", "audio/x-wav", "audio/ogg", "audio/basic"];

watch(inputFiles, () => {
    if (inputFiles.value) {
        console.log(inputFiles.value);
        

        for (const file of inputFiles.value) {            
            if (!mimeTypeAudio.includes(file.type)) {
                inputFiles.value.delete(file);
            }
            else if (file.size > 36_700_160) { // 15MO 16_700_160         
                errorServer.value = "La taille est limitée à 35Mo par fichier.";
                showError.value = true;
                inputFiles.value.delete(file);
            }
        }
    }
}, { deep: true });

const toggleActive = () => active.value = !active.value;
const toggleError = () => showError.value = !showError.value;

const convertBytesToMegaBytes = (bytes: number) =>  (bytes / (1024 ** 2)).toFixed(2);

function handleChange(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input.files) {
        errorServer.value! &&= "";
        showError.value! &&= false;

        for (const file of input.files) {
            inputFiles.value.add(file);
        }
    }
}

function dropFile(e: DragEvent) {
    if (e.dataTransfer?.files) {
        errorServer.value! &&= "";
        showError.value! &&= false;

        for (const file of e.dataTransfer?.files) {
            inputFiles.value.add(file);
        }
    }
    
    toggleActive();
}

async function handleSubmit() {
    try {
        if (inputFiles.value && inputFiles.value.size > 0) {
            pending.value = true;
            await musicStore.addMusic(inputFiles.value);
            inputFiles.value.clear();
            pending.value = false;
        }
    } 
    catch (error) {
        if (error instanceof AxiosError) { 
            inputFiles.value.clear();
            errorServer.value = error.response?.data.message || "Erreur";
            showError.value = true;
        }
    }
    finally {
        pending.value = false;
    }
}
</script>

<template>
    <div class="container">  
        <div
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="dropFile"
            class="dropzone"
            :class="{ 'active-dropzone': active }"
        >
            <span>Glisser déposer vos fichiers ici</span>
            <span>OU</span>
            <form @submit.prevent="handleSubmit">
                <label for="music" id="musics">Sélectionner des fichiers</label>
                <input @change="handleChange" type="file" name="musics" id="music" multiple>
            </form>
        </div>

        <div class="files">
            <div class="container-files">
                <div class="file" v-for="(file, id) in inputFiles" :key="id">
                    <p>{{ file.name }} ({{ convertBytesToMegaBytes(file.size) + "Mo" }})</p>

                    <button @click="inputFiles.delete(file)">
                        <IconCross color="#000000"></IconCross>
                    </button>
                </div>
            </div>
        </div>

        <Error 
            v-if="showError" 
            :message="errorServer"
            @click="toggleError"
        />
        
        <Button btnType="primary" type="button" @click="handleSubmit" :disabled="pending">{{ pending ? "Chargement..." : "Envoyer" }}</Button>
    </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1000px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 50px;
    gap: 3rem;

    .files {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .container-files {
            height: 100%;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow-y: auto;
            border: 2px solid $first-color;
            border-radius: 3px
        }

        .file {
            grid-column: 2 / 3;
            @include Flex(space-between);
            padding: 0.5rem;
            background-color: $first-color;
            border-radius: 3px;

            p {
                display: inline;
                margin-left: 1rem;
                color: $second-color;
                font-size: clamp(1.4rem, 2vw, 1.5rem);
            }

            button {
                background-color: transparent;
                border: none;
                border-radius: 3px;
                transition: all 250ms;

                &:hover {
                    background-color: $first-color;
                }
            }
        }
    }

    Button {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
}

.dropzone, form {
    @include Flex(center);
    flex-direction: column;
    row-gap: 1.5rem;
}

.dropzone {
    height: 100%;
    margin-bottom: 1.5rem;
    border: 2px dashed $first-color;
    border-radius: 5px;
    transition: 250ms ease all;

    span {
        font-size: clamp(1.4rem, 2vw, 1.7rem);
        color: $first-color;
    }

    label {
        padding: 0.8rem 1.2rem;
        color: $second-color;
        background-color: $first-color;
        border-radius: 3px;
        transition: 250ms ease all;
    }

    input {
        display: none;
    }
}

.active-dropzone {
    background-color: $first-color;
    
    span {
        color: $second-color;
    }

    label {
        background-color: $second-color;
        color: $first-color;
    }
}
</style>