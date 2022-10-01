<script lang="ts" setup>
import type { EditMusic } from '@/shared/interfaces';
import { title, artists, album } from '@/shared/validators/form.validators';
import { useMusic } from '@/stores/music';
import { toFormValidator } from '@vee-validate/zod';
import { AxiosError } from 'axios';
import { useForm, useField } from 'vee-validate';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';
import Field from "./Form/Field.vue";
import Button from "./Button.vue";


const route = useRoute();
const router = useRouter();
const musicStore = useMusic();
const errorServer = ref<string>();
const localMusic = reactive<Partial<EditMusic>>({
    title: undefined,
    artists: undefined,
    album: undefined
})

async function getOneMusic() {
    try {
        const music = await musicStore.fetchOneMusic(route.params.id as string);
        localMusic.title = music.title;
        localMusic.artists = music.artists?.join(" ");
        localMusic.album = music.album;
    }
    catch (error) {
        if (error instanceof AxiosError) {
            errorServer.value = error.response?.data.message;
        }
    }
}
await getOneMusic();

const validationSchema = toFormValidator(z.object({
    title,
    artists,
    album
}));

const form = useForm<EditMusic>({ validationSchema });
const isSubmitting = form.isSubmitting;

const {
    value: titleValue,
    errorMessage: titleError,
    meta: titleMeta,
    handleChange: titleHandleChange,
} = useField<string>("title", undefined, { initialValue: localMusic.title, validateOnValueUpdate: false });

const {
    value: artistsValue,
    errorMessage: artistsError,
    meta: artistsMeta,
    handleChange: artistsHandleChange,
} = useField<string>("artists", undefined, { initialValue: localMusic.artists || "", validateOnValueUpdate: false });

const {
    value: albumValue,
    errorMessage: albumError,
    meta: albumMeta,
    handleChange: albumHandleChange,
} = useField<string>("album", undefined, { initialValue: localMusic.album || "", validateOnValueUpdate: false });
    
const onSubmit = form.handleSubmit(async (formData) => {
    try {       
        const musicID = route.params.id as string;
        await musicStore.editMusic(musicID, formData);
        router.push({ name: "Player" });
    } 
    catch (error) {
        console.log(error);
    }
})
</script>
    
<template>
    <div class="form-container">
        <form @submit.prevent="onSubmit" v-if="!errorServer">
            <Field 
                v-model="titleValue" 
                type="text" 
                name="title" label="* Titre" 
                :error="titleError" 
                :meta="titleMeta"
                :handleChange="titleHandleChange" 
            />

            <Field 
                v-model="artistsValue" 
                type="text" 
                name="artists" label="* Artiste(s)" 
                :error="artistsError"
                :meta="artistsMeta" 
                :handleChange="artistsHandleChange" 
            />

            <Field 
                v-model="albumValue" 
                type="text" 
                name="album" label="Album" 
                :error="albumError" 
                :meta="albumMeta"
                :handleChange="albumHandleChange" 
            />    
            
            <div class="btn-action">
                <Button btnType="primary" type="submit" @click="onSubmit" :disabled="isSubmitting">
                    {{ isSubmitting ? "Enregistrement..." : "Enregistrer" }} 
                </Button>
            </div>
        </form> 
        
        <div class="handle-error" v-else>
            <span class="error">{{ errorServer }}</span>
            <router-link to="/music-management/handle-music" class="link">Revenir en arrière</router-link>
        </div>
    </div>
</template>
    
<style lang="scss" scoped>
.handle-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .error {
        font-size: clamp(1.2rem, 2vw, 1.8rem);
        color: $danger-color;
    }

    .link {
        font-size: clamp(1rem, 2vw, 1.6rem);
        text-decoration: underline;
    }
}
</style>