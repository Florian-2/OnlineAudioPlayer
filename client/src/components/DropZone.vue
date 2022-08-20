<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { AxiosError } from "axios";
import { ref, watch } from 'vue';
import Button from './Button.vue';
import IconCross from './icons/IconCross.vue';
import Error from './Error.vue';

const dt = new DataTransfer();
const musicStore = useMusic();
const inputFiles = ref<FileList | null>(null);
const active = ref<boolean>(false);
const pending = ref<boolean>(false);
const errorServer = ref<string>("");
const showError = ref<boolean>(false);
const mimeTypeAudio = ["audio/mpeg", "audio/mp4", "audio/flac", "audio/x-wav", "audio/ogg", "audio/basic"];

watch(inputFiles, () => {
    if (inputFiles.value) {
        for (let i = 0; i < inputFiles.value.length; i++) {
            const file = inputFiles.value.item(i);
            
            if (file) {
                if (!mimeTypeAudio.includes(file.type)) {
                    removeFile(i);
                }
                else if (file.size > 36_700_160) { // 35MO
                    console.log(file);
                
                    errorServer.value = "La taille est limitée à 35Mo par fichier.";
                    showError.value = true;
                    removeFile(i);
                }
            }
        }
    }    
});

const toggleActive = () => active.value = !active.value;
const toggleError = () => showError.value = !showError.value;

const convertBytesToMegaBytes = (bytes: number) =>  (bytes / (1024 ** 2)).toFixed(2);

function addFileToDataTransfer() {
    for (let i = 0; i < inputFiles.value?.length!; i++) {
        dt.items.add(inputFiles.value?.item(i)!);
    }
}

function handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    inputFiles.value = input.files;
    addFileToDataTransfer();
}

function dropFile(e: DragEvent) {    
    inputFiles.value = e.dataTransfer?.files!;
    addFileToDataTransfer();
    toggleActive();
}

function removeFile(id: number) {
    dt.items.remove(id);
    inputFiles.value = dt.files;
}

async function handleSubmit() {
    try {
        if (inputFiles.value && inputFiles.value.length > 0) {
            pending.value = true;
            await musicStore.addMusic(inputFiles.value!);
            inputFiles.value = null;
            pending.value = false;
        }
    } 
    catch (error) {
        if (error instanceof AxiosError) {        
            errorServer.value = error.response?.data.message;
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

                    <button @click="removeFile(id)">
                        <IconCross color="#000000"></IconCross>
                    </button>
                </div>
            </div>
            
            <Button type="button" @click="handleSubmit" :disabled="pending">{{ pending ? "Chargement..." : "Envoyer" }}</Button>
        </div>
    </div>

   <Error 
        v-if="showError" 
        :message="errorServer"
        @click="toggleError"
    />
</template>

<style lang="scss" scoped>
.container {
    max-width: 1000px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    .files {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .container-files {
            height: 300px;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow-y: auto;
            border: 2px solid $primary-color;
            border-radius: 3px
        }

        .file {
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
}

.dropzone, form {
    @include Flex(center);
    flex-direction: column;
    row-gap: 1.5rem;
}

.dropzone {
    height: 300px;
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
        color: $trois-color;
    }

    label {
        background-color: $second-color;
        color: $first-color;
    }
}
</style>