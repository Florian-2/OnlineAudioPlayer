<script lang="ts" setup>
import { useMusic } from '@/stores/music';
import { ref, watch } from 'vue';
import Button from './Button.vue';
import IconCross from './icons/IconCross.vue';

const dt = new DataTransfer();
const musicStore = useMusic();
const inputFiles = ref<FileList | null>(null);
const active = ref<boolean>(false);

watch(inputFiles, () => {
    console.log(inputFiles.value);
})

const toggleActive = () => active.value = !active.value;

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
}

function removeFile(id: number) {
    dt.items.remove(id);
    inputFiles.value = dt.files;
}

async function handleSubmit() {
    try {
        if (inputFiles.value && inputFiles.value.length > 0) {
            await musicStore.addMusic(inputFiles.value!);
        }
    } 
    catch (error) {
        console.log(error);
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
            <span>Glisser déposer un fichier ici</span>
            <span>OU</span>
            <form @submit.prevent="handleSubmit">
                <label for="music" id="musics">Sélectionner un fichier</label>
                <input @change="handleChange" type="file" name="musics" id="music" multiple>
            </form>
        </div>

        <div class="files">
            <div class="file" v-for="(file, id) in inputFiles" :key="id">
                <p>{{ file.name }}</p>
                <button @click="removeFile(id)">
                    <IconCross color="#000000" ></IconCross>
                </button>
            </div>
            
            <Button type="button" @click="handleSubmit">Envoyer</Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1000px;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .files {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .file {
            @include Flex(space-between);
            padding: 0.5rem;
            background-color: $primary-color;
            border-radius: 3px;

            button {
                background-color: transparent;
                border: none;
                border-radius: 3px;
                transition: all 250ms;

                &:hover {
                    background-color: white;
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

p {
    color: white;
    font-size: 1.6rem;
}

.dropzone {
    max-width: 400px;
    height: 200px;
    border: 2px dashed $primary-color;
    border-radius: 5px;
    transition: 250ms ease all;

    span {
        font-size: clamp(1.2rem, 2vw, 1.5rem);
        color: $primary-color;
    }

    label {
        padding: 0.8rem 1.2rem;
        color: white;
        background-color: $primary-color;
        border-radius: 3px;
        transition: 250ms ease all;
    }

    input {
        display: none;
    }
}

.active-dropzone {
    background-color: $primary-color;
    
    span, label {
        color: $trois-color;
    }
}
</style>