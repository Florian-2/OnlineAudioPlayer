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
const errorLogin = ref("");

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
    handleBlur: emailHandleBlur
} = useField("email", undefined, { initialValue: "john@mail.com", validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    meta: passwordMeta,
    handleChange: passwordHandleChange, 
    handleBlur: passwordHandleBlur
} = useField("password", undefined, { initialValue: "John2022", validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {
    try {
        await userStore.login(formData);
        router.push("/profil");
    } 
    catch (error) {
        errorLogin.value = "Adresse mail ou mot de passe incorrect.";
        console.log(error);
    }
})

const isSubmitting = form.isSubmitting;
</script>

<template>
    <form @submit.prevent="onSubmit">
        <Field 
            v-model="emailValue" 
            type="email" name="email" label="Adresse email" 
            :error="emailError"
            :meta="emailMeta"
            :handleBlur="emailHandleChange"
            :handleChange="emailHandleBlur"
        />

        <FieldPassword
            v-model="passwordValue" 
            name="password" label="Mot de passe" 
            :error="passwordError"
            :meta="passwordMeta"
            :handleBlur="passwordHandleChange"
            :handleChange="passwordHandleBlur"
        />

        <p v-if="errorLogin">{{ errorLogin }}</p>

        <Button type="submit" @click="onSubmit" :disabled="isSubmitting">Connexion</Button>
        <Button type="button" @click="() => form.resetForm()">Réinitialiser</Button>
    </form>
</template>

<style scoped>
form {
    max-width: 600px;
    margin: 0 auto;
}
</style>