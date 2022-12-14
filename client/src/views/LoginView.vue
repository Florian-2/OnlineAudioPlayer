<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { useUser } from "@/stores/user";
import { email, password } from "@/shared/validators/form.validators";
import type { SigninForm } from "@/shared/interfaces";
import Field from "../components/Form/Field.vue";
import FieldPassword from "../components/Form/FieldPassword.vue";
import Button from "../components/Button.vue";

const userStore = useUser();
const router = useRouter();
const errorLogin = ref<string>();

const validationSchema = toFormValidator(z.object({
    email,
    password
}));

const form = useForm<SigninForm>({ validationSchema });

const { 
    value: emailValue, 
    errorMessage: emailError, 
    meta: emailMeta,
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { initialValue: "john@mail.com", validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    meta: passwordMeta,
    handleChange: passwordHandleChange, 
} = useField<string>("password", undefined, { initialValue: "John2022", validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {
    try {
        await userStore.login(formData);
        router.push("/profil");
    } 
    catch (error) {
        errorLogin.value = "Adresse mail ou mot de passe incorrect.";
    }
})

const isSubmitting = form.isSubmitting;
</script>

<template>
    <div class="form-container">
        <h1>Connexion</h1>

        <form @submit.prevent="onSubmit">
            <Field 
                v-model="emailValue" 
                type="email" name="email" label="Adresse email" 
                :error="emailError"
                :meta="emailMeta"
                :handleChange="emailHandleChange"
            />

            <FieldPassword
                v-model="passwordValue" 
                name="password" label="Mot de passe" 
                :error="passwordError"
                :meta="passwordMeta"
                :handleChange="passwordHandleChange"
            />

            <p v-if="errorLogin" class="error">{{ errorLogin }}</p>

            <div class="btn-action">
                <Button btnType="primary" type="submit" @click="onSubmit" :disabled="isSubmitting">Connexion</Button>
                <Button btnType="danger" type="reset" @click="() => form.resetForm()">R??initialiser</Button>
            </div>
        </form>

        <p class="question-form">
            Vous n'avez pas de compte ? 
            <RouterLink to="/register">Inscription</RouterLink>
        </p>
    </div>
</template>

<style scoped lang="scss">
.error {
    margin-block: 0.5rem;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    color: $danger-color;
    text-align: center;
}
</style>