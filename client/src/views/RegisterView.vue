<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { useUser } from "@/stores/user";
import { username, email, passwordWithRules, confirmPassword, sameAsPassword } from "@/shared/validators/form.validators";
import type { SigninForm } from "@/shared/interfaces";
import { AxiosError } from "axios";
import Field from "../components/Form/Field.vue";
import FieldPassword from "../components/Form/FieldPassword.vue";
import Button from "../components/Button.vue";


const errorRegister = ref("");
const userStore = useUser();
const router = useRouter();

const validationSchema = toFormValidator(z.object({
    username,
    email,
    password: passwordWithRules,
    confirmPassword
})
.refine((data) => sameAsPassword(data), { 
    path: ["confirmPassword"], 
    message: "Les mot de passe ne correspondent pas" 
}));

const form = useForm<SigninForm>({ validationSchema });

const { 
    value: usernameValue, 
    errorMessage: usernameError, 
    meta: usernameMeta, 
    handleChange: usernameHandleChange, 
    handleBlur: usernameHandleBlur 
} = useField("username", undefined, { initialValue: "John", validateOnValueUpdate: false });
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
const { 
    value: confirmPwdValue, 
    errorMessage: confirmPwdError, 
    meta: confirmPwdMeta,
    handleChange: confirmPwdHandleChange, 
    handleBlur: confirmPwdHandleBlur
} = useField("confirmPassword", undefined, { initialValue: "John2022", validateOnValueUpdate: false });

const onSubmit = form.handleSubmit(async (formData) => {    
    try {      
        await userStore.register(formData);
        router.push("/login");
    } 
    catch (error) {
        if (error instanceof AxiosError) {
            console.log(error);
            
            const errors = error.response?.data;            
            form.setErrors({...errors.errors});
        }
    }
})

const isSubmitting = form.isSubmitting;
</script>

<template>
    <form @submit.prevent="onSubmit">
        <Field 
            v-model="usernameValue" 
            type="text" name="username" label="Nom d'utilisateur" 
            :error="usernameError"
            :meta="usernameMeta"
            :handleChange="usernameHandleBlur"
            :handleBlur="usernameHandleChange"
        />

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

        <FieldPassword
            v-model="confirmPwdValue" 
            name="confirmPwd" label="Confirmer le mot de passe" 
            :error="confirmPwdError"
            :meta="confirmPwdMeta"
            :handleBlur="confirmPwdHandleChange"
            :handleChange="confirmPwdHandleBlur"
        />

        <p v-if="errorRegister">{{ errorRegister }}</p>

        <Button type="submit" @click="onSubmit" :disabled="isSubmitting">S'inscrire</Button>
        <Button type="button" @click="() => form.resetForm()">Réinitialiser</Button>
    </form>
</template>

<style scoped>
form {
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.4rem;
}

small {
    color: red;
}

button {
    background-color: var(--btn-color);
    border-radius: 10px;
    color: black;
    padding: 7px 10px;
    letter-spacing: 0.3px;
    cursor: pointer;
    font-weight: bold;
}
</style>