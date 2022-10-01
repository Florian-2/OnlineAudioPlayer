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
        // errorLogin.value = "Adresse mail ou mot de passe incorrect.";
        console.log(error);
    }
})
</script>

<template>
    <h1>Profil</h1>

    <!-- <pre>{{ form }}</pre> -->

    <template v-if="userStore.currentUser">
        <div class="container-profile">
            <div class="username">
                <div v-if="!edit.username">
                    <p>{{ userStore.currentUser.username }}</p>
                    <button @click="edit.username = true">Modifier</button>
                </div>
                
                <Field v-else
                    v-model="usernameValue" 
                    type="text" name="username" label="Nouveau nom d'utilisateur" 
                    :error="usernameError"
                    :meta="usernameMeta"
                    :handleChange="usernameHandleChange"
                />
            </div>

            <div class="email">
                <div v-if="!edit.email">
                    <p>{{ userStore.currentUser.email }}</p>
                    <button @click="edit.email = true">Modifier</button>
                </div>
                
                <Field v-else
                    v-model="emailValue" 
                    type="email" name="email" label="Nouvelle adresse mail" 
                    :error="emailError"
                    :meta="emailMeta"
                    :handleChange="emailHandleChange"
                />
            </div>

            <div class="createdAt">
                <p>Compte crée le: {{ userStore.currentUser.createdAt }}</p>
            </div>

            <div class="updatedAt">
                <p>Dernière modification le: {{ userStore.currentUser.updatedAt }}</p>
            </div>

            <Button btnType="primary" type="submit" @click="onSubmit">Enregister les modifications</Button>
        </div>
    </template>
</template>

<style lang="scss" scoped>
pre, p {
    font-size: 1.5rem;
    color: white;
}

.username {
    margin-block: 2rem;
    display: flex;
    gap: 0.5rem;
}

input {
    display: block;
}

div {
    margin-block: 2rem;
}
</style>