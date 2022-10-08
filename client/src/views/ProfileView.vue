<script setup lang="ts">
import { useUser } from '@/stores/user';
import { useField, useForm } from 'vee-validate';
import { reactive, ref, watch } from 'vue';
import type { EditUser } from '@/shared/interfaces';
import { username, email } from '@/shared/validators/form.validators';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import router from '@/router';
import Button from '../components/Button.vue';
import Field from '../components/Form/Field.vue';
import IconEdit from '../components/icons/IconEdit.vue';


const userStore = useUser();

const localUser = reactive<Partial<EditUser>>({
    username: userStore.currentUser?.username,
    email: userStore.currentUser?.email,
});
const edit = reactive({
    username: false,
    email: false
});

const validationSchema = toFormValidator(z.object({
    username,
    email
}));
const form = useForm<EditUser>({ validationSchema });

const { 
    value: usernameValue, 
    errorMessage: usernameError, 
    meta: usernameMeta,
    handleChange: usernameHandleChange, 
} = useField<string>("username", undefined, { initialValue: localUser.username || "", validateOnValueUpdate: false });

const { 
    value: emailValue, 
    errorMessage: emailError, 
    meta: emailMeta,
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { initialValue: localUser.email || "", validateOnValueUpdate: false });

const onSubmit = form.handleSubmit(async (formData) => {
    try {
        console.log(formData);
        await userStore.editProfile(formData);
        edit.username = false;
        edit.email = false;
    } 
    catch (error) {
        console.log(error);
    }
})

function formatDate(date: string) {
    const timestamp = Date.parse(date);
    return Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(timestamp);
}
</script>

<template>
    <h1>Profil</h1>

    <template v-if="userStore.currentUser">
        <div class="container-profile">
            <div class="info">
                <div v-if="!edit.username" class="username">
                    <p>Nom d'utilisateur: <strong>{{ userStore.currentUser.username }}</strong></p>
                    <button class="edit" title="Modifier votre nom d'utilisateur" @click="edit.username = true">
                        <IconEdit/>
                    </button>
                </div>
                
                <Field v-else
                    v-model="usernameValue" 
                    type="text" name="username" label="Nouveau nom d'utilisateur" 
                    :error="usernameError"
                    :meta="usernameMeta"
                    :handleChange="usernameHandleChange"
                />
            </div>

            <div class="info">
                <div v-if="!edit.email" class="email">
                    <p>Adresse email: <strong>{{ userStore.currentUser.email }}</strong></p>
                    <button class="edit" title="Modifier votre adresse email" @click="edit.email = true">
                        <IconEdit/>
                    </button>
                </div>
                
                <Field v-else
                    v-model="emailValue" 
                    type="email" name="email" label="Nouvelle adresse mail" 
                    :error="emailError"
                    :meta="emailMeta"
                    :handleChange="emailHandleChange"
                />
            </div>

            <div class="info">
                <p>Compte crée le: <strong>{{ formatDate(userStore.currentUser.createdAt) }}</strong></p>
            </div>

            <div class="info">
                <p>Dernière modification le: <strong>{{ formatDate(userStore.currentUser.updatedAt) }}</strong></p>
            </div>

            <Button btnType="primary" type="submit" @click="onSubmit">Enregister les modifications</Button>
            <Button btnType="danger" type="submit" @click="userStore.deleteAccount()">Supprimer on compte</Button>
        </div>
    </template>
</template>

<style lang="scss" scoped>
.container-profile {
    max-width: 1000px;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    color: $first-color;
    font-size: clamp(1.3rem, 2vw, 1.5rem);

    .info {
        height: 90px;
    }

    button {
        justify-self: flex-start;
    }

    button.edit {
        background: transparent;
        border: none;
        @include Flex(center);

        svg {
            width: 20px;
        }
    }

    .username,
    .email {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
}
</style>